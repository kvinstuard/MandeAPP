const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', controller.getPersonas);
router.get('/:ID', controller.getPersonaByID);

router.get('/trabajador', getTrabajador);//traer info

router.post('/trabajador/singup', createTrabajador); //crear info

router.get('/trabajador/:id', getTrabajadorById); //traer infor por cedula

router.delete('/trabajador/:id', deleteTrabajador);

router.put('/trabajador/:id',updateTrabajador);

module.exports = router;