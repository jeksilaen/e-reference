const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {msg: '', auth: false});
})

router.get('/register', (req, res) => {
    res.render('register')
})





module.exports = router;