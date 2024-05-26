// Requirements to interact with database
const employees = require('express').Router();
const pool = require('../utils/connection');

// Helper function to check if a value is an integer
// consider moving to a utils file
function isInteger(value) {
  return Number.isInteger(Number(value));
};
// Helper function to check if a value is an integer or null
function isIntegerOrNull(value) {
  return value === null || (Number.isInteger(Number(value)) && !isNaN(value));
};

// This function once reciving a get request 
employees.get('/', (req,res)=>{ 
    pool.query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, CASE WHEN m.id IS NULL THEN NULL ELSE CONCAT(m.first_name, ' ', m.last_name) END AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN employees m ON e.manager_id = m.id`, (err, res1) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:');
          console.table(res1.rows);
        //   Note following code is for insomina to stop timeouts, comment out before final push
          res.json("Reults returned succefully");
        }
      });
});

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

// this is the delete call for employees based on id
employees.delete('/:id', async (req, res)=>{
  // gets id from call and places it into a const
  const {id} = req.params;
  // Checks if id is a number and abourts function if it isnt
  if (isNaN(id)){
    return res.status(400).send('ID must be a valid number');
  }
  // attempts to perform the function
  try {
    const result = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send('Department not found');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Server error');
  }
});
// patch function to update who an employee's manager is. Note patch instead of put as put is for upadating entire row
employees.patch('/:id', async (req, res) => {
  // get's the id for employee being updates from the parameters while the manager id is sent via the body.
  // TODO test if it's possible to reverse the order to make the same changes and seek clarification on which is perfered
  const employeeId = req.params.id;
  const { manager_id } = req.body;
  // Checks if manager id is either a number or null
  if (typeof manager_id !== 'number' && manager_id !== null) {
    return res.status(400).json({ error: 'Manager ID must be a number or null' });
  }

  try {
    const result = await pool.query(
      'UPDATE employees SET manager_id = $1 WHERE id = $2 RETURNING *',
      [manager_id, employeeId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Server error');
  }
});

module.exports = employees