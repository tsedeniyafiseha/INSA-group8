const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/userModel');
const {generateToken, generateEmailVerificationToken,  generateResetToken} = require('../utils/generateToken');
const {validateUsername, validateEmail, validatePassword} = require('../utils/validators');
const {sendEmail}  = require('../utils/mailer');


exports.register = async (req, res) => {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Username, email, and password are required' });
    }
    username = validator.escape(username);
    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
    }

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
        const existingUsername = await User.findUserByUsername(username);
        if (existingUsername) return res.status(409).json({ msg: 'Username already exists' });

        const existingEmail = await User.findUserByEmail(email);
        if (existingEmail) return res.status(409).json({ msg: 'Email already exists' });


        
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'user';
        const createdAt = new Date().toISOString();
        const emailTokenVersion = 0;

        const userId = await User.createUser(username, email, hashedPassword, role, createdAt, emailTokenVersion);

        
        const verificationToken = generateEmailVerificationToken(email);
        const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`;
        
        try{
            await sendEmail({
                to: email,
                subject: 'Verify Your Email - SCNAS',
                html: `
                    <h2>Hello ${username},</h2>
                    <p>Thanks for registering at SCNAS. Please click the link below to verify your email:</p>
                    <a href="${verificationUrl}" target="_blank">Verify Email</a>
                    <p>This link will expire in 24 hours.</p>
                `,
            });
        }catch(err){
            return res.status(500).json({ msg: 'Registration failed: could not send verification email' });
        }

        

        return res.status(201).json({
            msg: 'User registered successfully! Please verify your email to activate your account.',
            userId,
        });


    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    const token = req.query.token;

    if (!token) return res.status(400).json({ msg: 'Missing token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { email, version: tokenVersion } = decoded;

        const user = await User.findUserByEmailAndVersion(email, tokenVersion);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const changes = await User.verifyEmail(email);
        if (changes === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }

        return res.json({ msg: 'Email successfully verified!' });
    } catch (err) {
         if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: 'Token expired' });
        }
        return res.status(400).json({ msg: 'Invalid token' });
    }
};


exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ msg: 'Please provide username/email and password' });
    }

    const identifierTrimmed = identifier.trim();
    let user = null;
    let type = '';

    if (validateEmail(identifierTrimmed) === true) {
        type = 'email';
    } else if (validateUsername(identifierTrimmed) === true) {
        type = 'username';
    } else {
        return res.status(400).json({ msg: 'Invalid email or username format' });
    }

    try {
        if (type === 'email') {
            user = await User.findUserByEmail(identifierTrimmed);
        } else {
            user = await User.findUserByUsername(identifierTrimmed);
        }

        if (!user) {
            return res.status(400).json({ msg: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid login credentials' });
        }

        if (!user.verified) {
            await User.incrementEmailTokenVersion(user.id);

            const updatedUser = await User.findUserById(user.id);

            const verificationToken = generateEmailVerificationToken(
                updatedUser.email, 
                updatedUser.emailTokenVersion
            );


            const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`;

            await sendEmail({
                to: updatedUser.email,
                subject: 'Verify Your Email - SCNAS',
                html: `
                    <h2>Hello ${updatedUser.username},</h2>
                    <p>You haven't verified your email yet. Click below to verify:</p>
                    <a href="${verificationUrl}" target="_blank">Verify Email</a>
                    <p>This link will expire in 24 hours.</p>
                    `
                });
            return res.status(403).json({ msg: 'Please verify your email before logging in.' });
        }

        return res.status(200).json({
            msg: 'Login successfully',
            token: generateToken(user)
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ msg: 'Database error' });
    }
};

exports.updateAdmin = async (req, res) => {
    if(req.user.role !== 'main-admin'){
        return res.status(403).json({success: false, msg: 'access denied: main-admin only'});
    }

    const id = req.params.id;
    const {role} = req.body;

    if (!role || !['admin', 'main-admin', 'user'].includes(role)) {
        return res.status(400).json({ success: false, msg: 'Invalid role provided' });
    } 

    try{
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        if (targetUser.role === role) {
            return res.status(400).json({ success: false, msg: `User is already an ${role}` });
        }

        if (targetUser.role === 'main-admin' && role !== 'main-admin') {
            const allMainAdmins = await User.countByRole('main-admin');
            if (allMainAdmins <= 1) {
                return res.status(400).json({ 
                    success: false, 
                    msg: 'Cannot demote the last main-admin — you would lose admin access!' 
                });
            }
        }

        
        await User.updateUserRole(id, role);

        res.json({msg: `user role updated to ${role} successfully`});
    }catch(err) {
       res.status(500).json({ msg: 'Database error' });
    }
};

exports.profile = (req, res) => {
     return res.status(200).json({
        msg: 'this is protected profile route', 
        user: req.user.id
    });
};

exports.forgotPassword = async (req, res) => {
    let { email } = req.body;
    if (!email) {
        return res.status(400).json({ msg: 'Please provide your email' });
    }

    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
    }

    try{
        const user = await User.findUserByEmail(email);
        if (!user) return res.status(404).json({ msg: 'Email not found' });

        
        const resetToken = generateResetToken(user.email)
        const resetUrl = `${process.env.BACKEND_URL}/api/auth/reset-password?token=${encodeURIComponent(resetToken)}`;

        
        try{
            await sendEmail({
                to: email,
                subject: 'Reset Your Password - SCNAS',
                html: `<p>Click the link to reset your password:</p><a href="${resetUrl}" target="_blank">Reset Password</a>`
            })
        }catch(emailErr){
            return res.status(500).json({ msg: 'Failed to send password reset email. Please try again later.' });
        } 
        
        return res.json({ msg: 'Password reset email sent. Check your inbox.' });

    } catch(err) {
       res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token) return res.status(400).json({ msg: 'Missing token' });
    if (!newPassword) return res.status(400).json({ msg: 'Please provide a new password' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findUserByEmail(decoded.email)
            if (!user) return res.status(404).json({ msg: 'User not found' });

            const currentHashedPassword = user.password;

            const isSame = await bcrypt.compare(newPassword, currentHashedPassword);
            if (isSame) {
                return res.status(400).json({ msg: 'New password cannot be the same as your old password' });
            }

            const passwordValidation = validatePassword(newPassword);
            if (passwordValidation !== true) {
                return res.status(400).json({ msg: passwordValidation });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePasswordByEmail(decoded.email, hashedPassword);

            return res.json({ msg: 'Password has been reset successfully!' });
    } catch (err) {
         if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: 'Token expired' });
        }
        return res.status(400).json({ msg: 'Invalid token' });
    }
};
