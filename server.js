require('dotenv').config();
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT;
const usersRouter = require('./routes/usersRoute'); 
const lessonRoutes = require('./routes/lessonRoute');
const levelsRouter = require('./routes/levelRoute');
const languagesRouter = require('./routes/languageRoute');
const assessmentRoutes = require('./routes/assessmentRoute');
const userAssessmentRoutes = require('./routes/userAssessmentRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const connection = require('./config/db');
const multer = require('multer');
const { imageUploader } = require('./extra/imageUploader');
const upload = multer({storage:multer.memoryStorage()});



app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/lessons', lessonRoutes);
app.use('/levels', levelsRouter);
app.use('/languages', languagesRouter);
app.use('/assessment', assessmentRoutes);
app.use('/userAssessment', userAssessmentRoutes),
app.use('/attendance', attendanceRoute);

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  connection.query(query, [email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      const user = result[0];
      const hashedPassword = user.password;

      bcrypt.compare(password, hashedPassword, (hashErr, isValid) => {
        if (hashErr) {
          console.error('Error comparing passwords:', hashErr);
          res.status(500).json({ message: 'Internal server error' });
        } else if (isValid) {
          res.json({ role: user.role });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      });
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
app.post('/signup',upload.single("image"), (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role ) {
    res.status(400).json({ message: 'Please fill in all fields' });
    return;
  }
  
  
  const checkQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(checkQuery, [email], async (err, result) => {
    if (err) throw err;
    
    if (result.length > 0) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      
      const createUserQuery = `INSERT INTO users (name, email, password, role, profile_url) VALUES (?, ?, ?, ?, ?)`;
      const profile_url = await imageUploader(req)
      
bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
  if (hashErr) {
    
    console.error('Error hashing password:', hashErr);
    res.status(500).json({ message: 'Internal server error' });
  } else {
        connection.query(createUserQuery, [name, email, hashedPassword, role, profile_url], (err, result) => {
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
 