const db = require('../config/db');


/*post*/
const addLesson = async (req, res) => {
  const { lesson_name, overview, content, level_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO lessons (lesson_name, overview, content, level_id) VALUES (?,?,?,?)`,
      [lesson_name, overview, content, level_id]
    );
    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Lesson added successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new lesson',
      error,
    });
  }
};

/*get*/
const getLessonByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM lessons WHERE lesson_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: 'Lesson data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get lesson',
      error,
    });
  }
};

/*put*/
const updateLesson = async (req, res) => {
  const { lesson_name, overview, content, level_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE lessons SET lesson_name=?, overview=?, content=?, level_id=? WHERE lesson_id = ?`, [
      lesson_name, overview, content, level_id, req.params.id
    ]);


    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Lesson updates successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to update the lesson',
      error,
    });
  }
};

/*delete*/
const deleteLesson = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM lessons WHERE lesson_id = ?',
      [req.params.id]
    );

    console.log(result);

    if (result.affectedRows > 0) {
      res.status(204).json({
        success: true,
        message: 'Lesson deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to delete the lesson',
      error: error.message
    });
  }
};




module.exports = { addLesson, getLessonByID, updateLesson, deleteLesson };
