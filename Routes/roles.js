// Requirements to interact with database
const roles = require('express').Router();
const pool = require('../utils/connection');

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


module.exports = roles