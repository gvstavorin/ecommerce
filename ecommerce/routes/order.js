const express = require('express')
const router = express.Router()
const {requireSignin, isAuth} = require("../controllers/auth")
const {usuarioPorId,addOrderToUserHistory} = require("../controllers/user")
const {createOrder,listOrder,getStatusValues,updateOrderStatus,orderById} = require("../controllers/order")
const {decreaseQuantity} = require("../controllers/product")


router.post("/order/create/:userId",requireSignin,isAuth,addOrderToUserHistory,decreaseQuantity, createOrder)

router.get("/order/list/:userId",requireSignin,isAuth,isAuth,listOrder)
router.get("/order/statusValues/:userId",requireSignin,isAuth,isAuth,getStatusValues)
router.put("/order/:orderId/status/:userId",requireSignin,isAuth,isAuth,updateOrderStatus)




router.param("userId",usuarioPorId)
router.param("orderId",orderById)

module.exports =router;