const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addEnroll, getLanguages, getLevelsByLanguage, getLessonsbylevel, getEnrolledLevels, getLanguageByStudent } = require('../controllers/enrolledLevelsController');

router.post('/add/enroll/', addEnroll);
router.get('/get/languages', getLanguages);
router.get('/get/levels', getLevelsByLanguage);
router.get('/get/lessons', getLessonsbylevel)
router.get('/get/enrolledLevels', getEnrolledLevels);
router.get('/get/languagebystudent/:id', getLanguageByStudent);

module.exports = router;