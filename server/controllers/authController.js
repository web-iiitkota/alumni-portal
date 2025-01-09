const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const { sendEmail } = require('../utils/emailUtil');

exports.signUp = async (req, res) => {
  const {
    name,
    instituteId,
    branch,
    personalEmail,
    phoneNumber,
    city,
    state,
    country,
    graduationYear,
    pastCompanies,
    currentCompany,
    role,
    linkedin,
    achievements,
    password
  } = req.body;

  try {
    // Check if a user with the same email exists
    const existingUserByEmail = await User.findOne({ personalEmail });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "A user with this email already exists." });
    }

    // Check if a user with the same instituteId exists
    const existingUserByInstituteId = await User.findOne({ instituteId });
    if (existingUserByInstituteId) {
      return res.status(400).json({ message: "A user with this institute ID already exists. If you think this is an error, contact the alumni cell at alumnicell@iiitkota.ac.in." });
    }

    // Initialize profile picture variables
    let profilePictureUrl = null;
    let profilePicturePublicId = null;

    // Upload profile picture to Cloudinary if provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      profilePictureUrl = uploadResult.secure_url;
      profilePicturePublicId = uploadResult.public_id;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Save user data to the database
    const user = new User({
      name,
      instituteId,
      branch,
      personalEmail,
      phoneNumber,
      city,
      state,
      country,
      graduationYear,
      pastCompanies,
      currentCompany,
      role,
      linkedin,
      achievements,
      password: hashedPassword, // Save the hashed password
      profilePicture: profilePictureUrl,
      profilePicturePublicId, // Add the public ID here
    });

    await user.save();

    // Send email with login details
    await sendEmail(personalEmail, name, instituteId, password);

    res.status(201).json({ message: "User registered successfully and email sent" });

  } catch (error) {
    console.error(error.message);

    if (error.code === 11000 && error.keyValue && error.keyValue.instituteId) {
      res.status(400).json({ message: "A user has already registered using this institute ID. If you think this is an error, contact the alumni cell at alumnicell@iiitkota.ac.in." });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.signIn = async (req, res) => {
  const { instituteId, password } = req.body;

  try {
    const user = await User.findOne({ instituteId });

    if (!user) {
      return res.status(400).json({ message: 'Invalid institute ID or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid institute ID or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, instituteId: user.instituteId },
      JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signOut = (req, res) => {
  // Remove token logic
  localStorage.removeItem("token");
};