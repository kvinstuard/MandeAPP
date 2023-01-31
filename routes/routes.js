const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', controller.getPersonas);
router.get('/:ID', controller.getPersonaByID);

//router.get('/trabajador', controller.getTrabajador);//traer info

//router.post('/trabajador/singup', controller.createTrabajador); //crear info

//router.get('/trabajador/:id', controller.getTrabajadorById); //traer infor por cedula

//router.delete('/trabajador/:id', controller.deleteTrabajador);

//router.put('/trabajador/:id', controller.updateTrabajador);

module.exports = router;