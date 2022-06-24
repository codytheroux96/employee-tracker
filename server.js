const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const { updateAnEmployeeRole } = require("./utils/update");
const { viewAllEmployees, viewAllRoles, viewAllDepartments} = require("./utils/view");
const { addAnEmployee, addARole, addADepartment} = require("./utils/add");

const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: '',
      database: "employeesDB",
},
console.log(`Connected to the employeesDB`));

db.connect(function(err){
    if (err) throw err;
    starterPrompt();
});
const starterPrompt = () => {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "Which task would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add An Employee",
            "Add A Role",
            "Add A Department",
            "Update An Employee Role",
            "Exit"
        ]
    })
    .then((answers) => {
        switch (answers.task){
            case "View All Employees": {
                viewAllEmployees();
                break;
            }
        }
        switch (answers.task){
            case "View All Roles": {
                viewAllRoles();
                break;
            }
        }
        switch (answers.task){
            case "View All Departments": {
                viewAllDepartments();
                break;
            }
        }
        switch (answers.task){
            case "Add An Employee": {
                addAnEmployee();
                break;
            }
        }
        switch (answers.task){
            case "Add A Role": {
                addARole();
                break;
            }
        }
        switch (answers.task){
            case "Add A Department": {
                addADepartment();
                break;
            }
        }
        switch (answers.task){
            case "Update An Employee Role": {
                updateAnEmployeeRole();
                break;
            }
        }
        switch (answers.task){
            case "Exit": {
                db.end();
                break;
            }
        }
    })
    // .then(data => {
    //     if (data.starterPrompt === "View All Employees") {return viewAllEmployees(); };
    //     if (data.starterPrompt === "View All Roles") {return viewAllRoles(); };
    //     if (data.starterPrompt === "View All Departments") {return viewAllDepartments(); };
    //     if (data.starterPrompt === "Add An Employee") {return addAnEmployee(); };
    //     if (data.starterPrompt === "Add A Role") {return addARole(); };
    //     if (data.starterPrompt === "Add A Department") {return addADepartment(); };
    //     if (data.starterPrompt === "Update An Employee Role") {return updateAnEmployeeRole(); };
    //     if (data.starterPrompt === "Exit") {db.end(); };

    // })

}






