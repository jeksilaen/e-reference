const express = require('express');
const router = express.Router();
const Users = require('../models/users')

router.get('/', (req, res) => {
    res.render('login', {msg: '', auth: false});
})

router.get('/register', (req, res) => {
    res.render('register')
})


router.get('/references', (req, res) => {
    Users.findOne({email:req.query.email}, (err, docs) => {
        if (!err) {
            if (docs) {
                res.render('references', {references: docs.references});
              };
            }})

})




module.exports = router;