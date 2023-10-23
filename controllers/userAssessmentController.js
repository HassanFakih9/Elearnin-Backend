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


module.exports = { getAllUserAssessment, getUserAssessmentByID, addUserAssessment, updateUserAssessmentbyID, deleteUserAssessmentByID };