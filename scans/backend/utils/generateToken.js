const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const generateEmailVerificationToken = (email, version) => {
    return jwt.sign(
        { email, version }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' })

};

const generateResetToken = (email) => {
    return jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' })
};


module.exports = {
    generateToken,
    generateEmailVerificationToken,
    generateResetToken 
};
