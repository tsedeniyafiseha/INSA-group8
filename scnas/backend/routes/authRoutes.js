const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body);
    res.json({msg : 'login routes works'});
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Registering user:', username);
    res.json({msg : `${username} registerd successfully`});
})

module.exports = router;