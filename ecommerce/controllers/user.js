const User = require ('../models/user');
const {Order} = require('../models/order')

const {errorHandler} = require ('../helpers/dbErrorHandler')

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



exports.addOrderToUserHistory = (req,res,next) => {
    
    let historial = []
     req.body.order.productos.forEach((item) => {
        historial.push({
                 _id:item._id,
                 nombre:item.nombre,
                 descripcion:item.descripcion,
                 categoria:item.categoria,
                 cantidad:item.count,
                 transaction_id:req.body.order.transaction_id,
                 amount:req.body.order.amount
  
           })
     })
  
     
     User.findOneAndUpdate({ _id: req.profile._id }, { $push: { historial: historial } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
        })
  
  }


  exports.purchaseHistory= (req, res)=>{

    Order.find({usuario:req.profile._id})
    .populate('usuario', '_id nombre')
    .sort('-created')
    .exec((error,order)=>{
          if (error){
              res.status(400).json({
                  error:errorHandler(error)
              })
          }

          res.json(order)
    })
  }