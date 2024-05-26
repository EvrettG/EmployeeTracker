// Requirements to interact with database
const roles = require('express').Router();
const pool = require('../utils/connection');

// Helper function to check if a value is a decimal number
// consider moving to utils
function isDecimal(value) {
  return !isNaN(value) && parseFloat(value) === Number(value) && value % 1 !== 0;
}

// This function once reciving a get request 
roles.get('/', (req,res)=>{ 
    pool.query('SELECT * FROM roles', (err, res1) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:');
          console.table(res1.rows);
        //   Note following code is for insomina to stop timeouts, comment out before final push
          res.json("Reults returned succefully");
        }
      });
})

roles.post('/', async (req,res)=>{
  const{title, salary, department_id} = req.body;
    // checks to see if required body inputs exist and are valid
  if (!title || !salary || !department_id){
    return res.status(400).send('All fields (title, salary, department_id) are required');
  }
  if (!isDecimal(salary)) {
    return res.status(400).send('Salary must be a valid decimal number');
  }
  // Attempts to insert a new role or alert of failure
  try{
    const newRole = await pool.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [title, salary, department_id]
    );
    res.status(201).json(newRole.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Server error');
  }
})

module.exports = roles