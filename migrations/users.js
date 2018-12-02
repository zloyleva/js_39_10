const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, "db/myshop.sqlite");

let db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB connection was created");
});

// -----------------------

const users = [
    {name: "Oleh", email: "zloyleva@gmail.com", password: "123456", avatar: ""},
    {name: "John", email: "john@gmail.com", password: "123456", avatar: ""},
    {name: "Alena", email: "alena@gmail.com", password: "123456", avatar: ""},
    {name: "Ivan", email: "ivan@gmail.com", password: "123456", avatar: ""},
    {name: "Lesya", email: "lesya@gmail.com", password: "123456", avatar: ""},
];

db.serialize(function () {
   db.run("DROP TABLE IF EXISTS users");
   db.run("CREATE TABLE users ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [name] varchar NOT NULL, [email] varchar NOT NULL, [password] varchar NOT NULL, [avatar] varchar)");

   users.map((el) => db.run("INSERT INTO users(name,email,password,avatar) VALUES(?,?,?,?)", [el.name, el.email, el.password, el.avatar]))

});

// -----------------------

db.close((err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB connection was disabled");
});