const inquirer = require("inquirer");
const { updateAnEmployeeRole } = require("./utils/update");
const { addAnEmployee, addARole, addADepartment} = require("./utils/add");
require("../server")
require("console.table");


const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        return starterPrompt();
      });
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        return starterPrompt();
      });
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        return starterPrompt();
      });
};

module.exports = { viewAllEmployees, viewAllRoles, viewAllDepartments};