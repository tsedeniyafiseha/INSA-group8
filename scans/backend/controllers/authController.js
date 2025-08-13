const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken, generateEmailVerificationToken,  generateResetToken} = require('../utils/generateToken');
const validator = require('validator');
const {validateUsername, validateEmail, validatePassword} = require('../utils/validators');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
    let { username, email, password } = req.body;

    username = validator.escape(username);
    email = validator.normalizeEmail(email);

    // Validate fields
    const usernameValidation = validateUsername(username);
    if (usernameValidation !== true) {
        return res.status(400).json({ msg: usernameValidation });
    }

    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
        return res.status(400).json({ msg: emailValidation });
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
        return res.status(400).json({ msg: passwordValidation });
    }

    try {
        const existingUser = await new Promise((resolve, reject) => {
            checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
            db.get(checkQuery, [username, email], (err, row) => 
                (err ? reject(err) : resolve(row))
            );
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(409).json({ msg: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(409).json({ msg: 'Email already exists' });
            }
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
       
        const userId = await new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO users (username, email, password, role, created_at, verified) VALUES (?, ?, ?, ?, ?, 0)`
            const role = 'user';
            const createdAt = new Date().toISOString();
            db.run(insertQuery, [username, email, hashedPassword, role, createdAt], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        
        const verificationToken = generateEmailVerificationToken(email);

        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            connectionTimeout: 10000, 
            greetingTimeout: 10000,
            socketTimeout: 10000
        });



        const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`;
        
        await transporter.sendMail({
            from: `"SCNAS Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - SCNAS',
            html: `
                <h2>Hello ${username},</h2>
                <p>Thanks for registering at SCANS. Please click the link below to verify your email:</p>
                <a href="${verificationUrl}" target="_blank">Verify Email</a>
                <p>This link will expire in 24 hours.</p>
            `,
        }).catch (err => console.error("Email sending failed:", err));
        
        return res.status(201).json({
            msg: 'User registered successfully! Please verify your email to activate your account.',
            userId,
        });

    } catch (err) {
        console.error('Error in register:', err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.verifyEmail = (req, res) => {
    const token = req.query.token;

    if (!token) return res.status(400).json({ msg: 'Missing token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        
        const updateQuery = `UPDATE users SET verified = 1 WHERE email = ?`;
        db.run(updateQuery, [email], function(err) {
            if (err) {
                return res.status(500).json({ msg: 'Database error' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.json({ msg: 'Email successfully verified! You can now login.' });
        });
    } catch (err) {
        return res.status(400).json({ msg: 'Invalid or expired token' });
    }
};


exports.login = (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ msg: 'Please provide username/email and password' });
    }

    if(validateEmail(identifier) !== true && validateUsername(identifier) !== true){
        return res.status(400).json({msg: 'invalid email or username format'});
    }

    const checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    db.get(checkQuery, [identifier, identifier], async (err, user) => {
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

        if (!user.verified) {
            return res.status(403).json({ msg: 'Please verify your email before logging in.' });
        }


        return res.status(200).json({
            msg: 'login successfully',
            token: generateToken(user)
        });
    });
};

exports.updateAdmin = (req, res)=>{
    if(req.user.role !== 'main-admin'){
        return res.status(403).json({success: false, msg: 'access denied: admin only'});
    }

    const id = req.params.id;
    const {role} = req.body;

    if (!role || !['admin', 'main-admin', 'user'].includes(role)) {
        return res.status(400).json({ success: false, msg: 'Invalid role provided' });
    }

    const checkUserQuery = `SELECT role FROM users WHERE id = ?`;
    db.get(checkUserQuery, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, msg: err.message });
        }
        if (!row) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        if (row.role === role) {
            return res.status(400).json({ success: false, msg: `User is already an ${role}` });
        }

        
        const updateQuery = `UPDATE users SET role = ? WHERE id = ?`;
        db.run(updateQuery, [role, id], function(err){
            if(err){
                return res.status(500).json({msg: err.message});
            }
            res.json({msg: `user promoted to ${role} successfully`});
        });
    });
}

exports.profile = (req, res) => {
     return res.status(200).json({
        msg: 'this is protected profile route', 
        user: req.user.id
    });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ msg: 'Please provide your email' });

    checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.get(checkQuery, [email], async (err, user) => {
        if (err) return res.status(500).json({ msg: 'Database error' });
        if (!user) return res.status(404).json({ msg: 'Email not found' });

        
        const resetToken = generateResetToken(user.email)

        const resetUrl = `${process.env.BACKEND_URL}/api/auth/reset-password?token=${encodeURIComponent(resetToken)}`;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"SCNAS Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password - SCNAS',
            html: `<p>Click the link to reset your password:</p><a href="${resetUrl}" target="_blank">Reset Password</a>`
        }).catch(err => console.error('Email sending failed:', err));

        res.json({ msg: 'Password reset email sent. Check your inbox.' });
    });
};

exports.resetPassword = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token) return res.status(400).json({ msg: 'Missing token' });
    if (!newPassword) return res.status(400).json({ msg: 'Please provide a new password' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        checkQuery = `SELECT password FROM users WHERE email = ?`;
        db.get(checkQuery, [email], async (err, row) => {
            if (err) return res.status(500).json({ msg: 'Database error' });
            if (!row) return res.status(404).json({ msg: 'User not found' });

            const currentHashedPassword = row.password;

            const isSame = await bcrypt.compare(newPassword, currentHashedPassword);
            if (isSame) {
                return res.status(400).json({ msg: 'New password cannot be the same as your old password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            updateQuery = `UPDATE users SET password = ? WHERE email = ?`
            db.run(updateQuery, [hashedPassword, email], function(err) {
                if (err) return res.status(500).json({ msg: 'Database error' });
                res.json({ msg: 'Password has been reset successfully!' });
            });
        });

    } catch (err) {
        return res.status(400).json({ msg: 'Invalid or expired token' });
    }
};
