const db = require('../config/db');

const getAllAssessment = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM assessment`);
        res.status(200).json({
            success: true,
            message: 'Assessment retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to retrieve assessment',
            error,
        });
    }
};

const getAssessmentByID = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM assessment WHERE assessment_id = ?`, [
            req.params.id,
        ]);
        res.status(200).json({
            success: true,
            message: 'Assessment retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to retrieve assessment',
            error,
        });
    }
};

const addAssessment = async (req, res) => {
    const { assessment_title, duration, lesson_id, question } = req.body;
    console.log(req.body);
    try {
        const result = await db.query(
            `INSERT INTO assessment (assessment_title, duration, lesson_id, question) VALUES (?,?,?,?);`,
            [assessment_title, duration, lesson_id, question]
        );
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Assessment added successfully',
        });
    } catch ( error) {
        res.status(400).json({
            success: false,
            message: 'Unable to add new assessment',
            error,
        });
    }
};

const updateAssessmentbyID = async (req, res) => {
    const { assessment_title, duration, lesson_id, question } = req.body;
    try {
        const result = await db.query(
            "UPDATE assessment SET assessment_title = ?, duration = ?, lesson_id = ?, question = ? WHERE assessment_id = ?",
            [assessment_title, duration, lesson_id, question, req.params.id]
        );

        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Assessment updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update assessment',
            error: error.message,
        });
    }
};

const deleteAssessmentByID = async (req, res) => {
    try {
        const [result] = await db.query(`DELETE FROM assessment WHERE assessment_id = ?`, [
            req.params.id,
        ]);

        console.log(result);

        if (result.affectedRows > 0) {
            res.status(204).json({
                success: true,
                message: 'Assessment deleted successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Assessment not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to delete assessment',
            error: error.message
        });
    }
};

const getAssessmentByLesson = async (req, res) => {
    try {
        const { lesson_id  } = req.params;
        
        const [result] = await db.query('SELECT * FROM assessment WHERE lesson_id = ?', [lesson_id ]);
        

        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Assessments retrieved successfully',
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No assessments found for the lesson.',
            });
        }
    } catch (error) {
        console.error('Error in getAssessmentByLesson:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


module.exports = { getAllAssessment, getAssessmentByID, addAssessment, updateAssessmentbyID, deleteAssessmentByID, getAssessmentByLesson };
