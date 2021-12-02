const mongoose = require("mongoose");
const fournisseurSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  idfournisseur: Number,
  codefournisseur: Number,
  profilePicture: String,
  
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("fournisseur", fournisseurSchema);