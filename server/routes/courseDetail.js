const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getCourseById } = require("../controllers/courseController");


router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }

  next(); 
}, getCourseById);

module.exports = router;
