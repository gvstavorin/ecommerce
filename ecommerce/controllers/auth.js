const User = require('../models/user');
const jwt = require('jsonwebtoken') // nos ayudara a generar el token
const expressJwt = require('express-jwt')// para assegurar la autenticacion
const {errorHandler} = require ('../helpers/dbErrorHandler')



exports.registro = (req , res)=>{
      const user = new User(req.body);
      
     user.save((error,user)=>{
         if(error){
               return res.status(400).json({
                   err:errorHandler(error)
               })
         }
         user.salt= undefined;
         user.hashed_contrasena = undefined;
         res.json({
             user  
         })
     });

}; 

exports.ingresar = (req,res)=>{
  
   // encontrar usuario con correo.
   const { correo, contrasena } = req.body;
   User.findOne({ correo }, (err, user) => {
       if (err || !user) {
           return res.status(400).json({
               error: 'User with that email does not exist. Please signup'
           });
       }
       // si el usario existe verificar que coincida con la contraseña
       // crear autenticacion el modelo del usuario
       if (!user.authenticate(contrasena)) {
           return res.status(401).json({
               error: 'Email and password dont match'
           });
       }
       //generar un token con id de usuario 
       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
       // guardar token como "t" en cookie con fecha limite.
       res.cookie('t', token, { expire: new Date() + 9999 });
       // devolver usuario y token generado al front end
       const { _id, nombre, correo, rol } = user;
       return res.json({ token, user: { _id, correo, nombre, rol } });
   });
}


exports.desconectar = (req, res) =>{

        //limpiar cookie

        res.clearCookie('t')
        res.json({message:"Usuario desconectado "})


}



exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });


 
  exports.isAuth = (req,res,next) =>{
       
        let user = req.profile && req.auth && req.profile.id ==  req.auth._id

        if(!user) {
            return res.status(403).json ({
                error:"Acceso denegado"
            })
        }
        
        next();
  }


  exports.isAdmin = (req,res,next)=>{

     if (req.profile.rol ===0)
         {
             return res.status(403).json({
                 error: "El usuario no tiene los permisos necesarios. Acceso denegado"
             })
         }

         next();
  }