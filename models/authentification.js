const mongoose = require("mongoose");
const authentificationSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  userName: String, 
  password: String,
  
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("authentification", authentificationSchema);