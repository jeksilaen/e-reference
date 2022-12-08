const express = require('express')
const path = require('path')
const mongoose = require('mongoose');

const pages = require('./pages/route')
const api = require('./api/index')

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', pages);
// app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})