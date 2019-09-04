-- DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE  bamazon;

USE  bamazon;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL,
  stock_quantity INTEGER,

  PRIMARY KEY (item_id)
);

