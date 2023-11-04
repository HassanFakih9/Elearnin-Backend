const db = require('../config/db');

const addEnroll = async (req, res) => {
    const studentId = req.body.student_id;
    const levelId = req.body.level_id;
    const insertEnrolledLevel = 'INSERT INTO enrolledLevels (user_id, level_id) VALUES (?, ?)';

    try {
        const [response] = await db.query(insertEnrolledLevel, [studentId, levelId]);

        if (!response) {
            res.status(500).json({ error: 'Failed to enroll student' });
        } else {
            res.json({ message: 'Student enrolled successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLanguages = async (req, res) => {
    try {
        const query = 'SELECT * FROM languages';
        const [results] = await db.query(query);

        res.status(200).json({ languages: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
};

const getLevelsByLanguage = async (req, res) => {
    const languageId = req.query.language_id;

    try {
        const query = 'SELECT * FROM levels WHERE language_id = ?';
        const [results] = await db.query(query, [languageId]);

        res.status(200).json({ levels: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch levels' });
    }
};

const getLessonsbylevel = async (req, res) => {
    const { language, level } = req.query;

    try {
        const query = `
            SELECT * FROM lessons
            INNER JOIN levels ON lessons.level_id = levels.level_id
            WHERE levels.language_id = ? AND levels.level_name = ?;
        `;
        const [result] = await db.query(query, [language, level]);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve lessons' });
    }
};

const getEnrolledLevels = async (req, res) => {
    const userId = req.query.user_id;
    const languageId = req.query.language_id;

    try {
        const query = `
            SELECT levels.level_id, levels.level_name
            FROM enrolledLevels
            JOIN levels ON enrolledLevels.level_id = levels.level_id
            WHERE enrolledLevels.user_id = ? AND levels.language_id = ?;
        `;

        const [result] = await db.query(query, [userId, languageId]);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve enrolled levels' });
    }
};

const getLanguageByStudent = async (req, res) => {
    try {
      const [result] = await db.query(`
      SELECT enrolledLevels.level_id, levels.language_id, levels.level_id, levels.level_name, languages.language_id, enrolledLevels.user_id, languages.language_name
      FROM enrolledLevels 
          LEFT JOIN levels ON enrolledLevels.level_id = levels.level_id 
          LEFT JOIN languages ON levels.language_id = languages.language_id
      WHERE enrolledLevels.user_id = ?;`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error,
      });
    }
  };

module.exports = { addEnroll, getLanguages, getLevelsByLanguage, getLessonsbylevel, getEnrolledLevels, getLanguageByStudent };