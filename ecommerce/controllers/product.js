const Product = require ('../models/product');
const {errorHandler} = require ('../helpers/dbErrorHandler')
const formidable = require('formidable');
const _ = require ('lodash');
const fs = require ('fs')
const { findOneAndRemove } = require('../models/product');


// crear un nuevo producto.
exports.create = (req,res,next) => {
      
    let form = new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req, (error, fields, files) => {

           if(error){
               return res.status(400).json({
                   error : 'Imagen no pueden ser subida'
               })
           }
            //Validador para los campos de producto.

            const {nombre , descripcion, precio , categoria , cantidad , envio } = fields

            if(!nombre || !descripcion || !precio || !categoria || !cantidad || !envio){

                return res.status(400).json({
                    error : 'Todos los campos son requeridos.'
                })
            }

           let product = new Product(fields)
         
            // 1 KB  = 1000           
            // 1 MB  = 1000000
            if(files.foto){
                   
                if(files.foto.size > 1000000){
                    return res.status(400).json({
                        error : 'La imagen debe ser menor a 1mb'
                    })

                }

                product.foto.data = fs.readFileSync(files.foto.path)
                product.foto.contentType = files.foto.type
            }

          product.save((error, resultado)=> {

            if(error){
                  return res.status(400).json({
                      error : errorHandler(error)
                  })
            }

            res.json(resultado)
          })



    })

  
}

//Busca un producto por ID
exports.productoPorId=(req,res,next,id) => {
  
  Product.findById(id)
   .populate('categoria')
   .exec((error,producto)=>{

    if(error || !producto){
        return res.status(400).json({
            error : 'Producto no encontrado'
        })
    }

    req.producto = producto;
    next();

  })

}
exports.read = (req, res) => {
    
    req.producto.foto = undefined;
    return res.json(req.producto);
};

//Elimina un producto.
exports.remove = (req,res)=>{

   let producto = req.producto
       producto.remove((error, eliminarProducto)=>{
            if(error){
                return res.status(400).json({
                    error :errorHandler(error)
                })
            }
          res.json({
             
             "message" :'Producto eliminado',
          })
   

       })

}

//Modifica un producto
exports.update = (req,res,next) => {
      
    let form = new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req, (error, fields, files) => {

           if(error){
               return res.status(400).json({
                   error : 'Imagen no pueden ser subida'
               })
           }

              //Validador para los campos de producto.

              const {nombre , descripcion, precio , categoria , cantidad , envio } = fields

              if(!nombre || !descripcion || !precio || !categoria || !cantidad || !envio){
  
                  return res.status(400).json({
                      error : 'Todos los campos son requeridos.'
                  })
              }
     

           let producto = req.producto
           producto = _.extend(producto, fields)
         
            // 1 KB  = 1000           
            // 1 MB  = 1000000
            if(files.foto){
                   
                if(files.foto.size > 1000000){
                    return res.status(400).json({
                        error : 'La imagen debe ser menor a 1mb'
                    })

                }

                producto.foto.data = fs.readFileSync(files.foto.path)
                producto.foto.contentType = files.foto.type
            }

            producto.save((error, resultado)=> {

            if(error){
                  return res.status(400).json({
                      error : error
                  })
            }

            res.json(resultado)
          })



    })

  
}




// venta y "llegada  / arrival"

// por venta  =   /products?sortBy=sold&order=desc&limit=4

// por llegada =   /products?sortBy=createdAt&order=desc&limit=4

// si no se envia ningun parametro, todos los productos retornan (?)

exports.list =(req,res) =>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    
    Product.find()
        .select('-foto')
        .populate('categoria')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, productos) => {
            if (error) {
                return res.status(400).json({
                    error: 'Producto no encontrado'
                });
            }
            res.json(productos);
        });

 }


   // listRelated = devolvera los productos relacionados con la categoria  seleccionada .

 exports.listRelated=(req,res)=>{
   
   
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    
    // $ne = no include !    

    Product.find({_id:{$ne:req.producto}, categoria:req.producto.categoria})
            .limit(limit)
            .populate('categoria', '_id nombre')
            .exec((error, productos) => {
                if (error) {
                    return res.status(400).json({
                        error: 'Products not found'
                    });
                }
                res.json(productos);
            });

  
    
}

//Lista las categorias usadas en los productos
exports.listCategories=(req,res)=>{
    Product.distinct('categoria', { }, (error, producto)=>{

        if (error ){

               res.status(400).json({
                   error:'Categoria no encontrada'
               })            
        }
        res.json(producto)
    } )

}

/** 
 *  Listar productos por busqueda
 *  Sera consumido por el front-end 
 * */   
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "precio") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-foto")
        .populate("categoria")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: "Producto no encontrado"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

// obtener foto de producto (?)
exports.photo = (req, res, next) => {
    if (req.producto.foto.data) {
        res.set('Content-Type', req.producto.foto.contentType);
        return res.send(req.producto.foto.data);
    }
    next();
};

exports.listSearch = (req, res) => {
   
    //crear query donde se enviaran los datos de busqueda y la categoria seleccionada en el fron-end
    const query = {}

    // se asigna el dato de busqueda a "query.name"

    if(req.query.search) {
        query.nombre = {$regex:req.query.search, $options:'i'}

     // se asigna el valor de la categoria de la busqueda a "query.categoria"
     
     if (req.query.category && req.query.category != 'All') {
              query.categoria = req.query.category
       }

      //encontrar el producto basado en la query ingresada al
      
      Product.find(query,(err, products) => {
          if(err) {
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }

          res.json(products)
      }).select('-photo')
      
    }




};


exports.decreaseQuantity = (req,res,next) => {

    let bulkOps= req.body.order.productos.map((item)=>{
            return { 
                  updateOne:{
                        filter:{_id:item._id},
                        update:{$inc:{cantidad:-item.count, vendido:+item.count}}
                  }
            }
    })


    Product.bulkWrite(bulkOps,{},(error,products)=>{
        if(error){
            return res.status(400).json({
                error:'No se pudo actulizar el producto'
            })
        }

        next();
    })

}