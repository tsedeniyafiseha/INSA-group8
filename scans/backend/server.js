const express = require('express');
const app = express();

const db = require('./database/db');
require('dotenv').config();


const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/api/schedule', scheduleRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});