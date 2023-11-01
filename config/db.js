require('dotenv').config();
const mysql = require('mysql2');
const PORT = process.env.PORT;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connection = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: PORT 
});

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('connected successfully');
  });
  
  module.exports = connection