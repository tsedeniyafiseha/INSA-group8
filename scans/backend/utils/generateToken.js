const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// New: generate email verification token (valid 1 day)
const generateEmailVerificationToken = (email) => {
    return jwt.sign(
        { email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' })

};


module.exports = {
    generateToken,
    generateEmailVerificationToken  
};
