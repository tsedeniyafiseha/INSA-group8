const rateLimit = require ('express-rate-limit');

const signInLimiter = rateLimit({
    windowMs: 5*60*1000,
    max: 5,
    message : {
        msg: "Too many signIn attempts from this IP, please try again after 1 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = signInLimiter;