const db = require('../config/db');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const FormData = require('form-data');

/*post*/
const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });


const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {

    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });



const addLanguage = async (req, res) => {
  const { language_name, language_img } = req.body;
  try {

    const formData = new FormData();

    formData.append('key', process.env.Key);
    formData.append('image', req.file.buffer.toString('base64'));
    console.log(req.file);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData);
    console.log(response);
    const imageUrl = response.data.data.url

    // Insert the language into your database
    const result = await db.query(
      'INSERT INTO languages (language_name, language_img) VALUES (?, ?)',
      [language_name, imageUrl]
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Language added successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new language',
      error,
    });
  }
};

/*get*/
const getLanguagebyID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM languages WHERE language_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: 'Langauge data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get language',
      error,
    });
  }
};

/*getAll*/
const getAllLanguages = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM languages`)

    res.status(200).json({
      success: true,
      message: 'AllLanguages retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get AllLanguages',
      error,
    });
  }
};

/*put*/
const updateLanguage = async (req, res) => {
  const { language_name, language_img } = req.body;
  try {
    const result = await db.query(
      `UPDATE languages SET language_name=?, language_img=? WHERE language_id = ?`, [
      language_name, language_img, req.params.id
    ]);


    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Language updates successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to update the language',
      error,
    });
  }
};

/*delete*/
const deleteLanguage = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM languages WHERE language_id = ?',
      [req.params.id]
    );

    console.log(result);

    if (result.affectedRows > 0) {
      res.status(204).json({
        success: true,
        message: 'Language deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Language not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to delete the language',
      error: error.message
    });
  }
};

const getLanguagebyTeacherId = async (req, res) => {
  const teacher_id = req.params.teacher_id; // Use teacher_id parameter

  const [response] = await db.query('SELECT * FROM languages WHERE teacher_id = ?', [teacher_id]);
  if (response)
    res.status(200).json({ data: response });
  else
    res.status(500).json({ error: 'Internal server error' });
}

const assignLanguageToTeacher = async (req, res) => {
  try {
    const [result] = await db.query(`
      UPDATE languages SET teacher_id=? WHERE language_id=?
    `, [req.params.teacher_id, req.params.language_id]);

    if (result) {
      res.status(200).json({ data: result });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const newLanguage = async (req, res) => {
  try {
    const query = "SELECT * FROM languages WHERE teacher_id IS NULL";
    const [result] = await db.query(query);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No available languages found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = { addLanguage, getLanguagebyID, getAllLanguages, updateLanguage, deleteLanguage, getLanguagebyTeacherId, assignLanguageToTeacher, newLanguage };