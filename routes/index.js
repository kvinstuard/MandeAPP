const {Router} = require('express');
const router = Router();
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require('../controllers/index.controller')


router.get('/users', getUsers);//traer info
router.post('/users', createUser) //crear info
router.get('/users/:id', getUserById) //traer infor por cedula
router.delete('/users/:id', deleteUser)
router.put('/users/:id',updateUser)

module.exports = router;
