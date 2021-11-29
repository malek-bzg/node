const mongoose = require("mongoose");
const produitSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  phoneNumber: Number,
  produitPicture: String,
  produitName: String,
  information: String,
  prix: String,
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("produit", produitSchema);