const Category = require ('../models/category');
const {errorHandler} = require ('../helpers/dbErrorHandler')

exports.create = (req,res,next) => {
      
    const category = new Category(req.body)
    category.save((error,data) =>{

          if(error){
              return res.status(400).json ({
                  error : errorHandler(error)
              })
          }
          res.json({ data })

    })
  
}

exports.categoriaPorId= (req,res,next,id )=>{

  

    Category.findById(id).exec((error,categoria)=>{
            
        if(error || !categoria)
        {
            return res.status(400).json({
                error : 'Categoria no existe'
            })
        }

        req.categoria = categoria
        next ();
     })



}

exports.read = (req,res)=>{

    return res.json(req.categoria);
}

exports.remove=(req,res)=>{
    const categoria = req.categoria
    categoria.nombre  = req.body.nombre
    categoria.remove((error,data)=>{
        if  (error){
            res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({
            message: 'Categoria eliminada'
        })
    })


}
exports.update=(req,res)=>{
    const categoria = req.categoria
    categoria.nombre  = req.body.nombre
    categoria.save((error,data)=>{
        if  (error){
            res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data)
    })
}
exports.list=(req,res)=>{

    Category.find().exec((error , data)=>{

        if (error ){
            return res.status(400).json({
                error : errorHandler(error)
            })
        }

        res.json(data)
    })
    
}


