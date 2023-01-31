const { response } = require('express');
const { Pool } = require('pg'); //conjunto de conexiones

//Especificando la conexion remota al servidor aws
const pool = new Pool({
    host: 'mandeposgrest.postgres.database.azure.com',
    port: '5432',
    database: 'mandeAPP',
    user: 'mandeadmin@mandeposgrest',
    password: 'Posgrest@'
});



//trabajador -specialista
const getSpecialist = async (req,res)=>{
   const response = await pool.query('SELECT * FROM trabajador'); //await : notificar de consulta asicrona
   console.log('good');
   res.status(200).json(response.rows);
}
//nota:hacer primary key a cedula
const getTrabajadorById = async (req, res) =>{
    const id =  req.params.id;
    const response = await pool.query('SELECT * FROM trabajador WHERE cedula = $1', [id]);
    res.json(response.rows);
} 
const createSpecialist = async (req, res)=>{
    if(!req.body.inputname || !req.body.inputlastn || !req.body.inputid || !req.body.inputaddres
        || !req.body.inputphone || !req.body.inputemail || !req.body.inputpass){
            res.sendStatus(400).send('Llenar todos los campos');
        }
       let nuevo = {
    
         name: req.body.inputname,
         lastname: req.body.inputlastn,
         id: req.body.inputid,
         address: req.body.inputaddres,
         phone: req.body.inputphone,
         email: req.body.inputemail,
         password: req.body.inputpass
       }
       console.log(nuevo);
    
       const response = await pool.query('INSERT INTO trabajador(nombre, apellido, cedula, direccion, numero_cuenta, celular, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [nuevo.name, nuevo.lastname, nuevo.id, nuevo.address, nuevo.email, nuevo.phone, nuevo.password]);
        console.log(response);
        res.redirect('/specialist');
}
const updateTrabajador = async (req, res)=>{
    const id = req.params.id;
    const {nombre, direccion, numero_cuenta} = req.body;
    const response = await pool.query('UPDATE trabajador SET nombre = $1, direccion = $2, numero_cuenta = $3 WHERE cedula = $4', [
        nombre,
        direccion,
        numero_cuenta,
        id
    ]);
    console.log(response);
    res.json('User Update Successfully');
}
const deleteTrabajador = async (req, res)=>{
    const id = req.params.id;
    const response = pool.query('DELETE FROM trabajador WHERE cedula = $1', [id]);
    console.log(response);
    res.json(`Trabajador ${id} deleted successfully`);
}


//user


const getUser = async (req,res)=>{
    const response = await pool.query('SELECT * FROM usuario'); //await : notificar de consulta asicrona
    console.log('good');
    res.status(200).json(response.rows);
 }


const createUser = async (req, res)=>{
    if(!req.body.inputname || !req.body.inputlastn || !req.body.inputid || !req.body.inputaddres
        || !req.body.inputphone || !req.body.inputemail || !req.body.inputpass){
            res.sendStatus(400).send('Llenar todos los campos');
        }
       let nuevo = {
         name: req.body.inputname,
         lastname: req.body.inputlastn,
         id: req.body.inputid,
         address: req.body.inputaddres,
         phone: req.body.inputphone,
         email: req.body.inputemail,
         password: req.body.inputpass
       }
       console.log(nuevo);
    
       const response = await pool.query('INSERT INTO usuario(nombre, apellido, cedula, direccion, email, celular) VALUES ($1, $2, $3, $4, $5, $6)',
        [nuevo.name, nuevo.lastname, nuevo.id, nuevo.address, nuevo.email, nuevo.phone]);
        console.log(response);
        res.redirect('/user');
}




module.exports = {
    getSpecialist,
    getTrabajadorById,
    createSpecialist,
    updateTrabajador,
    deleteTrabajador,

    createUser,
    getUser
}