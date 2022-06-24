const mysql = require("mysql2");
const inquirer = require("inquirer");
//const { updateAnEmployeeRole } = require("./utils/update");
//const { viewAllEmployees, viewAllRoles, viewAllDepartments} = require("./utils/view");
require("../server")
require("console.table");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});


const addAnEmployee = () => {

};

const addARole = () => {

};

const addADepartment = () => {

};

module.exports = { addAnEmployee, addARole, addADepartment };