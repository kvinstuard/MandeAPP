const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', controller.getPersonas);
router.get('/:ID', controller.getPersonaByID);

module.exports = router;