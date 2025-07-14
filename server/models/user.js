const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
   enrolledCourses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Courses' 
  }] 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
