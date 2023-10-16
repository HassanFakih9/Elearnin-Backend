const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const usersRouter = require('./routes/users'); 
const port = 3000;
app.use(bodyParser.json());
app.use('/users', usersRouter);


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LanguageLearning'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server!');
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
        connection.query(createUserQuery, [name, email, password, role], (err, result) => {
          if (err) throw err;
          res.json({ message: 'User created successfully!' });
        });
      }
    });
  });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
