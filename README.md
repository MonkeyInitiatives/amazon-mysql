# amazon-mysql

### Overview

This program is a CLI application that simulates an Amazon experience from the viewpoint of a customer, manager, and supervisor. It uses inquirer, mysql, and console.table as well as a starting store.sql file to initially populate the products and departments. 

## Supervisor

The supervisor is the overhead of the entire application. The supervisor seems a list of all departments, the department names, and a tally of the over head costs, the product sales, and the total profits by department. This is done in a single mysql search query that inner joins the two tables 'products' and 'departments', and uses summation to calculate the various totals. The supervisor may also create a new department via the menu by giving it a new department name and its starting over head costs. Everything is done via menus using inquirer.

## Manager

The manager looks at the day to day operations of the program. They can view the entire inventory, seperated by product name, price, and quantity. They can view only the low inventory stock (less than or equal to 5), add to existing inventory, or add a new product themselves by entering a new product name, price, and quanity that will then be automatically added to the product mysql table. Like the supervisor, this is all done via menus using inquirer.

## Customer

A customer is presented with the inventory and is given the opprorunity to buy a product. The user enters in the item id and the number of units they wish to purchase. If there is enough stock to fulfill the order, the mysql database is updated to subtract the number of purchased items, and displays a bill to the customer that is a simple summation of the numbers of items purchased multiplied by the price of the item. 

### Notes

Because this is a CLI application, the user must 'npm install' to install the required dependencies in the package.json file, which are inquirer, mysql, and console.table. 