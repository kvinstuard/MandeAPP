const {Router} = require('express');
const router = Router();
const { getTrabajador, createTrabajador, getTrabajadorById, deleteTrabajador, updateTrabajador} = require('../controllers/index.controller')



router.get('/',(req,res)=>{
    res.render('mandeApp');
});

router.get('/trabajador/singup',(req, res)=>{
    res.render('singUpSpecialist');
});


router.get('/trabajador', getTrabajador);//traer info
//router.post('/trabajador/singup', createTrabajador) //crear info
router.post('/trabajador/singup', createTrabajador); 

router.get('/trabajador/:id', getTrabajadorById) //traer infor por cedula
router.delete('/trabajador/:id', deleteTrabajador)
router.put('/trabajador/:id',updateTrabajador)


module.exports = router;
