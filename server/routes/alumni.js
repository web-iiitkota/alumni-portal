const express = require('express');
const router = express.Router();
const Alumni = require('../models/User'); // Update path as needed

router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find().select('name profilePicture linkedin instituteId branch graduationYear role currentCompany city'); // Fetch limited data from the database
    console.log('Fetched Alumni:', alumni); // Log data to check
    res.json(alumni); // Send data as JSON
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ error: 'Failed to fetch alumni data' });
  }
});

module.exports = router;