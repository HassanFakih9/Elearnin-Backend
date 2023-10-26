const db = require ('../config/db');




   /*get*/
   const getUsersQuery = async (req, res) => {
    const { role } = req.params;
  const { name, email } = req.query;

  let usersQuery = `SELECT * FROM users WHERE role = ?`;

  if (name) {
    usersQuery += ` AND name LIKE '%${name}%'`;
  }
  if (email) {
    usersQuery += ` AND email LIKE '%${email}%'`;
  }
console.log(usersQuery);
 const result = await db.query(usersQuery, [role]) 
    if (result) {
      console.log('Hello');
       res.status(200).json(result);
      } else {
      console.log('err');
       res.status(500).send('Error fetching users');
    }
  
};

/*put*/
const deleteUserQuery = async (req, res) => {
    const { id } = req.params;
  const { role } = req.query;
  const deleteUserQuery = `DELETE FROM users WHERE id = ? AND role = ?`;

  db.query(deleteUserQuery, [id, role], (err, result) => {
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
};

/*update*/
const updateUserQuery = async (req, res) => {
const { id } = req.params;
  const { name, email, password } = req.body; 

  const updateUserQuery = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

  db.query(
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
};

module.exports = { getUsersQuery, updateUserQuery, deleteUserQuery };