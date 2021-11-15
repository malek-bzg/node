const mongoose = require("mongoose");
const factureSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  idfacture: Number,
  montantfacture: String,
  datefacture: Number,
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("facture", factureSchema);