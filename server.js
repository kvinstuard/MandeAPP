const express = require('express');
const personas = require('./routes/routes');
const { pool } = require('./models/postgreDB');

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true})
)

app.use(express.static('public'));

app.use(express.static('Images'));

app.use(
    express.json({
        type: "*/*"
    })
);

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('mandeApp');
});

app.get('/user',(req, res)=>{
    res.render('menuUser');
});

app.get('/user/singup',(req, res)=>{
    res.render('singUpUser');
});

app.get('/specialist',(req, res)=>{
    res.render('menuSpecialist');
});

app.get('/specialist/singup',(req, res)=>{
    res.render('singUpSpecialist');
});

app.get('/login',(req, res)=>{
    res.render('login');
});

app.use('/mandeapp', personas);

const server = app.listen(port, () =>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
});