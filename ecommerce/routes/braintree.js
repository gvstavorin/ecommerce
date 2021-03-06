const express = require('express')
const router = express.Router()
const {requireSignin, isAuth} = require("../controllers/auth")
const {usuarioPorId} = require("../controllers/user")
const {generateToken,proccessPayment} = require("../controllers/braintree")

router.get("/braintree/getToken/:userId",requireSignin,isAuth,generateToken)

router.post("/braintree/payment/:userId",requireSignin,isAuth,proccessPayment)




router.param("userId",usuarioPorId)
module.exports =router;