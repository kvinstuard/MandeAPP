const { Pool } = require('pg');

const pool = new Pool 
({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'usuario'
});

const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUsuarioById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUsuario = async (req, res) => {
    const { nombre, apellido,correo,telefono,direccion } = req.body;
    const response = await pool.query('INSERT INTO usuarios(nombre, apellido,correo,telefono,direccion) VALUES ($1, $2, $3, $4 ,$5)', [nombre, apellido,correo,telefono,direccion]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {nombre, apellido,correo,telefono,direccion}
        }
    })
};

const updateUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, apellido,correo,telefono,direccion} = req.body;

    const response =await pool.query('UPDATE usuarios SET nombre = $1, apellido = $2, correo = $3, telefono = $4, direccion = $5 WHERE id =$6', [
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        id
    ]);
    res.json('Usuarios Updated Successfully');
};

const deleteUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM usuarios where id = $1', [
        id
    ]);
    res.json(`Usuarios ${id} deleted Successfully`);
};

module.exports = {
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};