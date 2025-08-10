const sqlite3 = require('sqlite3').verbose();

const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
    if(err){
        return console.err('error connecting databse: ', err.message)
    }
    console.log('database connected successfully');
});


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT 
        )
    `, (err) => {
        if (err) console.error('Error creating users table:', err.message);
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            date DATE,
            start_time TEXT,
            end_time TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating schedule table:', err.message);
    });
});

module.exports = db;