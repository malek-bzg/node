const mongoose = require("mongoose");
const societeSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  email: String,
  password: String,
  Adress: String,
  FirstName: String,
  LastName: String,
  verified: {type:Boolean,
default:false
},
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("societe", societeSchema);