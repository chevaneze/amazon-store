var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    shopOption()
});

function shopOption() {
    connection.query("SELECT * FROM products", function (err, results) {
      console.table(results);
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "option",
                    type: "rawlist",
                    choices: function () {
                        var optionArray = [];
                        for (var i = 0; i < results.length; i++) {
                            optionArray.push(results[i].product_name);
                        }
                        return optionArray;
                    },
                    message: "Select a product to complete a purchase"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "how much would you like?"
                },

            ]).then(function (buy) {
                var userBuy;
                var currentQuantity;
                var currentPrice;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === buy.option) {
                        userBuy = results[i];
                        currentQuantity = results[i].stock_quantity;
                        currentPrice = results[i].price
                    }
                }
            
                if (buy.amount > currentQuantity) {
                    console.log("Insufficient Merchendise");
                } else {

                    console.log("your total is:  $" + (currentPrice * parseInt(buy.amount)).toFixed(2) )
                }
                connection.query(

                    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                    [
                        parseInt(buy.amount),
                        userBuy.item_id
                    ],
                    function (err, res) {
                        console.log(currentQuantity - parseInt(buy.amount) + " Left In Stock")
                        connection.end();
                    }
                );
            });
    });
    
}