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

    new Promise((resolve, reject) => {
			db.all("SELECT * FROM users", (err, row) => {
				if(err){
					console.error(err.message);
					data.error = err.message;
					reject("not user");
				}
				if(!!row){
					resolve(row);
				}else {
					reject();
				}
			});
    }).then((value) => {
			return res.json({
				data:value
			});
		})
			.catch((err) => {
				return res.json({
					data:null,
					error: err
				});
			});
});


api.get('/login',(req,res) => {
    console.log(">> detect Login request");

    new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE name = ? AND password = ?",[req.query.name, req.query.password], (err, users) => {
          if(err){
            console.error(err.message);
          }
          console.log(users);
          if(!!users){
            resolve(users);
          }else {
            reject("Login and password do not match");
          }
        });
    })
        .then((value) => {
          return res.json({
            data:{...value, password: null},
            isLogin: true
          });
        })
        .catch((err) => {
          return res.json({
            data:null,
            isLogin: false,
            error: err
          });
        });
});


api.listen(9000);
