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
        {name: 'Add employee', value: addEmployee},
        {name: 'Update employees manager', value: updateManager},
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

const employeeAdd = [
  {
    type: 'input',
    message: 'Please enter the new employee first name',
    name: 'first_name'
  },
  {
    type: 'input',
    message: 'Please enter the new employee last name',
    name: 'last_name'
  },
  {
    type: 'input',
    message: 'Please enter the new role id for the employee',
    name: 'role_id',
    validate:  (role_id) => {
      if (!isNaN(role_id)){
        return true;
      } else{
        return 'You must enter a number only'
      }
    }
  },
  {
    type: 'input',
    message: 'Please enter the new manager id for the employee or leave blank if no manager',
    name: 'manager_id',
    filter: (input) => input.trim() === '' ? null : input,
    validate:  (manager_id) => {
      if (!isNaN(manager_id)){
        return true;
      } else if(manager_id === null){
        return true
      }else{
        return 'You must enter a number or leave blanck'
      }
    }
  }
]

const managerUpdate = [
  {
    type: 'input',
    message: 'Please enter the id of the employee you want to update',
    name: 'id',
    validate: (id) => {
      if (!isNaN(id)) {
        return true;
      } else {
        return 'You must enter a number only';
      }
    },
    filter: (input) => parseInt(input, 10) // Ensure ID is an integer
  },
  {
    type: 'input',
    message: 'Please enter the new manager id or leave blank',
    name: 'manager_id',
    filter: (input) => input.trim() === '' ? null : parseInt(input, 10),
    validate: (manager_id) => {
      if (manager_id === null || !isNaN(manager_id)) {
        return true;
      } else {
        return 'You must enter a number or leave blank';
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

function addEmployee() {
  inquirer.prompt(employeeAdd)
    .then((data) => {
      // Convert salary and department_id to numbers
      data.role_id = parseFloat(data.role_id);
      if (data.manager_id !== null){
        data.manager_id = parseInt(data.manager_id, 10);
      };
      return fetch(`${apiCall}/api/employees`, {
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

function updateManager() {
  inquirer.prompt(managerUpdate)
    .then((data) => {
      return fetch(`${apiCall}/api/employees/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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