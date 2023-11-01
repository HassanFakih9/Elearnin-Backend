const db = require('../config/db');


/*post*/
const addAttendance = async (req, res) => {
  const { attendance_day, lesson_id, user_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO  attendance (attendance_day , lesson_id , user_id) VALUES (?,?,?)`,
      [attendance_day, lesson_id, user_id]
    );
    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Attendance added successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new attendance',
      error,
    });
  }
};

/*get*/
const getAttendanceByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM lessons WHERE user_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: 'Attendance data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get attendance',
      error,
    });
  }
};

/*put*/
const updateAttendance = async (req, res) => {
  const { attendance_day, lesson_id, user_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE attendance SET attendance_day=?, lesson_id=?, user_id=? WHERE lesson_id = ?`, [
      attendance_day, lesson_id, user_id, req.params.id
    ]);


    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Attendance updates successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to update the attendance',
      error,
    });
  }
};

/*delete*/
const deleteAttendance = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM attendance WHERE user_id = ?',
      [req.params.id]
    );

    console.log(result);

    if (result.affectedRows > 0) {
      res.status(204).json({
        success: true,
        message: 'Attendance deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Attendance not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to delete the attendance',
      error: error.message
    });
  }
};




module.exports = { addAttendance, getAttendanceByID, updateAttendance, deleteAttendance };