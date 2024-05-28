// The index.js in the main directory acts as a client and runs the inquirer commands and sends api calls
const inquirer = require('inquirer');
const colors = require('colors');
const apiCall = 'http://localhost:3001'
function quit(){
    process.exit();
}

const mainMenu = [
    {
        type: 'list',
        message: 'Please slect an option',
        name:'menu',
        choices:[        
        {name: 'View all departments', value: viewDepartments},
        {name: 'view all roles', value: viewRoles},
        {name: 'View all employees', value: viewEmployees},
        {name: 'Add Department', value: addDepartment},
        {name: 'Add role', value:`addRole`},
        {name: 'Add employee', value:`addEmployee`},
        {name: 'Update employees manager', value:`updateManager`},
        {name: 'Delete department', value:`deleteDepatment`},
        {name: 'Delete role', value:`deleteRole`},
        {name: 'Delete employee', value:`deleteEmpoyee`},
        {name: 'Quit', value: quit},
        ]
    }
]

const departmentAdd = [
  {
    type: 'input',
    message: 'Please enter the new department name',
    name: 'department_name'
  }
]



function viewDepartments(){
  fetch(`${apiCall}/api/departments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
          console.table(data);
        init(); // Re-prompt the mainMenu after handling the response
      })
      .catch(error => console.error('Error:', error));
}

function viewRoles(){
  fetch(`${apiCall}/api/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.table(data);
      init(); // Re-prompt the mainMenu after handling the response
    })
    .catch(error => console.error('Error:', error));
  }

function viewEmployees(){
fetch(`${apiCall}/api/employees`, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
  }).then(response => response.json())
  .then(data => {
      console.table(data);
    init(); // Re-prompt the mainMenu after handling the response
  })
  .catch(error => console.error('Error:', error));
}

function addDepartment(){
  inquirer.prompt(departmentAdd).then((data)=>
  fetch(`${apiCall}/api/departments`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  ).then(response => response.json())
  .then(data => {
      console.table(data);
    init(); // Re-prompt the mainMenu after handling the response
  })
  .catch(error => console.error('Error:', error));
}

function addRole(){
  inquirer.prompt().then((data)=>)
}

// change name later
function init(){
    inquirer.prompt(mainMenu).then((data)=>{
        // this then runs the function selected
        data.menu()
    })
}

init();



module.exports = init