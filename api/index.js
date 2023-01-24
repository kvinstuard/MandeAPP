const express = require('express');
const clientRoutes = require('../routes/index')

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
)

const server = app.listen(port, () =>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Mande App listening at http://", host, port)
} 
)