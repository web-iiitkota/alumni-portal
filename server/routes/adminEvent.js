//  const express = require("express");
// const router = express.Router();
// const EventPost = require("../models/EventPost");
// const upload = require("../middleware/upload");
// const renameFilesWithPostId = require("../utils/renameFilesWithPostId");

// // Other admin routes (if any) would also go here


// // POST /api/admin/eventposts
// router.post("/eventposts", upload.array("images"), async (req, res) => {
//   try {
//     const { title, description, details, date } = req.body;

//     const images = req.files.map((file) => ({
//       path: `/uploads/events/${file.filename}`,
//       filename: file.filename,
//       originalName: file.originalname,
//       size: file.size,
//       mimetype: file.mimetype,
//     }));

//     const eventPost = new EventPost({
//       title,
//       description,
//       details,
//       date,
//       images,
//     });

//     await eventPost.save();

//     // Rename files if they were initially saved with a temp name
//     if (req.files.some((f) => f.filename.includes("temp_"))) {
//       await renameFilesWithPostId(eventPost._id, req.files);
//     }

//     res.status(201).json(eventPost);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;
