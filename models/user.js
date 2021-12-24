const mongoose = require("mongoose");

var jwt = require ("jsonwebtoken");
const { bool, boolean } = require("joi");



const userSchema = new mongoose.Schema({

 
  email:{
          type:String,
          required:true,
          unique: true ,
          match: /.+\@.+\..+/
      },
  password: String,
  isadmin:String,
  phoneNumber: Number,
  photo: String,
  FirstName: String,
  LastName: String,
  CIN: Number,
 
});

userSchema.methods.genertok = function () {

  const token = jwt.sign({FirstName:this.FirstName ,_id:this._id ,isadmin:this.isadmin },'privet key')
  return token ;
} 


module.exports = mongoose.model("user", userSchema);