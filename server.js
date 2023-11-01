require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const connection = require('./config/db');
const lessonRoutes = require('./routes/lessonRoute');
const levelsRouter = require('./routes/levelRoute');
const languagesRouter = require('./routes/languageRoute');
const usersRouter = require('./routes/userRoute');
const enrolledLevelsRouter = require('./routes/enrolledLevelsRoute');
const assessmentRoutes = require('./routes/assessmentRoute');
const userAssessmentRoutes = require('./routes/userAssessmentRoute');
const attendanceRoutes = require('./routes/attendanceRoute');

app.use(cors());
app.use(bodyParser.json());
app.use('/lessons', lessonRoutes);
app.use('/levels', levelsRouter);
app.use('/languages', languagesRouter);
app.use('/users', usersRouter);
app.use('/enroll', enrolledLevelsRouter);
app.use('/assessment', assessmentRoutes);
app.use('/userAssessment', userAssessmentRoutes);
app.use('/attendance', attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});