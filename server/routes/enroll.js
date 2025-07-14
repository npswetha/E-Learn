const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

// POST /api/enroll
router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'User ID and Course ID are required' });
  }

  try {
    const already = await Enrollment.findOne({ userId, courseId });
    if (already) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId } 
    });

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId }).populate('courseId');

    const courses = enrollments.map(e => e.courseId);
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
});

module.exports = router;
