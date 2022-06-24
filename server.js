const mysql = require("mysql2");
const inquirer = require("inquirer")
require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});

db.connect(function (err) {
    if (err) throw err;
    starterPrompt();
});

const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        starterPrompt();
    });
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        starterPrompt();
    });
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        starterPrompt();
    });
};

const addAnEmployee = () => {
    console.log("Inserting an employee!")

    const query =
        `SELECT r.id, r.title, r.salary 
            FROM role r`

    db.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res);
        console.log("RoleToInsert!");

        promptInsert(roleChoices);
    });
}

const promptInsert = (roleChoices) => {
    inquirer .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            },
            {
              type: "input",
              name: "managerID",
              message: "What is the employee's manager_id?",
            }
        ])
        .then(function (answer) {
            console.table(answer);

            var query = `INSERT INTO employee SET ?`
            db.query(query,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);

                    starterPrompt();
                });

        });
}

const addARole = () => {

};

const addADepartment = () => {

};


const updateAnEmployeeRole = () => {

};


const starterPrompt = () => {
    inquirer.prompt({
        type: "list",
        name: "query",
        message: "Which task would you like to perform?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add An Employee",
            "Add A Role",
            "Add A Department",
            "Update An Employee Role",
            "Exit",
        ]
    })
        .then(data => {
            if (data.query === "View All Employees") { viewAllEmployees(); };
            if (data.query === "View All Roles") { viewAllRoles(); };
            if (data.query === "View All Departments") { viewAllDepartments(); };
            if (data.query === "Add An Employee") { return addAnEmployee(); };
            if (data.query === "Add A Role") { addARole(); };
            if (data.query === "Add A Department") { addADepartment(); };
            if (data.query === "Update An Employee Role") { updateAnEmployeeRole(); };
            if (data.query === "Exit") { db.end(); };

        })

};



