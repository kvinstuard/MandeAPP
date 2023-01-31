const LocalStrategy = require('passport-local').Strategy;
const { pool }= require('./postgreDB');
const queries = require('../routes/queries');
const bcrypt = require('bcrypt');

function initialized(passport) {
    const authenticateUser = (inputEmail, inputPassword, done) => {

        pool.query(queries.checkEmailExist, [inputEmail], (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);

            if (results.rows.length > 0) {
                const user = results.row[0];

                bcrypt.compare(inputPassword, user.inputPassword, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }

                    if (isMatch) {
                        return done(null, user);
                        
                    } else {
                        return done(null, false, {message: 'Contraseña incorrecta'});
                    }
                })
            } else {
                return done(null, false, {message: 'El correo no esta registrado'});
            }
        })

    }

    passport.use(new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password'
    },
        authenticateUser
    )
    );

    passport.serializeUser((user, done)=> done(null, user.ID))

    passport.deserializeUser((ID, done)=> {
        pool.query(queries.getUserByID, [ID], (err, results)=>{
            if(err){
                throw err;
            }
            return done(null, results.rows[0]);
        })
    })

}

module.exports = initialized;