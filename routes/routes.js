const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/user', controller.getUser);

//router.get('/user/:ID', controller.getUserByID);

router.get('/specialist', controller.getSpecialist);

router.post('/specialistSingup', controller.createSpecialist); 
router.post('/userSingup', controller.createUser);

//router.get('/trabajador/:id', getTrabajadorById) //traer infor por cedula
//router.delete('/trabajador/:id', deleteTrabajador)
//router.put('/trabajador/:id',updateTrabajador)

module.exports = router;