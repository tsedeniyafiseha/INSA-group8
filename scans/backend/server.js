const express = require('express');
const helmet = require('helmet');
const app = express();

const db = require('./database/db');
require('dotenv').config();

const errorHandler = require('./middleware/errorMiddleware');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/api/schedule', scheduleRoutes);

app.use((req, res, next) => {
    res.status(404).json({ success: false, msg: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});