var express = require("express");
var app = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require("mysql");
var database_info = {
    host     : 'db4free.net',
    port     :  3306,
    user     : 'da_think',
    password : '12345678',
    database : 'thickinc_gang',
};

app.post("/getprofile", (req, res) => {

    var connection = mysql.createConnection(database_info);

    var decoded = jwt.verify(req.body.token, 'secret');
    const id = decoded.userID;
    const userType = decoded.accountType;
    // EDIT: in case userType change, use condition to select table to be queried
    var sqlcommand =`select * from ${userType} where id = ${id};`;

    connection.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send({ user_data: rows});
    });

    connection.end();
});




 /*{
      ...
      data : {
         userID
         customer_username
         customer_email
         customer_password
         customer_birthday
      }
      data required when customer press save button to update their profile
  }*/

app.post("/updatecustomerprofile", (req, res) => {
    const customer_username = req.body.customer_username;
    const id = req.session.userID;
    const customer_email = req.body.customer_email;
    const customer_password = req.body.customer_password;
    const customer_birthday = req.body.customer_birthday;
    var connection = mysql.createConnection(database_info);

    var sqlcommand = `update customer set customer_username=${customer_username}, 
    customer_email=${customer_email}, customer_password=${customer_password}, 
    customer_birthday=${customer_birthday} where customer_id = ${id};`;

    connection.query(sqlcommand, (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.send({ success : true});
    });
    connection.end();
});



module.exports = app;