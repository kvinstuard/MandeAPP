const {Router} = require('express');
const router = Router();
const { getSpecialist, createSpecialist, getUser, createUser} = require('../controllers/index.controller')



router.get('/',(req,res)=>{
    res.render('mandeApp');
});

router.get('/user',(req, res)=>{
    res.render('menuUser');
});

router.get('/user/singup',(req, res)=>{
    res.render('singUpUser');
});

router.get('/specialist',(req, res)=>{
    res.render('menuSpecialist');
});

router.get('/specialist/singup',(req, res)=>{
    res.render('singUpSpecialist');
});

router.get('/login',(req, res)=>{
    res.render('login');
});

router.get('/mostrarBdTrabajador', getSpecialist);
router.get('/mostrarBdUsuario', getUser);



router.post('/specialist/singup', createSpecialist); 
router.post('/user/singup', createUser);

//router.get('/specialist', getTrabajador);//traer info
//router.post('/trabajador/singup', createTrabajador) //crear info
//router.get('/trabajador/:id', getTrabajadorById) //traer infor por cedula
//router.delete('/trabajador/:id', deleteTrabajador)
//router.put('/trabajador/:id',updateTrabajador)


module.exports = router;
