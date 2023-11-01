const express = require('express');
const router = express.Router(); // Assuming you have an Express Router
const db = require('../config/db'); // Import your database configuration
const mysql = require('mysql2');
const cors = require('cors');
router.use(cors());
// Define a route to fetch the assessment for a lesson of the enrolled level
router.get('/fetch-assessment/:studentId', async (req, res) => {
  try {
    // Get the student ID from the request
    const studentId = req.params.studentId;

    // Get the enrolled level ID for the student
    const [enrolledLevel] = await db.query('SELECT level_id FROM enrolledLevels WHERE user_id = ?;', [studentId]);

    if (!enrolledLevel) {
      return res.status(404).json({
        success: false,
        message: 'Enrolled level not found for the student',
      });
    }

    const enrolledLevelId = enrolledLevel.level_id;

    // Get the assessment ID for the lesson of the enrolled level
    const [assessment] = await db.query('SELECT assessment_id FROM assessment WHERE lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = ?);', [enrolledLevelId]);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found for the enrolled level',
      });
    }

    const assessmentId = assessment.assessment_id;

    // Get the assessment details
    const [assessmentDetails] = await db.query('SELECT * FROM assessment WHERE assessment_id = ?;', [assessmentId]);

    if (!assessmentDetails) {
      return res.status(404).json({
        success: false,
        message: 'Assessment details not found',
      });
    }

    // Return the assessment details
    res.status(200).json({
      success: true,
      message: 'Assessment fetched successfully',
      data: assessmentDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch assessment',
      error: error.message,
    });
  }
});





////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////


// Define a route to fetch the assessment details for the selected lesson of the enrolled level
router.get('/fetch-assessment/:studentId/:lessonId', async (req, res) => {
  try {
  
    const lessonId = req.params.lessonId;

    // Get the assessment ID for the lesson
    const [assessment] = await db.query('SELECT assessment_id FROM assessment WHERE lesson_id = ?;', [lessonId]);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found for the selected lesson',
      });
    }

    const assessmentId = assessment.assessment_id;

    // Get the assessment details
    const [assessmentDetails] = await db.query('SELECT * FROM assessment WHERE assessment_id = ?;', [assessmentId]);

    if (!assessmentDetails) {
      return res.status(404).json({
        success: false,
        message: 'Assessment details not found',
      });
    }

    // Return the assessment details
    res.status(200).json({
      success: true,
      message: 'Assessment fetched successfully',
      data: assessmentDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch assessment',
      error: error.message,
    });
  }
});

module.exports = router;

