const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addAttendance, getAllAttendance, getAttendanceByID, getAttendanceByUserID, updateAttendance,
     deleteAttendance,markstudentattendance ,getattendancebylesson,
     getlevellessons,getlanguagelevels,languagetaughtbyteacher} = require('../controllers/attendanceController');

router.post('/add', addAttendance);
router.get('/getAll', getAllAttendance);
router.get('/get/:id', getAttendanceByID);
router.get('/get/:user_id/:lesson_id', getAttendanceByUserID);
router.put('/update/:id', updateAttendance);
router.delete('/delete/:id', deleteAttendance);
router.post('/markattendance',markstudentattendance);
router.get('/languages',languagetaughtbyteacher)
router.get('/levels',getlanguagelevels)
router.get('/lessons',getlevellessons)
router.get('/attendance',getattendancebylesson)


module.exports = router;