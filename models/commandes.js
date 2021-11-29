const mongoose = require("mongoose");
const commandesSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  idcommande: String,
  qte: String,
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("commandes", commandesSchema);