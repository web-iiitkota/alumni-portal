
const express = require('express');
const router = express.Router();


const Alumni = require('../models/User');
const News = require('../models/News')


//  this one is to fetch the alumni
router.get('/alumni', async (req, res) => {
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
      .select('name profilePicture linkedin instituteId branch graduationYear role currentCompany city state country personalEmail phoneNumber pastCompanies achievements ')
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



// UPDATE alumni by ID
router.put('/alumni/:id', async (req, res) => {
  try {
    const alumnusId = req.params.id;
    const updateData = req.body;

    // Optional: validate updateData here if needed

    const updatedAlumnus = await Alumni.findByIdAndUpdate(
      alumnusId,
      updateData,
      { new: true, runValidators: true } // return updated doc and run schema validators
    );

    if (!updatedAlumnus) {
      return res.status(404).json({ error: 'Alumnus not found' });
    }

    res.json({ message: 'Alumnus updated successfully', alumnus: updatedAlumnus });
  } catch (error) {
    console.error('Error updating alumnus:', error);
    res.status(500).json({ error: 'Failed to update alumnus' });
  }
});


// DELETE alumni by ID
// router.delete('/alumni/:id', async (req, res) => {
//   try {
//     const alumnusId = req.params.id;

//     const deletedAlumnus = await Alumni.findByIdAndDelete(alumnusId);

//     if (!deletedAlumnus) {
//       return res.status(404).json({ error: 'Alumnus not found' });
//     }

//     res.json({ message: 'Alumnus deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting alumnus:', error);
//     res.status(500).json({ error: 'Failed to delete alumnus' });
//   }
// });

module.exports = router

