const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  idstock: Number,
  qtestock: Number,
  qtemin: Number,
  stockPicture: String,
  
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("stock", stockSchema);