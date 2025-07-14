const mongoose = require("mongoose");
const Course = require("../models/course");

// GET /api/courses/:id
const getCourseById = async (req, res) => {
  const { id } = req.params;

  // Step 1: Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    // Step 2: Fetch course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Step 3: Return the course
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCourseById };
