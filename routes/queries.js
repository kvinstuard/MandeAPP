const getUser = 'SELECT * FROM usuario';
const createUser = 'INSERT INTO usuario(name, last_name, id, address, phone_number, email, password, utility_bills) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const getUserByID = 'SELECT * FROM usuario WHERE id = $1'; 
const getSpecialist = 'SELECT * FROM specialist';
const getSpecialistById = 'SELECT * FROM specialist WHERE id = $1';
const createSpecialist = 'INSERT INTO specialist(name, last_name, id, address, phone_number, email, password, id_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const updateSpecialist = 'UPDATE specialist SET name = $1, address = $2, email = $3 WHERE id = $4';
const deleteSpecialist = 'DELETE FROM specialist WHERE ID = $1';
const deleteUser = 'DELETE FROM usuario WHERE ID = $1';
const checkEmailExist = 'SELECT * FROM usuario WHERE email = $1';

module.exports = {
    getUser,
    createUser,
    getUserByID,
    getSpecialist,
    getSpecialistById,
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,
    deleteUser,
    checkEmailExist
}