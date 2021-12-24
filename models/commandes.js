const mongoose = require("mongoose");
const commandesSchema = new mongoose.Schema({
  prod:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prod'
}],
    addresse: {
        type:Number
    },
    total:{
        type:Number,
        required:true
    },
  
    dateCreation: {
        type: String,
        required:true,
        default: new Date().toISOString()
    },
    dateModif: {
        type: String,
        required:true,
        default: new Date().toISOString()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
}   )

module.exports = mongoose.model("commandes", commandesSchema);

