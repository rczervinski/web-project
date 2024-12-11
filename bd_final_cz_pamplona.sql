DROP DATABASE IF EXISTS web_final_project;
CREATE DATABASE web_final_project;
USE web_final_project;

CREATE TABLE product (
	id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(9, 2) NOT NULL
);

CREATE TABLE cart (
	product_id INT NOT NULL UNIQUE PRIMARY KEY,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO product VALUES 
(1, 'Iphone 15 Plus', 6569),
(2, 'Iphone 14', 4498),
(3, 'Iphone 13', 3999),
(4, 'Samsung Galaxy M62', 3199),
(5, 'Samsung Galaxy S23', 5999),
(6, 'Samsung Galaxy A54', 2400),
(7, 'Redmi Note 12', 1499),
(8, 'Moto G10', 949);