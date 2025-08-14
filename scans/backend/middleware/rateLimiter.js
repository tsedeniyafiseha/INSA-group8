const rateLimit = require ('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message : {
        msg: "Too many login attempts from this IP, please try again after 1 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;