require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumni');
const profileRoute = require('./routes/profileRoute'); // Ensure this is the correct path
const passwordRoutes = require('./routes/passwordRoutes'); // Import the password routes

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI from .env

app.use(express.json());
const corsOptions = {
	origin: [
		"https://alum-portal-iiit-kota-official.vercel.app",
		"https://iiitkalumni.vercel.app/"
	], // Frontend URLs
	// origin: "http://localhost:5173",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/password', passwordRoutes); // Add the password routes
app.use("/api/register", require("./routes/register"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
