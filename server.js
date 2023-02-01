const express = require('express');
const rutas = require('./routes/routes');
const { pool } = require('./models/postgreDB');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
//new
const multer = require('multer');


const initializedPassport = require('./models/passportConfig');
const path = require('path');

initializedPassport(passport);

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));

app.use(express.static('Images'));

app.use(express.static('scripts'));


//app.use(express.json({type: "*/*"}));

//new

app.use(multer({
    dest: path.join(__dirname, 'public/uploads')
}).single('inputPhoto'));

//
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//routes

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('animation');
});

app.get('/mandeApp', (req, res) => {
    res.render('mandeApp');
});

app.get('/user', (req, res) => {
    res.render('menuUser');
});

app.get('/findSpecialist',(req, res)=>{
    res.render('findSpecialist');
});

app.get('/userSingup', (req, res) => {
    res.render('singUpUser');
});

app.get('/specialist', (req, res) => {
    res.render('menuSpecialist');
});

app.get('/specialisSingup', (req, res) => {
    res.render('singUpSpecialist');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/userSingup', rutas);
app.post('/specialisSingup', rutas);

app.post('/login', passport.authenticate('local', {
    successRedirect: '/findSpecialist',
    failureRedirect: '/login',
    failureFlash: true
}));

app.use('/test', rutas);

const server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
});