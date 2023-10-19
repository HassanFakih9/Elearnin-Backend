
const db = require('../config/db');

/*post*/
const addLevel = async (req,res) => {
    const {level_name, description, language_id} = req.body;
    try{
        const result = await db.query(
            `INSERT INTO levels (level_name, description, language_id) VALUES (?,?,?)`, 
            [level_name, description, language_id]
        );
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Level added successfully',
          });
        } catch (error) {
            res.status(400).json({
              success: false,
              message: 'Unable to add new level',
              error,
            });
          }
        };

    /*get*/
    const getLevelByID = async (req, res) => {
        try {
          const [result] = await db.query(`SELECT * FROM levels WHERE level_id = ?`, [
            req.params.id,
          ]);
          res.status(200).json({
            success: true,
            message: 'Level data retrieved successfully',
            data: result,
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Unable to get level',
            error,
          });
        }
      };

      /*getAll*/
    const getAllLevels = async (req, res) => {
        try {
          const [result] = await db.query(`SELECT * FROM levels`)
          
          res.status(200).json({
            success: true,
            message: 'AllLevels retrieved successfully',
            data: result,
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Unable to get Alllevel',
            error,
          });
        }
      };

      /*put*/
      const updateLevel = async (req, res) => {
        const {level_name, description, language_id} = req.body;
    try{
        const result = await db.query(
            `UPDATE levels SET level_name=?, description=?, language_id=? WHERE level_id = ?`, [
               level_name, description, language_id, req.params.id
            ]);
            
        
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'Level updated successfully',
          });
        } catch (error) {
            res.status(400).json({
              success: false,
              message: 'Unable to update the level',
              error,
            });
          }
        };

        /*delete*/
        const deleteLevel = async (req, res) => {
            try {
              const [result] = await db.query(
                'DELETE FROM levels WHERE level_id = ?',
                [req.params.id]
              );
          
              console.log(result);
              
              if (result.affectedRows > 0) {
                res.status(204).json({
                  success: true,
                  message: 'Level deleted successfully',
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: 'Level not found',
                });
              }
            } catch (error) {
              res.status(400).json({
                success: false,
                message: 'Unable to delete the level',
                error: error.message
              });
            }
          };
          
        
       
    
        module.exports = { addLevel, getLevelByID, getAllLevels, updateLevel, deleteLevel};
   