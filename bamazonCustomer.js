var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Csspn223",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function shopOption() {
    connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
                inquirer
                    .prompt([{
                            name: "option",
                            type: "rawlist",
                            choices: function () {
                                var optionArray = [];
                                for (var i = 0; i < results.length; i++) {
                                    optionArray.push(results[i].item_name);
                                }
                                return optionArray;
                            },
                            message: "Enter product ID number to complete a purchase"
                        },
                        {
                            name: "selection",
                            type: "input",
                            message: "Enter Id #"
                        },
                        {
                            name: "amount",
                            type: "input",
                            message: "how much would you like?"
                        }

                    ]).then(function (buy) {
                            var userBuy;
                            for (var i = 0; i < results.length; i++) {
                                if (results[i].item_id === buy.choice) {
                                    userBuy = results[i];
                                    currentQuantity = results[i].stock_quantity;
                                    currentPrice = results[i].price
                                }
                            }
                            if (answer.amount > currentQuantity) {
                                console.log("Insufficient Merchendise");
                            } else(
                                console.log("your total is:" + currentPrice * answer.amount)
                            )
                            connection.query(

                                "UPDATE products SET quantity=quantity - 1 WHERE id = id",
                                [{
                                        quantity: answer.amount
                                    },
                                    {
                                        id: chosenItem.Id
                                    }
                                ],
                                console.log(chosenItemQuantity - answer.amount + " Left In Stock")
                            );
                        }); 
                    }); 
                }
               
            // Running this application will first display all of the items available
            // for sale.Include the ids, names, and prices of products
            // for sale.

            // 6. The app should then prompt users with two messages.

            // *The first should ask them the ID of the product they would like to buy.*The second message should ask how many units of the product they would like to buy.

            // 7. Once the customer has placed the order, your application should check
            // if your store has enough of the product to meet the customer 's request.

            // *
            // If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

            // 8. However,
            // if your store _does_ have enough of the product, you should fulfill the customer 's order. *
            // This means updating the SQL database to reflect the remaining quantity.*On *
            // O - 0n + ce the update goes through, show the customer the total cost of their purchase.