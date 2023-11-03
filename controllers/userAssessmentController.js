const db = require('../config/db');

const getAllUserAssessment = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM user_assessment`);
        res.status(200).json({
            success: true,
            message: 'User assessment retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to retrieve user assessment',
            error,
        });
    }
};

const getUserAssessmentByID = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM user_assessment WHERE assessment_id = ?`, [
            req.params.id,
        ]);
        res.status(200).json({
            success: true,
            message: 'User assessment retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to retrieve user assessment',
            error,
        });
    }
};

const addUserAssessment = async (req, res) => {
    const { user_id, assessment_id, submission } = req.body;
    console.log(req.body);
    try {
        const result = await db.query(
            `INSERT INTO user_assessment (user_id, assessment_id, submission) VALUES (?,?,?);`,
            [user_id, assessment_id, submission]
        );
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'User assessment added successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to add user assessment',
            error,
        });
    }
};

const updateUserAssessmentbyID = async (req, res) => {
    const { user_id, assessment_id, submission } = req.body;
    try {
        const result = await db.query(
            "UPDATE user_assessment SET user_id = ?, assessment_id = ?, submission = ? WHERE feedback_id = ?",
            [user_id, assessment_id, submission, req.params.id]
        );

        console.log(result);
        res.status(200).json({
            success: true,
            message: 'User assessment updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update user assessment',
            error: error.message,
        });
    }
};

const deleteUserAssessmentByID = async (req, res) => {
    try {
        const [result] = await db.query(`DELETE FROM user_assessment WHERE assessment_id = ?`, [
            req.params.id,
        ]);

        console.log(result);

        if (result.affectedRows > 0) {
            res.status(204).json({
                success: true,
                message: 'User assessment deleted successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User assessment not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to delete user assessment',
            error: error.message
        });
    }
};

const lessonIDAssessment = async (req, res) => {
    const studentId = req.params.studentId;
    const lessonId = req.params.lessonId;

    try {
        const query1 = 'SELECT assessment_id FROM assessment WHERE lesson_id = ?';
        const [results] = await db.query(query1, [lessonId]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found for the selected lesson',
            });
        }

        const assessmentId = results[0].assessment_id;

        const query2 = 'SELECT * FROM assessment WHERE assessment_id = ?';
        const [details] = await db.query(query2, [assessmentId]);

        if (details.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Assessment details not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Assessment fetched successfully',
            data: details[0],
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const submitUserAssessment = async (req, res) => {
    const assessmentId = req.body.assessmentId;
    const studentId = req.body.studentId;

    try {
        const query = 'INSERT INTO user_assessment (assessment_id, user_id, submission) VALUES (?, ?, "Submitted")';
        await db.query(query, [assessmentId, studentId]);

        res.status(200).json({ message: 'Assessment submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit the assessment' });
    }
};

module.exports = { getAllUserAssessment, getUserAssessmentByID, addUserAssessment, updateUserAssessmentbyID, deleteUserAssessmentByID, lessonIDAssessment, submitUserAssessment };