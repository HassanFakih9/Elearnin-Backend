const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const router = express.Router();
router.use(cors());
const connection = require('../config/db');


router.use(express.json());

// Delete user based on role
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  const deleteUserQuery = `DELETE FROM users WHERE id = ? AND role = ?`;

  connection.query(deleteUserQuery, [id, role], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('User not found');
      } else {
        res.sendStatus(200);
      }
    }
  });
});


router.get('/:role', (req, res) => {
  const { role } = req.params;
  const { name, email } = req.query;

  let getUsersQuery = `SELECT * FROM users WHERE role = ?`;

  if (name) {
    getUsersQuery += ` AND name LIKE '%${name}%'`;
  }
  if (email) {
    getUsersQuery += ` AND email LIKE '%${email}%'`;
  }

  connection.query(getUsersQuery, [role], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    } else {
      res.status(200).json(rows);
    }
  });
});
/////////////////////////////////////////////////////////////////////
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body; 

  const updateUserQuery = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

  connection.query(
    updateUserQuery,
    [name, email, password, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating user');
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send('User not found');
        } else {
          res.sendStatus(200);
        }
      }
    }
  );
});


module.exports = router;