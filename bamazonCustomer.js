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
    storeOpening();
});

// Function for the secondary main page (post, bid, or quit).
function storeOpening() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(key in res){
            console.log("ID: "+res[key].id+" Product: "+res[key].product_name+" Price: "+res[key].price);
        }
        storeOptions();
    });
  }
  

function storeOptions(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the item ID of the product you want to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "units"
        }
        ])
        .then(function(inquirerResponse) {
            stockChecker(parseInt(inquirerResponse.id), parseInt(inquirerResponse.units));
        });
}

function stockChecker(id, units){
    var currentStock = 0;
    var currentPrice = 0;
    connection.query("SELECT * FROM products WHERE id=?", id, function(err, res) {
        if (err) throw err;
        currentStock = parseInt(res[0].stock_quantity);
        currentPrice = parseInt(res[0].price);
        if(parseInt(units)>currentStock){
            console.log("Insufficient quantity!");
            storeOpening();
        }
        else{
            console.log("Thank you for your order. You spent "+(currentPrice*units) + " dollars.");
            var updated_product_sales = res[0].product_sales+(currentPrice*units);
            updateStock(id, currentStock-units, updated_product_sales);
        }
    });
}

function updateStock(id, units, sales){
    var query = connection.query(
    "UPDATE products SET ?, ? WHERE ?",
    [
        {
        stock_quantity: units
        },
        {
        product_sales: sales
        },
        {
        id: id
        }
    ],
    function(err, res) {
        connection.end();
    }
    );
        
        
}

function removeStock(id){
    connection.query(
        "DELETE FROM products WHERE ?",
        {
          id: id
        },
        function(err, res) {
          console.log("That was the last one!")
        }
      );
}