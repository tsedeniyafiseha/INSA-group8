const express = require('express');

const router = express.Router();

const {register, login} = require ('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const {profile} = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware, profile);

module.exports = router;