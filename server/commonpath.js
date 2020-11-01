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
// token 
// { userID: userID, accountType: 'user', authenticated: true}

// [{
//     menu_id
//     menu_name
//     menu_description
//     menu_price
//     menu_shop_id_fk
// }]
app.get("/get_menu", (req, res) => {

    var con = mysql.createConnection(database_info);
    var sql = 'SELECT * FROM MENU;';
    console.log('got req');
    con.query(sql, (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        var string = JSON.stringify(rows);
        var json =  JSON.parse(string);
        res.send({ all_menu: json});
    });
    con.end();
});


// *** This adds a new user to the database. ***
// "1 record inserted" will be printed for confirmation.
// 'Oh no! User already existed' will be printed if the username already exists.

//=============================================================================
// *** READ ME !!! !***
// paste 2 lines below to use (The first at the top, the second uses the function)

// var addUser = require('./adduser2')
// addUser(name,pass,email,d,m,y)

// ***DAY AND MONTH MUST HAVE TWO LETTERS (01,02,03,...)***
// ***EVERYTHING IN addUser MUST BE IN STRING***
//=============================================================================


// name,pass,email,d,m,y
app.post("/register", (req, res) =>{
    console.log(req.body);
    var name = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;
    var date = req.body.date;

    var con = mysql.createConnection(database_info);

    con.query(`SELECT * FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${name}'`, function (err, result) {
        if (err) throw err;
        // User doesn't already exist
        if (result.length === 0){
        var sql = `INSERT INTO CUSTOMER (CUSTOMER_ID,CUSTOMER_USERNAME,CUSTOMER_PASSWORD,
            CUSTOMER_EMAIL,CUSTOMER_BIRTHDAY) VALUES (DEFAULT,'${name}','${pass}','${email}','${date}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(`1 record inserted (${name})`);
            var userID = result.insertId;
            var token = jwt.sign({ userID: userID, accountType: 'customer', authenticated: true}, 'secret');
            res.send({token: token});
        });
        }
        else{
            res.status(423).send({err: `The username "${name}" is already in use. Please try again.`});
        }
    });
});





app.post("/login", (req, res) => {

    var username = req.body.username;
    var password = req.body.password;
    var connection = mysql.createConnection(database_info);

    var sql1 = `select customer_id from CUSTOMER where customer_username = '${username}' and customer_password = '${password}'`  ;
    var sql2 = `select shop_id from SHOP where shop_username = '${username}' and shop_password = '${password}'`  ;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql2, (err, rows) => {
        if(err) throw err;
        if(rows.length!=0){
            var string=JSON.stringify(rows);
            var json =  JSON.parse(string);
            var userID = json[0].customer_id;
            var token = jwt.sign({ userID: userID, accountType: 'shop', authenticated: true}, 'secret');
            res.send({token: token});
        }

        else{
            connection.query(sql1, (err, rows) => {
                if(err) throw err;
                if(rows.length!=0){
                var string=JSON.stringify(rows);
                var json =  JSON.parse(string);
                var userID = json[0].shop_id;
                var token = jwt.sign({ userID: userID, accountType: 'customer', authenticated: true}, 'secret');
                res.send({token: token});
                }
                else {res.status(423).send({err: `no data in DB`});}
            });

        };
            
    });
    connection.end();
});

module.exports = app;
