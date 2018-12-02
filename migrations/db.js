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

//CREATE TABLE products ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [name] varchar(255) NOT NULL, [description] text)

//INSERT INTO products(name,description,image,price)
// VALUES('Product #2','Description Product #2','/Product.jpg',150.21)

db.all("SELECT * FROM products", (err, row) => {
    if(err){
        console.error(err.message);
    }
    console.log(row);
});

// -----------------------

db.close((err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB connection was disabled");
});