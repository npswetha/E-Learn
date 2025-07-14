const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// GET all or searched courses
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      const regex = new RegExp(search, 'i'); // Case-insensitive regex
      query = {
        $or: [
          { courseTitle: { $regex: regex } },
          { courseDescription: { $regex: regex } }
        ]
      };
    }

    const courses = await Course.find(query, 'courseTitle courseDescription imageUrl');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// Add a new course
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ message: "Failed to save course" });
  }
});

module.exports = router;
