const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addAttendance, getAttendanceByID, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');



router.post('/add', addAttendance);
router.get('/get/:id', getAttendanceByID);
router.put('/update/:id', updateAttendance);
router.delete('/delete/:user_id', deleteAttendance);

module.exports = router;
