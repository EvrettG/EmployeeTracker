// The server.js acts as a server and is run from an independant terminal

const express = require('express');
// const init = require('./index')
// TODO create routes for api calls to datapase,  get, post, put, and delete for each 3 departments and :id for indivduals, and special calls for merged table views 
const api = require('./Routes/index')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });