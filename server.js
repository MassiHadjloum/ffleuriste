const express = require('express');
const server = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./server/database/connexion');
//const mongoose = require('mongoose');



//Access-Control-Allow-Origin
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});


server.listen(8080);
console.log(server.get('port'));

server.set('view engine', 'ejs');

server.use(express.json());
server.use(bodyparser.urlencoded({ extended: true }));

server.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
server.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
server.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

//use session
server.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


server.use(flash());

server.get('/userhome/id/:id', (req, res) => {
    res.render('userhome', { id_client: req.params.id })
});


server.use('/', require('./server/routes/router'));