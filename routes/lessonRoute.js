const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLesson, getAllLessons, getLessonByID, updateLesson, deleteLesson, getLessonsByLevel} = require('../controllers/lessonController');



router.post('/add', addLesson);
router.get('/getAll', getAllLessons);
router.get('/get/:id', getLessonByID);
router.put('/update/:id', updateLesson);
router.delete('/delete/:id', deleteLesson);
router.get('/getByLevel/:level_id', getLessonsByLevel);

module.exports = router;






