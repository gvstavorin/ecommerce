const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const productSchema = new mongoose.Schema({
   
    nombre:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    },
    descripcion:{
        type:String,
        //trim:true,
        required:true,
        maxlength:300,
    },
    precio:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32,
    },
    categoria:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    cantidad:{
        type:Number,
    },
    cantidad:{
        type:Number,
    },
    vendido:{
        type:Number,
        default:0
    },
    foto:{
        data: Buffer,
        contentType: String
       
    },
    envio:{
        required: false,
        type: Boolean
    },
}, {timestamps:true})



module.exports = mongoose.model("Product", productSchema)