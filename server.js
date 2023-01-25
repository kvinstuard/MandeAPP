const express = require('express');
const personas = require('./routes/routes');

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true})
)
app.use(
    express.json({
        type: "*/*"
    })
);

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('mandeApp');
});

app.get('/menu/user',(req, res)=>{
    res.render('menuUser');
});

app.get('/menu/specialist',(req, res)=>{
    res.render('menuSpecialist');
});

app.get('/menu/user/singup',(req, res)=>{
    res.render('singUpUser');
});


app.use('/mandeapp', personas);

const server = app.listen(port, () =>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
})