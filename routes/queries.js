const getPersonas = 'SELECT * FROM persona';
const getPersonaByID = 'SELECT * FROM persona WHERE ID = $1'; 

module.exports = {
    getPersonas,
    getPersonaByID,
}