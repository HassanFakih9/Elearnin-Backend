const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLesson, getLessonByID, updateLesson, deleteLesson} = require('../controllers/lessonController');



router.post('/add', addLesson);
router.get('/get/:id', getLessonByID);
router.put('/update/:id', updateLesson);
router.delete('/delete/:id', deleteLesson);

module.exports = router;