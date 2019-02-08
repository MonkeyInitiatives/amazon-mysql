// Main landing page
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
        choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (inquirerResponse) {
        switch (inquirerResponse.itemChoice) {
            case "View Product Sales by Department":
                viewByDepartment();
                break;
            case "Create New Department":
                createNewDepartment();
                break;
            default:
                break;
        }
    });
}

function viewByDepartment(){

    // SELECT department_name, SUM(over_head_costs) AS value_sum FROM wp_play_commentmeta GROUP BY department_id;

    // SELECT department_id,department_name, over_head_costs,SUM(products.product_sales) FROM departments GROUP BY department_id;

    //SELECT department_id, department_name, over_head_costs, (SELECT SUM(product_sales) FROM products WHERE products.department_name = departments.department_name) As total FROM departments

    connection.query("SELECT department_id, department_name, over_head_costs, (SELECT SUM(product_sales) FROM products WHERE products.department_name = departments.department_name) AS product_sales FROM departments", function(err, res) {
        if (err) throw err;

        console.log("");
        var all_departments = [];

        for(key in res){            
            var theobject = {
                department_id: res[key].department_id,
                department_name: res[key].department_name,
                over_head_costs: res[key].over_head_costs,
                product_sales: res[key].product_sales, 
                total_profit: (res[key].product_sales-res[key].over_head_costs)
            };
            all_departments.push(theobject);
        }
        console.table(all_departments);
        menuOptions();
    });
}