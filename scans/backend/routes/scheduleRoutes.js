const express = require('express');

const router = express.Router();

const {createSchedule, readSchedule, deleteSchedule, updateSchedule} = require('../controllers/scheduleController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createSchedule);

router.get('/', authMiddleware, readSchedule);

router.put('/:id', authMiddleware, updateSchedule);

router.delete('/:id', authMiddleware, deleteSchedule);

module.exports = router;



