const db = require('../database/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const validator = require('validator');
const {validateUsername, validateEmail, validatePassword} = require('../utils/validators');


exports.register = (req, res) => {
    let { username, email, password } = req.body;

    username = validator.escape(username);
    email = validator.normalizeEmail(email);

    const usernameValidation = validateUsername(username);
    if(usernameValidation !== true){
        return res.status(400).json({msg: usernameValidation});
    }

    const emailValidation = validateEmail(email);
    if(emailValidation !== true){
        return res.status(400).json({msg: emailValidation});
    }

    const passwordValidation = validatePassword(password);
    if(passwordValidation !== true){
        return res.status(400).json({msg: passwordValidation});
    }

    const checkQuery = `SELECT * FROM users WHERE username = ? or email = ?`;
    db.get(checkQuery, [username, email], async (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'database error' });
        }
        if (user) {
            if(user.username === username){
                return res.status(409).json({ msg: 'username already exists' });
            }
            if(user.email === email){
                return res.status(409).json({ msg: 'email already exists' });
            }
            
        }
            try{
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertQuery = `INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)`;
                const createdAt = new Date().toISOString();
                db.run(insertQuery, [username, email, hashedPassword, createdAt], function (err) {
                    if (err) {
                         return res.status(500).json({ msg: 'database error' });
                    }
                    return res.status(201).json({ msg: 'user registered successfully', userId: this.lastID });
                })
            }catch(hashErr) {
                     return res.status(500).json({ msg: 'password hashing failed' });
            }
        });
};

exports.login = (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ msg: 'Please provide username/email and password' });
    }

    if(validateEmail(identifier) !== true && validateUsername(identifier) !== true){
        return res.status(400).json({msg: 'invalid email or username format'});
    }

    const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    db.get(query, [identifier, identifier], async (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'database error' });
        }
        if (!user) {
            return res.status(400).json({ msg: 'Invalid login credentials' });
        }

        let isMatch = false;
        try{
            isMatch = await bcrypt.compare(password, user.password);
        }catch(bcryptErr){
            return res.status(500).json({ msg: 'Password verification failed' });
        }
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid login credentials' });
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



