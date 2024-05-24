const departments = require('express').Router();
const pool = require('../utils/connection');


departments.get('/', (req,res)=>{
    
    pool.query('SELECT * FROM departments', (err, res1) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:');
          console.table(res1.rows);
        //   Note following code is for insomina to stop timeouts
          res.json("Reults returned succefully");
        }
        pool.end(); // Close the pool when done
      });
})


module.exports = departments