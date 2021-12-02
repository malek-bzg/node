const mongoose = require("mongoose");
const factureSchema = new mongoose.Schema({

  //identifant: { type: String, required: true },
 // idfacture: Number,
  montantfacture: String,
  datefacture: Number,
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
  art: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stock'
  }],
  user :{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
});
module.exports = mongoose.model("facture", factureSchema);