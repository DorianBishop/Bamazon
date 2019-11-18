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
    displayItems();
});

// Global Variables.
var chosenItem = {};

// Function to reset the chosen item array.

var resetCart = function() {
    chosenItem = {};
}

// function to display all items for sale
var displayItems = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        var listTable = new Table({
            head: ['item_id', 'product_name', 'price'],
            colWidths: [10, 45, 12]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].item_id, res[i].product_name, `${res[i].price}`]);
           
        }
        
        console.log(`\n\n${listTable.toString()}\n\n`);
        // ask user to enter id of item they wish to purchase.
        askForID();
    });
};
// function to prompt user to enter id of the product to purchase.
var askForID = function() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'Enter the id of the item you would like to purchase:'