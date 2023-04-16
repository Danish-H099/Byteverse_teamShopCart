var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"hackathon"
});

module.exports = con;