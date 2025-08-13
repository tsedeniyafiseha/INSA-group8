const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // logs to console
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        msg: err.message || 'Internal server error'
    });
};

module.exports = errorHandler;