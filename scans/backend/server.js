const express = require('express');
const app = express();

const db = require('./database/db');

const PORT = 5000;

//middleware
app.use(express.json());

//routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`server ruuning on port ${PORT}`)
});