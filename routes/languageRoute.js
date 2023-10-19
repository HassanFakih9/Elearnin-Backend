const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLanguage, getLanguagebyID, getAllLanguages, updateLanguage, deleteLanguage} = require('../controllers/languageController');



router.post('/add', addLanguage);
router.get('/get/:id', getLanguagebyID);
router.get('/getALL', getAllLanguages);
router.put('/update/:id', updateLanguage);
router.delete('/delete/:id', deleteLanguage);

module.exports = router;