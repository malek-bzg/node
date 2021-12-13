const mongoose = require("mongoose");
const produitSchema = new mongoose.Schema({

  
  produitName: String,
  marge: String,
  information: String,
  prix: String,
  produitImage: String,
  
});
module.exports = mongoose.model("produit", produitSchema);