const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'hassanatsimplon',
  password: '12ab34xy',
  database: 'languagelearning',
  port: 3306 
    
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
});

const createDatabase = () => {
    connection.query('CREATE DATABASE IF NOT EXISTS languagelearning', (err, result) => {
        if (err) throw err;
        console.log('Database created or already exists');
        connection.changeUser({ database: 'languagelearning' }, (err) => {
            if (err) throw err;
            console.log('Using LanguageLearning database');
            createTables();
        });
    });
};

const createTables = () => {
    const databaseConnection = mysql.createConnection({

      host: 'db4free.net',
      user: 'hassanatsimplon',
      password: '12ab34xy',
      database: 'languagelearning',
      port: 3306 
    });

    const usersTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
  )`;

    const languagesTable = `CREATE TABLE IF NOT EXISTS languages (
    language_id INT AUTO_INCREMENT PRIMARY KEY,
    language_name VARCHAR(255)
  )`;
    const levelsTable = `CREATE TABLE IF NOT EXISTS levels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(255),
    description TEXT,
    language_id INT,
    FOREIGN KEY (language_id) REFERENCES languages(language_id)
  )`;

    const lessonsTable = `CREATE TABLE IF NOT EXISTS lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_name VARCHAR(255),
    content TEXT,
    level_id INT,
    FOREIGN KEY (level_id) REFERENCES levels(level_id)
  )`;

    const assessmentTable = `CREATE TABLE IF NOT EXISTS assessment (
    assessment_id INT AUTO_INCREMENT PRIMARY KEY,
    assessment_title VARCHAR(255),
    duration INT,
    lesson_id INT,
    question TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
  )`;

    const attendanceTable = `CREATE TABLE IF NOT EXISTS attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    attendance_day DATE,
    lesson_id INT,
    user_id INT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

    const enrolledLevelsTable = `CREATE TABLE IF NOT EXISTS enrolledLevels (
    enrolledLevels_id INT AUTO_INCREMENT PRIMARY KEY,
    level_id INT,
    user_id INT,
    FOREIGN KEY (level_id) REFERENCES levels(level_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

    const userAssessmentTable = `CREATE TABLE IF NOT EXISTS user_assessment (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    assessment_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assessment_id) REFERENCES assessment(assessment_id)
  )`;




    databaseConnection.query(usersTable, (err, result) => {
        if (err) throw err;
        console.log('Users table created!');
    });

    databaseConnection.query(languagesTable, (err, result) => {
        if (err) throw err;
        console.log('Languages table created!');
    });

    databaseConnection.query(levelsTable, (err, result) => {
        if (err) throw err;
        console.log('Levels table created!');
    });

    databaseConnection.query(lessonsTable, (err, result) => {
        if (err) throw err;
        console.log('Lessons table created!');
    });

    databaseConnection.query(assessmentTable, (err, result) => {
        if (err) throw err;
        console.log('Assessment table created!');
    });

    databaseConnection.query(attendanceTable, (err, result) => {
        if (err) throw err;
        console.log('Attendance table created!');
    });

    databaseConnection.query(enrolledLevelsTable, (err, result) => {
        if (err) throw err;
        console.log('Enrolled Levels table created!');
    });

    databaseConnection.query(userAssessmentTable, (err, result) => {
        if (err) throw err;
        console.log('User Assessment table created!');
    });

    databaseConnection.end((err) => {
        if (err) throw err;
        console.log('Database connection closed');
    });
};



createDatabase();

