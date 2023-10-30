const db = require ('../config/db');


/*post*/
const addLesson = async (req,res) => {
    const {lesson_name, overview, content, level_id} = req.body;
    try{
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

        /*getAll*/
    const getAllLessons = async (req, res) => {
      try {
        const [result] = await db.query(`SELECT * FROM lessons`, [
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
        const {lesson_name, overview, content, level_id} = req.body;
    try{
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
          
          const getLessonsByLevel = async (req, res) => {
            const level_id = req.params.level_id; // Use level_id parameter
          
            const [response] = await db.query('SELECT * FROM lessons WHERE level_id = ?', [level_id]);
            if (response)
                res.status(200).json({ data: response });
              else
                res.status(500).json({ error: 'Internal server error' });

            // , (error, results) => {
            //   if (error) {
            //     console.error('Error fetching lessons:', error);
            //     res.status(500).json({ error: 'Internal server error' });
            //   } else {
            //     res.status(200).json({ data: results });
            //   }
            // });
          };
          
        
       
    
        module.exports = { addLesson, getAllLessons, getLessonByID, updateLesson, deleteLesson, getLessonsByLevel};
   