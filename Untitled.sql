DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INT(255) NOT NULL,
    stock_quantity INT(255) NOT NULL,
    product_sales INT(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT(255) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) 
VALUES
    ("Autographed Guitar", "Music", 750, 10, 4000),
    ("Ringo's Drumkit", "Music", 18000, 5, 1000),
    ("Candy Machine", "Food", 20, 50, 1500),
    ("Babe Ruth Bubblegum", "Food", 40000, 1, 1000),
    ("iPhone 3G signed by Steve Jobs", "Phones", 799, 3, 3000),
    ("Windows Phone Signed by Bill Gates", "Phones", 10, 99, 1000),
    ("Original 1960 Easy Bake Oven", "Toys", 39, 20, 2500),
    ("Transformers", "Toys", 100000, 1, 1500);
    
INSERT INTO departments (department_name, over_head_costs)
VALUES
	("Music", 2000),
    ("Food", 8000),
    ("Phones", 1000),
    ("Toys", 3500);