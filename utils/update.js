const mysql = require("mysql2");
const inquirer = require("inquirer");
//const { viewAllEmployees, viewAllRoles, viewAllDepartments} = require("./utils/view");
//const { addAnEmployee, addARole, addADepartment} = require("./utils/add");
require("../server")
require("console.table");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});


const updateAnEmployeeRole = () => {

};

module.exports = { updateAnEmployeeRole };