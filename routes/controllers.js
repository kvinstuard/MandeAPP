const pool = require('../models/postgreDB');
const queries = require('./queries');
const bcrypt = require('bcrypt');


//async -> necesario para llamar 'await', hace la consulta pero no espera el resultado
//trabajador -specialista
const getSpecialist = async (req, res) => {
    const response = await pool.query(queries.getSpecialist); //await : notificar de consulta asicrona
    console.log('good');
    res.status(200).json(response.rows);
}
//nota:hacer primary key a cedula
const getSpecialistById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(queries.getSpecialistById, [id]);
    res.json(response.rows);
}
const createSpecialist = async (req, res) => {
    let { inputName, inputLastName, inputIdentification, inputAddress, inputPhoneNumber, inputEmail, inputPassword } = req.body

    console.log({
        inputName,
        inputLastName,
        inputIdentification,
        inputAddress,
        inputPhoneNumber,
        inputEmail,
        inputPassword
    })

    let errors = [];

    if (!inputName || !inputLastName || !inputIdentification || !inputAddress || !inputPhoneNumber || !inputEmail || !inputPassword) {
        errors.push({ message: "Por favor rellenar todos los campos" })
    }

    if (inputPassword.length < 8) {
        errors.push({ message: "La contraseña de minimo 8 caracateres" })
    }

    if (errors.length > 0) {
        res.render("singUpSpecialist", { errors })
    } else {

        let hashedPassword = await bcrypt.hash(inputPassword, 10);

        console.log(hashedPassword);

        pool.query(queries.checkEmailExist, [inputEmail], (err, results) => {
            if (err) {
                throw err
            }
            console.log(results.rows);

            if (results.rows.length > 0) {
                errors.push({ message: 'El correo electronico ya existe' });
                res.render('singUpSpecialist', { errors });
            } else {
                pool.query(queries.createSpecialist + 'RETURNING ID, password', [inputName, inputLastName,
                    inputIdentification, inputAddress, inputPhoneNumber, inputEmail, hashedPassword, req.file.path], (err, results) => {
                        if (err) {
                            throw err;
                        }
                        console.log(results.rows);
                        req.flash('success_msg', 'Ya estas registrado por favor ingresa a la app');
                        res.redirect('/login');
                    });
            }
        }

        )

    }
}
const updateSpecialist = async (req, res) => {
    const id = req.params.id;
    const { nombre, direccion, numero_cuenta } = req.body;
    const response = await pool.query(queries.updateSpecialist, [
        nombre,
        direccion,
        numero_cuenta,
        id
    ]);
    console.log(response);
    res.json('User Update Successfully');
}
const deleteSpecialist = async (req, res) => {
    const id = req.params.id;
    const response = pool.query(queries.deleteSpecialist, [id]);
    console.log(response);
    res.json(`Trabajador ${id} deleted successfully`);
}


//user


const getUser = async (req, res) => {
    const response = await pool.query(queries.getUser); //await : notificar de consulta asicrona
    console.log('good');
    res.status(200).json(response.rows);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = pool.query(queries.deleteUser, [id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
}


const createUser = async (req, res) => {

    let { inputName, inputLastName, inputIdentification, inputAddress, inputPhoneNumber, inputEmail, inputPassword } = req.body

    console.log({
        inputName,
        inputLastName,
        inputIdentification,
        inputAddress,
        inputPhoneNumber,
        inputEmail,
        inputPassword,
    })

    let{formSelect, inputCardNumber, inputExpiratonDate, inputCVV} = req.body
    if(formSelect = 1){
        formSelect = 'debito'
    }else{
        formSelect = 'credito'
    }

    pool.query(queries.createCard, [formSelect, inputCardNumber,
        inputExpiratonDate, inputCVV, inputPhoneNumber], (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);
        });

    let errors = [];

    if (!inputName || !inputLastName || !inputIdentification || !inputAddress || !inputPhoneNumber || !inputEmail || !inputPassword) {
        errors.push({ message: "Por favor rellenar todos los campos" })
    }

    if (inputPassword.length < 8) {
        errors.push({ message: "La contraseña de minimo 8 caracateres" })
    }

    if (errors.length > 0) {
        res.render("singUpUser", { errors })
    } else {

        let hashedPassword = await bcrypt.hash(inputPassword, 10);

        console.log(hashedPassword);

        pool.query(queries.checkEmailExist, [inputEmail], (err, results) => {
            if (err) {
                throw err
            }
            console.log(results.rows);

            if (results.rows.length > 0) {
                errors.push({ message: 'El correo electronico ya existe' });
                res.render('singUpUser', { errors });
            } else {
                pool.query(queries.createUser + 'RETURNING ID, password', [inputName, inputLastName,
                    inputIdentification, inputAddress, inputPhoneNumber, inputEmail, hashedPassword, req.file.path], (err, results) => {
                        if (err) {
                            throw err;
                        }
                        console.log(results.rows);
                        req.flash('success_msg', 'Ya estas registrado por favor ingresa a la app');
                        res.redirect('/login');
                    });
            }
        }

        )

    }
}
/*
const getUserByID = (req, res) => {
    const ID = parseInt(req.params.ID);
    pool.query(queries.getPersonaByID, [ID], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
*/

module.exports = {
    getSpecialist,
    getSpecialistById,
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,

    createUser,
    getUser,
    deleteUser
    //getUserByID
}