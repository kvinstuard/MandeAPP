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

module.exports = {
    getPersonas,
    getPersonaByID,
}