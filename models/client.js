const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({

  identifant: { type: String, required: true },
  email: String,
  password: String,
  phoneNumber: Number,
  profilePicture: String,
  FirstName: String,
  LastName: String,
  //CIN OU TVA ET UN COPI DU MATRIQULE FISCALE

  verified: {
    type: Boolean,
    default: false
  },
  className: String,
  parkId: Number,
});
module.exports = mongoose.model("client", clientSchema);