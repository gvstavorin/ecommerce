const express=require("express");
const router = express.Router(); 

const {create,categoriaPorId,read,update,remove,list} = require("../controllers/category")
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth")
const {usuarioPorId} = require("../controllers/user")


//rutas 
router.post('/category/create/:userId',requireSignin, isAuth,isAdmin, create);
router.put('/category/:categoryId/:userId',requireSignin, isAuth,isAdmin, update);
router.delete('/category/:categoryId/:userId',requireSignin, isAuth,isAdmin, remove);
router.get('/category/:categoryId',read)
router.get('/categories',list)

router.param('userId',usuarioPorId)
router.param('categoryId',categoriaPorId)

module.exports =router; 

