const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLevel, getLevelByID, getAllLevels, updateLevel, deleteLevel} = require('../controllers/levelController');



router.post('/add', addLevel);
router.get('/get/:id', getLevelByID);
router.get('/getALL', getAllLevels);
router.put('/update/:id', updateLevel);
router.delete('/delete/:id', deleteLevel);

module.exports = router;