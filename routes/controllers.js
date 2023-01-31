const pool = require('../models/postgreDB');
const queries = require('./queries');

const getPersonas = (req, res) => {
    pool.query(queries.getPersonas, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows); 
    });
};

const getPersonaByID = (req, res) => {
    const ID = parseInt(req.params.ID);
    pool.query(queries.getPersonaByID, [ID], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

//async -> necesario para llamar 'await', hace la consulta pero no espera el resultado
const getTrabajador = async (req,res)=>{
    const response = await pool.query(queries.getTrabajador); //await : notificar de consulta asicrona
    console.log('good');
    res.status(200).json(response.rows);
 }
 //nota:hacer primary key a cedula
 const getTrabajadorById = async (req, res) =>{
     const id =  req.params.id;
     const response = await pool.query(queries.getTrabajadorById, [id]);
     res.json(response.rows);
 } 
 const createTrabajador = async (req, res)=>{
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
     
        const response = await pool.query(queries.createTrabajador,
         [nuevo.name, nuevo.lastname, nuevo.id, nuevo.address, nuevo.email, nuevo.phone, nuevo.password]);
         console.log(response);
         res.redirect('/');
 }
 const updateTrabajador = async (req, res)=>{
     const id = req.params.id;
     const {nombre, direccion, numero_cuenta} = req.body;
     const response = await pool.query(queries.updateTrabajador, [
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
     const response = pool.query(queries.deleteTrabajador, [id]);
     console.log(response);
     res.json(`Trabajador ${id} deleted successfully`);
 }
 

module.exports = {
    getPersonas,
    getPersonaByID,
    getTrabajador,
    getTrabajadorById,
    createTrabajador,
    updateTrabajador,
    deleteTrabajador,
}