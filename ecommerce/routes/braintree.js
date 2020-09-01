const express = require('express')
const router = express.Router()
const {requireSignin, isAuth} = require("../controllers/auth")
const {usuarioPorId} = require("../controllers/user")
const {generateToken} = require("../controllers/braintree")

router.get('/braintree/getToken/:userId',requireSignin,isAuth,generateToken)
router.param('userId',usuarioPorId)
module.exports =router;