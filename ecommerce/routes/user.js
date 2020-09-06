const express=require("express");
const router = express.Router(); 

const {usuarioPorId,read,update,purchaseHistory} = require("../controllers/user")
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth")


router.get('/secret/:userId',requireSignin, isAdmin, isAuth, (req ,res) =>{
    res.json({
        user:req.profile
    })
})
router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/order/by/user/:userId', requireSignin, isAuth, purchaseHistory)



router.param('userId',usuarioPorId)



module.exports =router; 