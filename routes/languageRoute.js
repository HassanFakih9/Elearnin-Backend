const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { addLanguage, getLanguagebyID, getAllLanguages, updateLanguage, deleteLanguage} = require('../controllers/languageController');
const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()});


router.post('/add', upload.single("image"), addLanguage);
router.get('/get/:id', getLanguagebyID);
router.get('/getALL', getAllLanguages);
router.put('/update/:id', updateLanguage);
router.delete('/delete/:id', deleteLanguage);

module.exports = router;