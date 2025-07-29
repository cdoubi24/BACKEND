const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let courses = [
  { id: 1, title: "Intro to Cybersecurity" },
  { id: 2, title: "JavaScript Basics" }
];

// Anyone can view courses
router.get('/', (req, res) => {
  res.json(courses);
});

// Teachers only
router.post('/', auth.verifyTeacher, (req, res) => {
  const course = { id: Date.now(), title: req.body.title };
  courses.push(course);
  res.status(201).json(course);
});

router.put('/:id', auth.verifyTeacher, (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  course.title = req.body.title;
  res.json(course);
});

router.delete('/:id', auth.verifyTeacher, (req, res) => {
  courses = courses.filter(c => c.id != req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
