const express = require('express')
const router = express.Router()
const {requireSignin, isAuth} = require("../controllers/auth")
const {usuarioPorId} = require("../controllers/user")
const {createOrder} = require("../controllers/order")


router.post("/order/create/:userId",requireSignin,isAuth,createOrder)




router.param("userId",usuarioPorId)
module.exports =router;