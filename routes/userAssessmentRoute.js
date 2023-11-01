const express = require('express');
const router = express.Router();
const {
    getAllUserAssessment,
    getUserAssessmentByID,
    addUserAssessment,
    updateUserAssessmentbyID,
    deleteUserAssessmentByID,
} = require('../controllers/userAssessmentController');

router.get('/getAll', getAllUserAssessment);
router.get('/get/:id', getUserAssessmentByID);
router.post('/add', addUserAssessment);
router.put('/update/:id', updateUserAssessmentbyID);
router.delete('/delete/:id', deleteUserAssessmentByID);

module.exports = router;