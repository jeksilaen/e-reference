const express = require('express');
const path = require('path');
const reload = require('reload')
const mongoose = require('mongoose');

const pages = require('./pages/route');
const apiAuth = require('./api/auth');

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URI = "mongodb://localhost:27017/referenceDB";

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/auth', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', pages);
app.use('/auth', apiAuth);

mongoose.set('strictQuery', false);
mongoose.connect(DB_URI, { useNewUrlParser: true }); 
mongoose.connection.once('open', () => { 
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', (error) => {
    console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

reload(app);
