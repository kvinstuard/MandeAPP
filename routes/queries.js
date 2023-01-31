const getPersonas = 'SELECT * FROM persona';
const getPersonaByID = 'SELECT * FROM persona WHERE ID = $1'; 
const getTrabajador = 'SELECT * FROM trabajador';
const getTrabajadorById = 'SELECT * FROM trabajador WHERE cedula = $1';
const createTrabajador = 'INSERT INTO trabajador(nombre, apellido, cedula, direccion, numero_cuenta, celular, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const updateTrabajador = 'UPDATE trabajador SET nombre = $1, direccion = $2, numero_cuenta = $3 WHERE cedula = $4';
const deleteTrabajador = 'DELETE FROM trabajador WHERE cedula = $1';

module.exports = {
    getPersonas,
    getPersonaByID,
    getTrabajador,
    getTrabajadorById,
    createTrabajador,
    updateTrabajador,
    deleteTrabajador,
    
}