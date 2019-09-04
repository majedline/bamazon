var inquirer = require('inquirer');
var DBAccess = require('./dbCon.js');
const breakLine = "\n******************************\n";

// establish connection and start the application giving it the handler
var db = new DBAccess();
db.start(appStartHandler);

function appStartHandler() {
    getAllItemsForSale();

}

function appEndHandler() {
    console.log("Good by!");
}

function generalPrompt() {

    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?\n',
            choices: [
                'Buy an item',
                'Search for an item',
                'exit',
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'Buy an item':
                    buyAnItemUI();
                    break;

                case 'Search for an item':
                    searchForAnItemUI();
                    break;

                case 'exit':
                    db.end(appEndHandler);
                    break;
            }
        });
}


function buyAnItemUI() {

    inquirer
        .prompt({
            name: 'IDSelected',
            type: 'input',
            message: 'Enter the ID of the product you would like to purchase\n',
        })
        .then(function (answer1) {
            inquirer
                .prompt({
                    name: 'quantitySelected',
                    type: 'input',
                    message: 'Enter the quantity you would like to purchase\n',
                }).then(function (answer2) {

                    // need to buy and item buyAnItemDBCall
                    buyAnItem(answer1.IDSelected, answer2.quantitySelected);

                });
        });
}

function searchForAnItemUI() {

    inquirer
        .prompt({
            name: 'partialName',
            type: 'input',
            message: 'Enter the product name you are looking for.\n',
        })
        .then(function (answer1) {
            searchForAnItem(answer1.partialName);
        });
}

function getAllItemsForSale() {
    var query = 'select item_id, product_name, department_name, price, stock_quantity from products;';
    db.theConnection.query(query, function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log('(ID:' + res[i].item_id + '): ' + res[i].product_name + ' is for sale at: $' + parseFloat(res[i].price));
        }
        console.log(breakLine);
        generalPrompt();
    });
}

function searchForAnItem(partialItemName) {
    var query = 'select item_id, product_name, department_name, price, stock_quantity from products where product_name like ' + db.mysql.escape("%" + partialItemName + "%") + ';';
    db.theConnection.query(query, function (err, res) {

        if (err) throw err;

        if (res.length == 0) {
            console.log("No results found");

        } else {
            for (var i = 0; i < res.length; i++) {
                console.log('(ID:' + res[i].item_id + '): ' + res[i].product_name + ' found. There are ' + res[i].stock_quantity + ' remaining and is for sale at: $' + parseFloat(res[i].price));
            }
        }

        console.log(breakLine);
        generalPrompt();
    });
}



function buyAnItem(id, quantityToBuy) {
    var query1 = "select item_id, product_name, department_name, price, stock_quantity from products where item_id=?;";
    var query2 = "UPDATE products SET stock_quantity = ? WHERE item_id = ?;";


    db.theConnection.query(query1, [id], function (err1, res1) {

        if (err1) throw err1;

        if (res1.length > 0) {
            var current_stock_quantity = res1[0].stock_quantity;
            var current_product_price = res1[0].price;
            var current_product_name = res1[0].product_name;

            if (current_stock_quantity < quantityToBuy) {
                console.log("Insufficient quantity!\n There are only " + current_stock_quantity + " remaining. Please select the quantity within that range.");
                console.log(breakLine);

            } else {
                db.theConnection.query(query2, [current_stock_quantity - quantityToBuy, id], function (err2, res2) {
                    if (err2) throw err2;

                    var totalDue = parseFloat(current_product_price) * quantityToBuy;
                    console.log("Thank you for purchasing " + quantityToBuy + " of " + current_product_name + ". The total due is: $" + totalDue);
                    console.log(breakLine);

                });
            }
        } else {
            console.log("There are no products with this ID");
        }

        getAllItemsForSale();
        console.log(breakLine);
    });

}
