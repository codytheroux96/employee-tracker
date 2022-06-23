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

//need starter prompt here




