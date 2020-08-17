const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
   
    nombre:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    }
    


}, {timestamps:true})





//virtual feed



module.exports = mongoose.model("Category", categorySchema)