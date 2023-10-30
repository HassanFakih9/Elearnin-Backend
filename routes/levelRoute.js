const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLevel, getLevelByID, getAllLevels, updateLevel, deleteLevel, getLevelByLanguage} = require('../controllers/levelController');



router.post('/add', addLevel);
router.get('/get/:id', getLevelByID);
router.get('/getBylanguage/:language_id', getLevelByLanguage);
router.get('/getALL', getAllLevels);
router.put('/update/:id', updateLevel);
router.delete('/delete/:id', deleteLevel);

module.exports = router;