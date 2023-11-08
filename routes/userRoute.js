const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


const { logIn, signUp, deleteUser, updateUser, getUserById, getAllUsers, getUsersByRole } = require('../controllers/userController');

router.post('/login', logIn);
router.post('/signup', upload.single('image'), signUp);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', upload.single('image'), updateUser);
router.get('/get/:id', getUserById);
router.get('/getAll', getAllUsers);
router.get('/getAll/:role', getUsersByRole);


module.exports = router;