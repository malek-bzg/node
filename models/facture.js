const mongoose = require("mongoose");
const factureSchema = new mongoose.Schema({


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
  prod: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prod'
  }],
  user :{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
  
});
module.exports = mongoose.model("facture", factureSchema);