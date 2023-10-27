const db = require('../config/db');

//  student enrollmente API 
router.post('/enroll', (req, res) => {
    const studentId = req.body.studentId;
    const levelId = req.body.levelId;

    db.query('INSERT INTO enrolledLevels (user_id, level_id) VALUES (?, ?)', [studentId, levelId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to enroll student' });
        } else {
            res.json({ message: 'Student enrolled successfully' });
        }
    });
});



router.get('/get-languages', (req, res) => {
    db.query('SELECT * FROM languages', (err, results) => {
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
    db.query('SELECT * FROM levels WHERE language_id = ?', [languageId], (err, results) => {
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

    db.query(query, [language, level], (err, result) => {
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
  
    db.query(query, [userId, languageId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve enrolled levels' });
      } else {
        res.json(result);
      }
    });
  });
  
  router.get('/api/lessons', (req, res) => {
    const selectedLanguage = req.query.language;
    const selectedLevel = req.query.level;
    const enrolledLevels = req.query.enrolledLevels.split(',').map(Number); // Assuming enrolledLevels is passed as a comma-separated string of level IDs
  
    const query = `
      SELECT * FROM lessons
      INNER JOIN levels ON lessons.level_id = levels.level_id
      WHERE levels.language_id = ? AND levels.level_name = ? AND levels.level_id IN (?)
    `;
  
    db.query(query, [selectedLanguage, selectedLevel, enrolledLevels], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve lessons' });
      } else {
        res.json(rows);
      }
    });
  });

module.exports = router;