const express = require('express');

const router = express.Router();

const {createSchedule} = require('../controllers/scheduleController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createSchedule);

module.exports = router;