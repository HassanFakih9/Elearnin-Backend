const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const router = express.Router();
router.use(cors());
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'hassanatsimplon',
    password: '12ab34xy',
    database: 'languagelearning',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
});

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

    console.log('Received request for language:', language, 'and level:', level);

    const query = `
      SELECT * FROM lessons
      INNER JOIN levels ON lessons.level_id = levels.level_id
      WHERE levels.language_id = ? AND levels.level_name = ?;
    `;

    console.log('SQL Query:', query);

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

// Add a new API endpoint to fetch enrolled levels for a student
router.get('/enrolled-levels', (req, res) => {
    const { userId } = req.query;
  
    const query = `
      SELECT levels.level_id, levels.level_name
      FROM enrolledLevels
      JOIN levels ON enrolledLevels.level_id = levels.level_id
      WHERE enrolledLevels.user_id = ?;
    `;
  
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve enrolled levels' });
      } else {
        console.log(result)
        res.json(result);
      }
    });
  });
  
module.exports = router;