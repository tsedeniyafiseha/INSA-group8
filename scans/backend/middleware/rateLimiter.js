const rateLimit = require ('express-rate-limit');

const signInLimiter = rateLimit({
    windowMs: 5*60*1000,
    max: 5,
    message : {
        msg: "Too many sign In attempts from this IP, please try again after 5 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = signInLimiter;