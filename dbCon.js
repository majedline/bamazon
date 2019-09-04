require("dotenv").config();
var mysql = require('mysql');
var keys = require("./keys.js");


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: keys.mysqlaccess.username,
    password: keys.mysqlaccess.password,
    database: 'bamazon',
});



function DBAccess() {

    this.theConnection = connection;
    this.mysql = mysql;

    this.start = function (appStartHandler) {

        console.log("\n\n**bamazon connection started**\n\n");

        connection.connect(function (err) {
            if (err) throw err;
            appStartHandler();
        });
    }

    this.end = function (appEndHandler) {
        connection.end();
        appEndHandler();
        console.log("\n\n**bamazon connectione ended**\n\n");

    }
}

module.exports = DBAccess;