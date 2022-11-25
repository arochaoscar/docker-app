CREATE TABLE products (
    id INTEGER AUTO_INCREMENT,
    name varchar(255) NOT NULL, 
    price INTEGER NOT NULL,
    currency CHAR(3), 
    stock INTEGER,
    PRIMARY KEY (id) 
);

INSERT INTO products (name, price,currency,stock) VALUES 
('Product 1',10,'CLP',3),
('Product 2',20,'CLP',20),
('Product 3',22,'CLP',10),
('Product 4',17,'CLP',8),
('Product 5',18,'CLP',7),
('Product 6',3,'CLP',4),
('Product 7',5,'CLP',50);