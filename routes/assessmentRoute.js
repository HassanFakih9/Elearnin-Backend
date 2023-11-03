const express = require('express');
const router = express.Router();
const {
    getAllAssessment,
    getAssessmentByID,
    addAssessment,
    updateAssessmentbyID,
    deleteAssessmentByID,
} = require('../controllers/assessmentController');

router.get('/getAll', getAllAssessment);
router.get('/get/:id', getAssessmentByID);
router.post('/add', addAssessment);
router.put('/update/:id', updateAssessmentbyID);
router.delete('/delete/:id', deleteAssessmentByID);

module.exports = router;