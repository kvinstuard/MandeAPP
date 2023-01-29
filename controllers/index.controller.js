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

//async -> necesario para llamar 'await', hace la consulta pero no espera el resultado
const getUsers = async (req,res)=>{
   const response = await pool.query('SELECT * FROM trabajador'); //await : notificar de consulta asicrona
   console.log('good');
   res.status(200).json(response.rows);
}
//nota:hacer primary key a cedula
const getUserById = async (req, res) =>{
    const id =  req.params.id;
    const response = await pool.query('SELECT * FROM trabajador WHERE cedula = $1', [id]);
    res.json(response.rows);
}
const createUser = async (req, res)=>{
    const {nombre, cedula, direccion, numero_cuenta} = req.body;
    const response = await pool.query('INSERT INTO trabajador(nombre, cedula, direccion, numero_cuenta) VALUES ($1, $2, $3, $4)',
    [nombre, cedula, direccion, numero_cuenta]);
    console.log(response);
    res.json({
        message: 'User added Succesfully',
        body: {
            user: {nombre, cedula, direccion, numero_cuenta}
        }
    }) 
}
const updateUser = async (req, res)=>{
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
const deleteUser = async (req, res)=>{
    const id = req.params.id;
    const response = pool.query('DELETE FROM trabajador WHERE cedula = $1', [id]);
    console.log(response);
    res.json(`Trabajador ${id} deleted successfully`);
}



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}