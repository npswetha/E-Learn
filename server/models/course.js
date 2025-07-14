const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lectureId: String,
  lectureTitle: String,
  lectureDuration: Number,
  lectureUrl: String,
  isPreviewFree: Boolean,
  lectureOrder: Number,
});

const chapterSchema = new mongoose.Schema({
  chapterId: String,
  chapterOrder: Number,
  chapterTitle: String,
  chapterContent: [lectureSchema],
});

const courseSchema = new mongoose.Schema({
  courseTitle: String,
  courseDescription: String,
  courseContent: [chapterSchema],
  imageUrl: String  
});

module.exports = mongoose.model('Courses', courseSchema);
