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
        {name: 'Add role', value: addRole},
        {name: 'Add employee', value:`addEmployee`},
        {name: 'Update employees manager', value:`updateManager`},
        {name: 'Delete department', value:deleteDepartment},
        {name: 'Delete role', value:deleteRole},
        {name: 'Delete employee', value: deleteEmpoyee},
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

const roleAdd = [
  {
    type: 'input',
    message: 'Please enter the new role title',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Please enter the new role salary, Must be a number',
    name: 'salary',
    validate:  (salary) => {
      if (!isNaN(salary)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }
  },
  {
    type: 'input',
    message: 'Please enter the new role department id',
    name: 'department_id',
    validate:  (department_id) => {
      if (!isNaN(department_id)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }
  }
]

const departmentDelete = [
  {
    type: 'input',
    message: 'Please emter the id of the department to delete',
    name: 'id',
    validate:  (id) => {
      if (!isNaN(id)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }}
]

const roleDelete = [
  {
    type: 'input',
    message: 'Please emter the id of the role to delete',
    name: 'id',
    validate:  (id) => {
      if (!isNaN(id)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }}
]

const employeeDelete = [
  {
    type: 'input',
    message: 'Please emter the id of the employee to delete',
    name: 'id',
    validate:  (id) => {
      if (!isNaN(id)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }}
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
// Function to add a department
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


function addRole() {
  inquirer.prompt(roleAdd)
    .then((data) => {
      // Convert salary and department_id to numbers
      data.salary = parseFloat(data.salary);
      data.department_id = parseInt(data.department_id, 10);

      return fetch(`${apiCall}/api/roles`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    })
    .then(response => response.json())
    .then(data => {
      console.table(data);
      init(); // Re-prompt the main menu after handling the response
    })
    .catch(error => console.error('Error:', error));
}

function deleteDepartment(){
  inquirer.prompt(departmentDelete).then((data)=>
  fetch(`${apiCall}/api/departments/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
          console.table(data);
        init(); // Re-prompt the mainMenu after handling the response
      })
      .catch(error => console.error('Error:', error)));
    }

function deleteRole(){
  inquirer.prompt(roleDelete).then((data)=>
  fetch(`${apiCall}/api/roles/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
          console.table(data);
        init(); // Re-prompt the mainMenu after handling the response
      })
      .catch(error => console.error('Error:', error)));
    }

function deleteEmpoyee(){
  inquirer.prompt(employeeDelete).then((data)=>
  fetch(`${apiCall}/api/employees/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
          console.table(data);
        init(); // Re-prompt the mainMenu after handling the response
      })
      .catch(error => console.error('Error:', error)));
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