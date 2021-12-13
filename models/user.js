const mongoose = require("mongoose");

var jwt = require ("jsonwebtoken");
const { bool, boolean } = require("joi");



const userSchema = new mongoose.Schema({

  
  email: String,
  password: String,
  isadmin:Boolean,
  phoneNumber: Number,
  profilePicture: String,
  FirstName: String,
  LastName: String,
  ConfirmPass: String,
  CIN: String
 
});

userSchema.methods.genertok = function () {

  const token = jwt.sign({FirstName:this.FirstName ,_id:this._id ,isadmin:this.isadmin },'privet key')
  return token ;
}


module.exports = mongoose.model("user", userSchema);