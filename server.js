// The server.js acts as a server and is run from an independant terminal
require('dotenv').config();
const express = require('express');

// TODO create routes for api calls to datapase,  get, post, put, and delete for each 3 departments and :id for indivduals, and special calls for merged table views 
const api = require('./Routes/index')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);

app.listen(PORT, () => {
    // mabey run inquirer frprocess.env.DB_PASSWORDom here?
    console.log(`Server running on port ${PORT}`);
  });