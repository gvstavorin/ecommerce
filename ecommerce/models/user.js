const mongoose = require('mongoose');
const crypto = require('crypto'); 
const { v1: uuidv1 } = require('uuid');


const userSchema = new mongoose.Schema({
   
    nombre:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    },
    correo:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },  
    hashed_contrasena:{
        type:String,
        required:true,
    },  
    info:{
        type:String,
        trim:true,
 
    },  

    salt: String,

    rol :{
      type:Number,
      default:0,     
    },

    historial:{
        type:Array,
        default:[],
    
    }


}, {timestamps:true})





//virtual feed

userSchema.virtual('contrasena')
.set(function(contrasena){
    this._contrasena = contrasena
    this.salt = uuidv1()
    this.hashed_contrasena = this.encryptPassword(contrasena)
})
.get(function(){
    return this._contrasena
})

userSchema.methods = {
    authenticate : function(plainText){
     return this.encryptPassword(plainText) === this.hashed_contrasena;
    },

     encryptPassword:function(contrasena){
        if (!contrasena) return '';
        try {
            return crypto.createHmac('sha1',this.salt)
                      .update(contrasena) 
                      .digest('hex')
        }    

         catch(err){
             return '';
         }
     } 
}


module.exports = mongoose.model("User", userSchema)