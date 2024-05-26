// Requirements to interact with database
const employees = require('express').Router();
const pool = require('../utils/connection');

// Helper function to check if a value is an integer
// consider moving to a utils file
function isInteger(value) {
  return Number.isInteger(Number(value));
}
// Helper function to check if a value is an integer or null
function isIntegerOrNull(value) {
  return value === null || (Number.isInteger(Number(value)) && !isNaN(value));
}

// This function once reciving a get request 
employees.get('/', (req,res)=>{ 
    pool.query('SELECT * FROM employees', (err, res1) => {
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

employees.post('/', async (req,res)=>{
  const{first_name, last_name, role_id, manager_id} = req.body;

  // checks to see if required body inputs exist and are valid
  if (!first_name || !last_name || !role_id){
    return res.status(400).send('All fields (first_name, last_name, role_id, manager_id) are required');
  }
  if (!isInteger(role_id)) {
    return res.status(400).send('role_id must be a valid decimal number');
  }
  if (!isIntegerOrNull(manager_id)) {
    return res.status(400).send('manager_id must be a valid integer or null');
  }
  // Attempts to insert a new employee or alert of failure
  try{
    const newEmployee = await pool.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, role_id, manager_id]
    );
    res.status(201).json(newEmployee.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Server error');
  }
})

module.exports = employees