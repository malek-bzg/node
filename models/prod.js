const mongoose = require('mongoose')

const Prodchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type:Number 
    },
    type:{
        type:String,
        required:true
    },
    photo:String,
    dateajout: {
        type: String,
        required:true,
        default: new Date().toISOString()
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
})

module.exports = mongoose.model('prod',Prodchema)