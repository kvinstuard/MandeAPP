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

app.get('/findSpecialist',(req, res)=>{
    res.render('findSpecialist');
});

app.get('/userSingup',(req, res)=>{
    res.render('singUpUser');
});

app.get('/specialist',(req, res)=>{
    res.render('menuSpecialist');
});



app.get('/specialisSingup',(req, res)=>{
    res.render('singUpSpecialist');
});

app.get('/login',(req, res)=>{
    res.render('login');
});

app.post("/userSingup", (req, res)=>{
    let {inputName, inputLastName, inputIdentification, inputAddress, inputPhoneNumber, inputEmail, inputPassword}=req.body

    console.log({
        inputName, 
        inputLastName, 
        inputIdentification, 
        inputAddress, 
        inputPhoneNumber, 
        inputEmail, 
        inputPassword
    })

    let errors = [];

    if (!inputName || !inputLastName || !inputIdentification || !inputAddress || !inputPhoneNumber || !inputEmail || !inputPassword){
        errors.push({ message: "Por favor rellenar todos los campos"})
    }

    if (inputPassword.length < 8) {
        errors.push({ message: "La contraseña de minimo 8 caracateres"})
    }

    if (errors.length > 0){
        res.render("singUpUser", { errors })
    }
})

app.use('/mandeapp', personas);

const server = app.listen(port, () =>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
});