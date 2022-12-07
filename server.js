const express = require('express')
const mongoose = require('mongoose');

const pages = require('./pages/index')
const api = require('./api/index')

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', pages);
app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})