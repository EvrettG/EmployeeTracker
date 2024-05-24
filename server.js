// The server.js acts as a server and is run from an independant terminal

const express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool.
const { Pool } = require('pg');

// TODO create routes for api calls to datapase,  get, post, put, and delete for each 3 departments and :id for indivduals, and special calls for merged table views 

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // Username for pstgress, figure out how to hide
    user: 'postgres',
    // Password for pstgress, figure out how to hide
    password: 'postgress',
    host: 'localhost',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
)

pool.connect();

app.listen(PORT, () => {
    // mabey run inquirer from here?
    console.log(`Server running on port ${PORT}`);
  });