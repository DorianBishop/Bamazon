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

// function to prompt user to enter id of the product to purchase
var askForID = function() {
    inquirer.prompt({
        name: 'item_id',
        type: 'input',
        message: 'Enter the id of the item you would like to purchase:',
        // validate input is number from 1-8
        validate: (value) => {
            if (!isNaN(value) && (value > 0 && value <= 8)) {
                return true;
            } else {
                console.log(' => Please enter a number from 1-8');
                return false;
            }
        }
        // select all rows where ID = user's input
    }).then((answer) => {
        connection.query('SELECT item_id, product_name, price, stock_quantity, product_sales FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
            // confirm with user that this is the product they'd like to purchase
            confirmItem(res[0].product_name, res);
        });
    });
};