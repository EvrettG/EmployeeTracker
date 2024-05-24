require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool(
    {
      // Username for pstgress, figured out how to hide
      user: process.env.DB_USER,
      // Password for pstgress, figured out how to hide
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employeeTracker_db database.`)
  );

  pool.on('connect', () => {
    console.log(`Connected to the ${process.env.DB_NAME} database.`);
  });

  module.exports = pool