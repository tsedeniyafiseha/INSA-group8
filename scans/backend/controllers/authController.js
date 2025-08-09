const db = require('../database/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }

    const checkQuery = `SELECT * FROM users WHERE username = ?`;
    db.get(checkQuery, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'database error' });
        }
        if (user) {
            return res.status(409).json({ msg: 'username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(insertQuery, [username, hashedPassword], function (err) {
            if (err) {
                return res.status(500).json({ msg: 'database error' });
            }
            return res.status(201).json({ msg: 'user registered successfully', userId: this.lastID });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide username and password' });
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'database error' });
        }
        if (!user) {
            return res.status(400).json({ msg: 'user not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'invalid password' });
        }

        return res.status(200).json({
            msg: 'login successfully',
            token: generateToken(user.id)
        });
    });
};

exports.profile = (req, res) => {
     return res.status(200).json({
        msg: 'this is protected profile route', 
        userId: req.user.id
    });
};


