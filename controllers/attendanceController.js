const db = require('../config/db');


/*post*/
const addAttendance = async (req, res) => {
  const { attendance_day, lesson_id, user_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO attendance (attendance_day , lesson_id , user_id) VALUES (?,?,?)`,
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
const getAllAttendance = async (req, res) => {
  try {
      const [result] = await db.query(`SELECT * FROM attendance`);
      res.status(200).json({
          success: true,
          message: 'Attendance retrieved successfully',
          data: result,
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: 'Unable to retrieve attendance',
          error,
      });
  }
};
const getAttendanceByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM attendance WHERE attendance_id = ?`, [
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

const getAttendanceByUserID = async (req, res) => {
  const userId = req.params.user_id;
  const lessonId = req.params.lesson_id;

  try {
    const query = 'SELECT * FROM attendance WHERE user_id = ? AND lesson_id = ?';
    const [rows] = await db.query(query, [userId, lessonId]);

    res.status(200).json({ attendance: rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/*put*/
const updateAttendance = async (req, res) => {
  const { attendance_day, lesson_id, user_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE attendance SET attendance_day=?, lesson_id=?, user_id=? WHERE attendance_id = ?`, [
      attendance_day, lesson_id, user_id, req.params.id
    ]);


    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Attendance updated successfully',
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
      'DELETE FROM attendance WHERE attendance_id = ?',
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




module.exports = { addAttendance, getAllAttendance, getAttendanceByID, getAttendanceByUserID, updateAttendance, deleteAttendance };