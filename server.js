const express = require('express');
const rutas = require('./routes/routes');
const { pool } = require('./models/postgreDB');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializedPassport = require('./models/passportConfig')

initializedPassport(passport);

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static('public'));

app.use(express.static('Images'));

app.use(
    express.json({
        type: "*/*"
    })
);

app.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('mandeApp');
});

app.get('/user', (req, res) => {
    res.render('menuUser');
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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
}));

app.use('/test', rutas);

const server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
});