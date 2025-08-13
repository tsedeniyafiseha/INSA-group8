const express = require('express');

const router = express.Router();

const {register, login, updateAdmin, verifyEmail} = require ('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const {profile} = require('../controllers/authController');

const loginLimiter = require('../middleware/rateLimiter');

router.post('/register', register);

router.post('/login', loginLimiter, login);

router.get('/profile', authMiddleware, profile);

router.put('/updateAdmin/:id', authMiddleware, updateAdmin);

router.get('/verify-email', verifyEmail);

module.exports = router;
