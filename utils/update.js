const inquirer = require("inquirer");
const { viewAllEmployees, viewAllRoles, viewAllDepartments} = require("./utils/view");
const { addAnEmployee, addARole, addADepartment} = require("./utils/add");
require("../server")
require("console.table");


const updateAnEmployeeRole = () => {

};

module.exports = { updateAnEmployeeRole };