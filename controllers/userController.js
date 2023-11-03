const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { imageUploader } = require('../extra/imageUploader');

// Login Route
const logIn = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    try {
        const [result] = await db.query(query, [email]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.json({ role: user.role });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Signup Route
const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const checkQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await db.query(checkQuery, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // // Handle file upload (assuming imageUploader is an asynchronous function)
        // const profile_url = await imageUploader(req);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        const insertResult = await db.query(createUser, [name, email, hashedPassword, role]);
        if (insertResult[0].affectedRows > 0)
            return res.json({ message: 'User created successfully!' });
        else
            return res.json({ message: 'User not created successfully!' });
    } catch (error) {
        console.error('Error:', error.data);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deleteUser = 'DELETE FROM users WHERE id = ?';

    try {
        const [response] = await db.query(deleteUser, [id]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
};

// Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updateUser = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';

    try {
        const [response] = await db.query(updateUser, [name, email, password, id]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    const getUser = 'SELECT * FROM users WHERE id = ?';

    try {
        const [result] = await db.query(getUser, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching user' });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = 'SELECT * FROM users';
        const [result] = await db.query(getAllUsers);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get Users By Role
const getUsersByRole = async (req, res) => {
    const role = req.params.role;

    try {
        const [response] = await db.query('SELECT * FROM users WHERE role = ?', [role]);

        if (response)
            res.status(200).json({ data: response });
        else
            res.status(500).json({ error: 'Internal server error' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { logIn, signUp, deleteUser, updateUser, getUserById, getAllUsers, getUsersByRole };