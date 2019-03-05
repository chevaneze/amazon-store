CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id integer not null ,
product_name varchar(30) null,
department_name varchar(30) null,
price varchar(30) null,
stock_quantity varchar(30) null,
);
insert into products (item_id,product_name, department_name, price, stock_quantity)
values (0038, mineral_foundation, cosmetics, 35, 23),
(0023, lipgloss, cosmetics, 8, 45), (0074, eyeshadow_pallet, 45,12 ),
(0044, nail_polish, cosmetics, 5, 19), (0509, blush, cosmetics,12,7),
(0304, sunglasses, accessories,15,5),(0700,bracelet,accessories,28,10),
(0102, hat, accessories,17,14),(0888, socks,accessories,5,11);

