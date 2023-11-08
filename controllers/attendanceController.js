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

//post
const markstudentattendance= async (req, res) => {
  try {
    const { lessonId, userId } = req.body;
    const attendanceDay = new Date(); // Get the current date

    // Insert a new attendance record into the 'attendance' table
    const result = await db.query(
      'INSERT INTO attendance (attendance_day, lesson_id, user_id) VALUES (?, ?, ?)',
      [attendanceDay, lessonId, userId]
    );

    res.json({ success: true, message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to mark attendance' });
  }
};

//get
const languagetaughtbyteacher= async(req,res)=>{
try {
  const teacherId = req.query.teacherId; 
  //  fetch languages taught by the teacher
 
  
  const query = `
    SELECT DISTINCT l.language_id, l.language_name
    FROM languages l
    WHERE l.teacher_id = ?;
  `;  
  const results= await db.query(query, [teacherId]);
  res.json({ languages: results });
  
} catch (error) {
  console.error('Error fetching languages taught by the teacher:', error);
  res.status(500).json({ error: 'Internal server error' });
}
}

//get

const getattendancebylesson= async(req,res)=>{
  try {
    const lessonId = req.query.lessonId;
    //  fetch attendance records for the selected lesson
    const query = `
      SELECT a.attendance_day, u.name AS student_name
      FROM attendance a
      JOIN users u ON a.user_id = u.id
      WHERE a.lesson_id = ?;
    `;
    const results= await db.query(query, [lessonId]);
    res.json({ attendance: results });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
/// fetch languages for the selected level
const getlanguagelevels= async (req, res) => {
  try {
    const languageId = req.query.languageId;
    // Replace this with actual SQL query to fetch levels for the selected language
    const query = `
      SELECT level_id, level_name
      FROM levels
      WHERE language_id = ?;
    `;
    const results=await db.query(query, [languageId]); 
    res.json({ levels: results });  
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getlevellessons= async (req, res) => {
  try {
    const levelId = req.query.levelId;
  // Replace this with actual SQL query to fetch lessons for the selected level
  const query = `
    SELECT lesson_id, lesson_name
    FROM lessons
    WHERE level_id = ?;
  `;
    const results=await db.query(query, [levelId]); 
    res.json({ lessons: results }); 
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = { addAttendance, getAllAttendance, getAttendanceByID, getAttendanceByUserID,
   updateAttendance, deleteAttendance,markstudentattendance,languagetaughtbyteacher,
   getattendancebylesson,getlanguagelevels,getlevellessons };