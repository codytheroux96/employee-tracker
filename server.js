//listing out my dependencies and requires
const mysql = require("mysql2");
const inquirer = require("inquirer")
require("console.table");
//this is how i make my connection to sql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});
//saying that when the program connects to mysql it will either throw and error or go to my starting prompt for the user
db.connect(function (err) {
    if (err) throw err;
    starterPrompt();
});
//a function that will view all employees by selecting all the information from the employee table
const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) return console.error(err);
        //it will return the results into a table and then display the starter prompt again
        console.table(results);
        starterPrompt();
    });
};
//a function that will view all employees by selecting all the information from the role table
const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) return console.error(err);
        //it will return the results into a table and then display the starter prompt again
        console.table(results);
        starterPrompt();
    });
};
//a function that will view all employees by selecting all the information from the department table
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        //it will return the results into a table and then display the starter prompt again
        console.table(results);
        starterPrompt();
    });

};
//this is the function to add an employee
const addAnEmployee = () => {
    console.log("Let's add an employee!")
//selecting id, title, salary from role
    const query =
        `SELECT r.id, r.title, r.salary
            FROM role r`

    db.query(query, function (err, res) {
        if (err) throw err;
//mapping out the role choices and setting their values
        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));
        
      //tabling the results  
        console.table(res);
//will be a new function that will use rolechoices from above in it
        promptInsert(roleChoices);
    });
}
//these will be the questions for the user to add an employee
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
    ])
    //after the questions are answered it will table the results and insert the vaules into the employee table and then return to the starter prompt
        .then(function (answer) {
            console.table(answer);

            const query = `INSERT INTO employee SET ?`
            db.query(query,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.roleId,
                },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log("Done!")

                    starterPrompt();
                });

        });
}
//this will be the function to add a role
const addARole = () => {
    console.log("Let's add a role!")
// this const query is selecting all the information that will be effected by this changed
    const query =
        `SELECT d.id, d.name, r.salary 
          FROM employee e
          JOIN role r
          ON e.role_id = r.id
          JOIN department d
          ON d.id = r.department_id
          GROUP BY d.id, d.name`
// if the program crashes it will throw an error and if not it will map out our const departmentchoices with id and name and assign the values of id and name to them
    db.query(query, function (err, res) {
        if (err) throw err;
        const departmentChoices = res.map(({ id, name }) => ({
            value: id, name: `${id} ${name}`
        }));
//it will then table the results and start the add role prompts and will use the const department choices from above in it to pull in all the departments the user can choose from 
        console.table(res);

        promptAddRole(departmentChoices);
    });
}
//this will be the questions the user is asked to add a role
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
    //when the questions are answered it will take the values from above and insert them into the role table and then return to the starter prompt
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

//this will be the function to add a department. It will ask the user what the name of the department is and then put that answer with a value into the department table and then return to the starting prompt
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

}

//this will be the function to update an employee role. it will join information from all 3 tables that will be effected
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
//this will take information needed from the employee table to give a list of employees to choose from to update 
    db.query(query, function (err, res) {
        if (err) throw (err);
        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${first_name} ${last_name}`
        }));
//it will display the employee choices into a table for the user to see
        console.table(res);
//then the function rolearray will take in those employee choices to then grab values from title and salary from role
        roleArray(employeeChoices);
    });
}
//this will be the function that will develop role choices to assign the employee to
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
//this will be the questions asked to change the employee role, employee choices will generated from the function employee choices
//and role choices will be generated from the rolechoices function so when the user selects something it will actually change the employees values in those tables
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

//this will be the starting prompt that will ask the user what task they would like to perform and then pull in the corresponding functions according to what the user answers
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




