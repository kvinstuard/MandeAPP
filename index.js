//npm i express pg
//npm i nodemon -D (el -D especifica que es una ayuda para desarrollar)
//modificar script del package.json - npm run dev
const express = require('express');
const app = express();

//middlewares
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));//entender dato enviado a traves de un formulario, no fotos


//routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');