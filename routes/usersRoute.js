const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
router.use(cors());
const {  getUsersQuery, updateUserQuery, deleteUserQuery } = require('../controllers/usersController');


router.get('/:role', getUsersQuery);
router.put('/:id', updateUserQuery);
router.delete('/delete/:id', deleteUserQuery);


module.exports = router;