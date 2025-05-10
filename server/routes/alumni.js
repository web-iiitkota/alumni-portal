// server/routes/alumni.js
// This file contains the route to fetch alumni data with pagination and filtering
// It uses the User model to fetch alumni data from the database
// The route supports pagination and filtering by name, instituteId, graduationYear, company, role, branch, and city
// The response includes the paginated alumni data, total count of matching records, total pages, and unique graduation years
// The route is exported to be used in the main server file
const express = require('express');
const router = express.Router();
const Alumni = require('../models/User'); // Update path as needed

router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, name, instituteId, graduationYear, company, role, branch, city } = req.query;

    // Build the filter object
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
    if (instituteId) filter.instituteId = { $regex: instituteId, $options: 'i' };
    if (graduationYear) filter.graduationYear = graduationYear;
    if (company) filter.currentCompany = { $regex: company, $options: 'i' };
    if (role) filter.role = { $regex: role, $options: 'i' };
    if (branch) filter.branch = { $regex: branch, $options: 'i' };
    if (city) filter.city = { $regex: city, $options: 'i' };

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch paginated and filtered data
    const alumni = await Alumni.find(filter)
      .select('name profilePicture linkedin instituteId branch graduationYear role currentCompany city')
      .skip(skip)
      .limit(Number(limit));

    // Get total count of matching records
    const totalCount = await Alumni.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Get unique graduation years for the filtered results
    const graduationYears = await Alumni.distinct('graduationYear', filter);

    // Send response with pagination and filtering metadata
    res.json({
      alumni,
      totalCount,
      totalPages,
      currentPage: Number(page),
      graduationYears,
    });
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ error: 'Failed to fetch alumni data' });
  }
});

module.exports = router;