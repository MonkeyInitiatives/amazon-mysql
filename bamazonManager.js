// Main landing page
const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourPassword",
    database: "bamazon"
});

// Welcome the user to start the application.

connection.connect(function(err) {
    if (err) throw err;
    menuOptions();
});

function menuOptions(){
    inquirer.prompt([
        {
        type: "list",
        name: "itemChoice",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products", "Exit"]
        }
    ]).then(function (inquirerResponse) {
        switch (inquirerResponse.itemChoice) {
            case "View Products for Sale":
                listProducts();
                break;
            case "View Low Inventory":
                listLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Products":
                addNewProduct();
                break;
            case "Exit":
                connection.end();
                process.exit();
                break;
            default:
                break;
        }
    });
}

function listProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(key in res){
            console.log("ID: "+res[key].id+" Product: "+res[key].product_name+" Price: "+res[key].price +" Quantity: "+res[key].stock_quantity);
        }
        console.log("\n");
        menuOptions();
    });
}

function listLowInventory(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(key in res){
            if(res[key].stock_quantity<=5){
                console.log("ID: "+res[key].id+" Product: "+res[key].product_name+" Price: "+res[key].price +" Quantity: "+res[key].stock_quantity);
            }
        }
        console.log("\n");
        menuOptions();
    });
}

function addToInventory(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(key in res){
            console.log("ID: "+res[key].id+" Product: "+res[key].product_name+" Price: "+res[key].price +" Quantity: "+res[key].stock_quantity);
        }
        console.log("\n");
        inquirer.prompt([
            {
                type: "input",
                message: "What is the item ID of the product you wish to change?",
                name: "id"
            },
            {
                type: "input",
                message: "How many units would you like to add?",
                name: "units"
            }
            ])
            .then(function(inquirerResponse) {
                updateInventory(parseInt(inquirerResponse.id), parseInt(inquirerResponse.units));
            });
    });
}

function updateInventory(id, units){
    var searchQuery = "UPDATE products SET stock_quantity = stock_quantity + "+units+" WHERE ?";
    var query = connection.query(
        searchQuery,
        [
            {
            id: id
            }
        ],
        function(err, res) {
            console.log(res.affectedRows + " item updated!\n");
            menuOptions();
        }
        );
}

function addNewProduct(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new product?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the department for the new product?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of the new product?",
            name: "price"
        },
        {
            type: "input",
            message: "How many units would you like to add?",
            name: "units"
        }
        ])
        .then(function(inquirerResponse) {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: inquirerResponse.name,
                  department_name: inquirerResponse.department,
                  price: inquirerResponse.price,
                  stock_quantity: inquirerResponse.units,
                  product_sales: 0
                },
                function(err, res) {
                  console.log(res.affectedRows + " product added!\n");
                  menuOptions();
                }
            )
        });
}