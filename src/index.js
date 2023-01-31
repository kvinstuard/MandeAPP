//npm i express pg
//npm i nodemon -D (el -D especifica que es una ayuda para desarrollar)
//modificar script del package.json - npm run dev
const express = require('express');
const path = require('path');
const app = express();


//middlewares
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));//entender dato enviado a traves de un formulario, no fotos

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.static(path.resolve(__dirname, 'images')));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use(require('./routes/index'));
app.listen(3000);
console.log('Server on port 3000');