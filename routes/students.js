const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const router = express.Router();
router.use(cors());
const connection = require('../config/db');

router.use(express.json());
//  student enrollmente API 
router.post('/enroll', (req, res) => {
  const studentId = req.body.studentId;
  const levelId = req.body.levelId;

  connection.query('INSERT INTO enrolledLevels (user_id, level_id) VALUES (?, ?)', [studentId, levelId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to enroll student' });
    } else {
      res.json({ message: 'Student enrolled successfully' });
    }
  });
});



router.get('/get-languages', (req, res) => {
  connection.query('SELECT * FROM languages', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch languages' });
    } else {
      res.json({ languages: results });
    }
  });
});

router.get('/get-levels', (req, res) => {
  const languageId = req.query.language_id;
  connection.query('SELECT * FROM levels WHERE language_id = ?', [languageId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch levels' });
    } else {
      res.json({ levels: results });
    }
  });
});

router.get('/lessons', (req, res) => {
  const { language, level } = req.query;

  // console.log('Received request for language:', language, 'and level:', level);

  const query = `
      SELECT * FROM lessons
      INNER JOIN levels ON lessons.level_id = levels.level_id
      WHERE levels.language_id = ? AND levels.level_name = ?;
    `;

  // console.log('SQL Query:', query);

  connection.query(query, [language, level], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve lessons' });
    } else {
      console.log('Query Result:', result);
      res.json(result);
    }
  });
});


router.get('/enrolled-levels', (req, res) => {
  const userId = req.query.userId;
  const languageId = req.query.language_id;

  const query = `
      SELECT levels.level_id, levels.level_name
      FROM enrolledLevels
      JOIN levels ON enrolledLevels.level_id = levels.level_id
      WHERE enrolledLevels.user_id = ? AND levels.language_id = ?;
    `;

  connection.query(query, [userId, languageId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve enrolled levels' });
    } else {
      res.json(result);
    }
  });
});


router.get('/fetch-assessment/:studentId/:lessonId', (req, res) => {
  const studentId = req.params.studentId;
  const lessonId = req.params.lessonId;

  // Get the assessment ID for the lesson
  connection.query('SELECT assessment_id FROM assessment WHERE lesson_id = ?;', [lessonId], (error, results, fields) => {
    if (error) {
      console.error('Error fetching assessment ID:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching assessment ID',
        error: error.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found for the selected lesson',
      });
    }

    const assessmentId = results[0].assessment_id;

    // Get the assessment details
    connection.query('SELECT * FROM assessment WHERE assessment_id = ?;', [assessmentId], (error, details, fields) => {
      if (error) {
        console.error('Error fetching assessment details:', error);
        return res.status(500).json({
          success: false,
          message: 'Error fetching assessment details',
          error: error.message,
        });
      }

      if (details.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Assessment details not found',
        });
      }

      // Return the assessment details
      res.status(200).json({
        success: true,
        message: 'Assessment fetched successfully',
        data: details[0],
      });
    });
  });
});

router.put('/submit-assessment', (req, res) => {
  const assessmentId = req.body.assessmentId;
  const studentId = req.body.studentId;

  // Insert a new row with the provided assessmentId, studentId, and "Submitted" submission
  connection.query(
    'INSERT INTO user_assessment (assessment_id, user_id, submission) VALUES (?, ?, "Submitted")',
    [assessmentId, studentId],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error(insertErr);
        res.status(500).json({ error: 'Failed to submit the assessment' });
      } else {
        res.json({ message: 'Assessment submitted successfully' });
      }
    }
  );
});


module.exports = router;