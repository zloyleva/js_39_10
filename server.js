console.log("Run server...");

const express = require('express');
const api = express();

const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, "db/myshop.sqlite");

let db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB connection was created");
});


let data = {
    data: []
};


api.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
});


api.get('/',(req,res) => {
    console.log("detect req");
    return res.json({data:"Hello World"});
});

api.get('/users',(req,res) => {
    console.log("detect req");

    db.all("SELECT * FROM users", (err, row) => {
        if(err){
            console.error(err.message);
            data.error = err.message;
        }
        data.data = row;
    });
    return res.json({data:data});
});


api.get('/login',(req,res) => {
    console.log("detect req");
    // console.log(req.params);
    // console.log(req.query);
    const x = db.serialize(function () {
        db.run("SELECT * FROM users WHERE name = ? AND password = ?",[req.query.name, req.query.password]);
    });

    console.log(x);

    // db.get("SELECT * FROM users WHERE name = ? AND password = ?",[req.query.name, req.query.password], (err, user) => {
    //     if(err){
    //         console.error(err.message);
    //     }
    //
    //     if(!!user){
    //
    //         data.data.user = user;
    //         console.error("cond",data);
    //     }else {
    //         console.error("not user");
    //         data.data.error = "not user";
    //         console.error("cond",data);
    //     }
    //
    // });
    //
    // console.error("res",data);
    return res.json(data);
});


api.listen(9000);
