const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");

const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: '',
      database: "employeesDB",
});

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
    .then(data => {
        if (data.starterPrompt === "View All Employees") {return viewAllEmployees(); };
        if (data.starterPrompt === "View All Roles") {return viewAllRoles(); };
        if (data.starterPrompt === "View All Departments") {return viewAllDepartments(); };
        if (data.starterPrompt === "Add An Employee") {return addAnEmployee(); };
        if (data.starterPrompt === "Add A Role") {return addARole(); };
        if (data.starterPrompt === "Add A Department") {return addADepartment(); };
        if (data.starterPrompt === "Update An Employee Role") {return updateAnEmployeeRole(); };
        if (data.starterPrompt === "Exit") {db.end(); };

    })

}

//need starter prompt here




