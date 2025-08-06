const sqlite3 = require('sqlite3').verbose();

const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
    if(err){
        return console.err('error connecting databse: ', err.message)
    }
    console.log('database connected successfully');
});

db.run (`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT 
    ) 
`);

module.exports = db;