const express=require("express");
const router = express.Router(); 

const {desconectar,registro,ingresar, requireSignin} = require("../controllers/auth")
const {validadorDeRegistro} = require("../validator")


//rutas post!
router.post("/registro", validadorDeRegistro,registro);
router.post("/ingresar", ingresar);

//rutas get
router.get("/desconectar", desconectar);

router.get('/hello',requireSignin, (req,res)=>{
      res.send('hello there');
})



module.exports =router; 

