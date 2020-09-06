const {Order,CartItem} = require('../models/order')
const {errorHandler} = require ('../helpers/dbErrorHandler')
const User = require ('../models/user');


exports.createOrder = (req,res) => {

        req.body.order.usuario = req.profile
        const order = new Order (req.body.order)
        console.log(order)
        order.save((error,data) => {
              if(error){
                    res.status(400).json({
                          error:errorHandler(error)
                    })
              }

              res.json(data)
        })


}


exports.listOrder= (req, res) =>{

   Order.find().populate("usuario", '_id nombre direccion')
      .sort('-createdAt')
      .exec((error,orders ) =>{
            if(error){
                  res.status(400).json({
                        error:errorHandler(error)
                  })
            }

            res.json({orders}) 

      })
} 

exports.getStatusValues= (req, res) =>{

         res.json(Order.schema.path('status').enumValues);
   } 
   
   
   
 exports.orderById= (req, res,next,id) =>{

      Order.findById(id)
      .populate('productos.producto', 'nombre precio')
      .exec((error,data) =>{
            if(error || !data){
                  res.status(400).json({
                        error: errorHandler(error)
                  })
            }

            req.order = data
            next();
      })


} 



exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};


