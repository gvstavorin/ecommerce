const User = require ('../models/user');

exports.usuarioPorId = (req,res,next,id) => {


     User.findById(id).exec((error,user) =>{

        if(error|| !user){
            return res.status(400).json({
                error:'Usuario no encontrado'
            })
        }

        req.profile = user
         next();
     })
  
}

exports.read =(req,res,next) =>{
  req.profile.hash_contrasena = undefined
  req.profile.salt = undefined
  return res.json(req.profile)

}

exports.update =(req,res,next) =>{

    User.findOneAndUpdate({_id: req.profile._id}, {$set:req.body}, {new:true}, (error, usuario) =>{

        if (error)
        {
            res.status(400).json({
                error : 'No tienes la autorizacion para relizar esta accion.'
            })
        }
        usuario.hash_contrasena = undefined
        usuario.salt = undefined
        res.json (usuario)
    } )
    

}
