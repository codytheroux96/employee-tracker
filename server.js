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
    console.log("Let's add an employee!")

    const query =
        `SELECT r.id, r.title, r.salary 
            FROM role r`

    db.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res);

        promptInsert(roleChoices);
    });
}

const promptInsert = (roleChoices) => {
    inquirer.prompt([
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
            type: "list",
            name: "managerID",
            message: "What is the employee's manager_id?",
            choices: ["3", "6", "9", "10"],
        }
    ])
        .then(function (answer) {
            console.table(answer);

            const query = `INSERT INTO employee SET ?`
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
                    console.log("Done!")

                    starterPrompt();
                });

        });
}

const addARole = () => {
    console.log("Let's add a role!")

    const query =
        `SELECT d.id, d.name, r.salary AS budget
          FROM employee e
          JOIN role r
          ON e.role_id = r.id
          JOIN department d
          ON d.id = r.department_id
          GROUP BY d.id, d.name`

    db.query(query, function (err, res) {
        if (err) throw err;
        const departmentChoices = res.map(({ id, name }) => ({
            value: id, name: `${id} ${name}`
        }));

        console.table(res);

        promptAddRole(departmentChoices);
    });
}

const promptAddRole = (departmentChoices) => {

    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "departmentId",
            message: "What department does this role belong to?",
            choices: departmentChoices
        },
    ])
        .then(function (answer) {

            const query = `INSERT INTO role SET ?`

            db.query(query, {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.departmentId
            },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log("Done!")

                    starterPrompt();
                });

        });
}


const addADepartment = () => {
    console.log("Let's add a department!")

    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?"
        },
    ])
        .then(function (answer) {
            const query = `INSERT INTO department SET ?`

            db.query(query, {
                name: answer.departmentName
            },
                function (err, res) {
                    if (err) throw (err);

                    console.table(res)
                    console.log("Done!")

                    starterPrompt();
                }
            )
        })

};


const updateAnEmployeeRole = () => {
    console.log("Let's update an employee's role!")

    const query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS DEPARTMENT, r.salary FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

    db.query(query, function (err, res) {
        if (err) throw (err);
        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${first_name} ${last_name}`
        }));

        console.table(res);

        roleArray(employeeChoices);
    });
}

const roleArray = (employeeChoices) => {
    const query =
        `SELECT r.id, r.title, r.salary 
    FROM role r`

    db.query(query, function (err, res) {
        if (err) throw (err);

        roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res)

        employeeRolePrompt(employeeChoices, roleChoices);
    }
    )
}

const employeeRolePrompt = (employeeChoices, roleChoices) => {

    inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role would you like to change?",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "roleId",
            message: "What is the new role you want to give this employee?",
            choices: roleChoices
        },
    ])
        .then(function (answer) {

            const query = `UPDATE employee SET role_id = ? WHERE id = ?`

            db.query(query,
                [answer.roleId, answer.employeeId],
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log("Done!");

                    starterPrompt();
                });
        });
}


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




