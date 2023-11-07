const express = require('express');
const router = express.Router();
const {
    getAllAssessment,
    getAssessmentByID,
    addAssessment,
    updateAssessmentbyID,
    deleteAssessmentByID,
    getAssessmentByLesson
} = require('../controllers/assessmentController');

router.get('/getAll', getAllAssessment);
router.get('/get/:id', getAssessmentByID);
router.post('/add', addAssessment);
router.put('/update/:id', updateAssessmentbyID);
router.delete('/delete/:id', deleteAssessmentByID);
router.get('/getbylesson/:lesson_id', getAssessmentByLesson);

module.exports = router;