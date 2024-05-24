const departments = require('express').Router();
const pool = require('../utils/connection');


departments.get('/', (req,res)=>{
    
    pool.query('SELECT * FROM departments', (err, res) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:');
          console.table(res.rows)
        }
        pool.end(); // Close the pool when done
      });
})


module.exports = departments