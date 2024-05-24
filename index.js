// The index.js in the main directory acts as a client and runs the inquirer commands and sends api calls
const inquirer = require('inquirer');
const colors = require('colors');

const questions=[
    {
        
    }
]

function init(){
    inquirer.prompt(questions).then((data)=>{
        // write functions here
    })
}

init();



