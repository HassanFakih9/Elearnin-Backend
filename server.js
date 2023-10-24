require('dotenv').config();
const mysql = require('mysql2');
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT;
require('./config/db');
const usersRouter = require('./routes/usersRoute'); 
const lessonRoutes = require('./routes/lessonRoute');
const levelsRouter = require('./routes/levelRoute');
const languagesRouter = require('./routes/languageRoute');



app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/lessons', lessonRoutes);
app.use('/levels', levelsRouter);
app.use('/languages', languagesRouter);




const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connection = mysql.createPool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
});

connection.getConnection((err) =>{
    if (err) {
        console.log(err)
        return;
    }
    console.log('WOOHOOOO connected successfully!');
});






app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  
  connection.query(query, [email, password], (err, result) => {
    if (err) throw err;
    
    if (result.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      const user = result[0];
      res.json({ role: user.role });
    }
  });
});


app.get('/user', (req, res) => {
  const role = req.query.role;
  
  if (role === 'student') {
    res.send('Welcome, Student!');
  } else if (role === 'teacher') {
    res.send('Welcome, Teacher!');
  } else if (role === 'admin') {
    res.send('Welcome, Admin!');
  } else {
    res.status(404).send('Page not found');
  }
});

// Signup 
app.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    res.status(400).json({ message: 'Please fill in all fields' });
    return;
  }
  
  
  const checkQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(checkQuery, [email], (err, result) => {
    if (err) throw err;
    
    if (result.length > 0) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      
      const createUserQuery = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
      
      
bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
  if (hashErr) {
    
    console.error('Error hashing password:', hashErr);
    res.status(500).json({ message: 'Internal server error' });
  } else {
        connection.query(createUserQuery, [name, email, hashedPassword, role], (err, result) => {
          if (err) {
            
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Failed to create user' });
          } else {
            res.json({ message: 'User created successfully!' });
          }
        });
      }});
    }});
  })

  
  
  
  app.listen(PORT, () =>{
      console.log(`Server is running on PORT ${PORT} `);
  });
  module.exports = connection.promise();