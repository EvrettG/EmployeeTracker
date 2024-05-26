// Requirements to interact with database
const departments = require('express').Router();
const pool = require('../utils/connection');

// This function once reciving a get request 
departments.get('/', (req,res)=>{ 
    pool.query('SELECT * FROM departments', (err, res1) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:');
          console.table(res1.rows);
        //   Note following code is for insomina to stop timeouts, comment out before final push
          res.json("Reults from departments returned succefully");
        }
      });
})


departments.post('/',async (req,res)=>{
  const{department_name} = req.body;
  // checks if department_name exists
  if(!department_name){
    return res.status(400).send('Department name is required');
  }
  // Attempts to insert a new department or alert of failure
  try {
    const newDepartment = await pool.query(
      'INSERT INTO departments (department_name) VALUES ($1) RETURNING *',
      [department_name]
    );
    res.status(201).json(newDepartment.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Server error');
  }
});

departments.delete('/:id', async (req, res)=>{
  const {id} = req.params;
  if (isNaN(id)){
    return res.status(400).send('ID must be a valid number');
  }

  try {
    const result = await pool.query(
      'DELETE FROM departments WHERE id = $1 RETURNING *',
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

module.exports = departments