const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection({
      host: "localhost",
      port: 3001,
      user: "root",
      password: '',
      database: "employeesDB",
});

db.connect(function(err){
    if (err) throw err;
    starterPrompt();
});

//need starter prompt here




