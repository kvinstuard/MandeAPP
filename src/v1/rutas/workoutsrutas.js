const { Router } = require('express');
const router = Router();

const { getUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } = require('../../controlador/workoutscontroladores');

router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioById);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario)
router.delete('/usuario/:id', deleteUsuario);

module.exports = router;