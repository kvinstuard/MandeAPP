const getUser = 'SELECT * FROM personas';
const createUser = 'INSERT INTO personas(name, last_name, ID, address, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const getUserByID = 'SELECT * FROM personas WHERE ID = $1'; 
const getSpecialist = 'SELECT * FROM trabajador';
const getSpecialistById = 'SELECT * FROM trabajador WHERE ID = $1';
const createSpecialist = 'INSERT INTO trabajador(name, last_name, ID, address, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const updateSpecialist = 'UPDATE trabajador SET name = $1, address = $2, email = $3 WHERE ID = $4';
const deleteSpecialist = 'DELETE FROM trabajador WHERE ID = $1';
const checkEmailExist = 'SELECT s FROM personas s WHERE s.email = $1';

module.exports = {
    getUser,
    createUser,
    getUserByID,
    getSpecialist,
    getSpecialistById,
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,
    checkEmailExist,
    
}