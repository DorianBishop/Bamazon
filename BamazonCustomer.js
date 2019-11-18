// Bamazon Setup
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2');


var connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'bamazon_db'
});

connection.connect((err) => {   if (err) throw err;
    console.log('Connection successful');

    // Will display all items from  the database , when mysql has been established. 