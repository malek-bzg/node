var express = require("express");
const User = require("../models/user");
var router = express.Router();
var jwt = require ("jsonwebtoken");
const  bcrypt  =  require ( 'bcrypt' ) ;
const Joi = require('joi');
const mongoose = require('mongoose'); 
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const multer = require("../middleware/multer");

const upload = require('../middleware/storage');
/* GET users listing. */
router.get("/", async (_req, res, _next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get ssss
router.get('/:id', getUser,  (_req, res) => {
 // res.json(res.user);
 const token =  res.user.genertok()
 res.send(token);
});

    //.................................   Login    ............................................
    /*
router.post ('/login',getUserByMail,async(req,res)=>{
  if (res.user == null){
      return res.status(404).send("Utilisateur introuvable")
  }
  try {
      if (await Bcrypt.compare(req.body.password,user.password)){
      const token = jwt.sign({username: res.user.email}, "SECRET")
      if (token){
          res.json({token: token,
          user:res.user,
          reponse:"good"})
      }
      }else
      res.json({
          FirstName: res.user.nom,
          LastName: res.user.prenom,
          email: res.user.email,
          password: hashedPass,
         
      })
      
  } catch (error) {
      res.status(400).json({reponse : "mdp incorrect"})
  } 
})
      */
router.post("/log", async (req, res) => {
  console.log(req.body)

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({status:400, message: "1Invalid Email or Password"});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({status:400, message: "2Invalid Email or Password"});

 // const token = user.generateAuthToken();
// const token = jwt.sign({FirstName:user.FirstName ,_id:user._id  },'privet key')
   const token =  user.genertok()
   console.log("you are connected")
   res.status(200).json({message:"you are connected", token: token,user:user});
//res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  return schema.validate(req);
}
/*const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5
  },
  subscriptions: [{type: String}]
});
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({
      identifant : this.identifant,
      FirstName : this.FirstName,
      email: this.email}, 
  "jwtPrivateKey");
}*/
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /*
router.post("/", async (req, res, next) => {
  const {error} = valid (req.body)
  if(error) {
    return res.status(404).send({message:'error.details[0].message');

  }
  let user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(404).send('Invalid mail or password');
  }
const checkPassword = await bcrypt.compare(req.body.password,user.password);
if (!checkPassword) {
  return res.status(404).send('Invalid mail or password');
}
res.send('ok');
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// ........................................................................add...........................................................................................................................
router.post("/" ,async (req, res, _next) => {

  console.log(req.body)
  const user = new User({
   
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    profilePicture:req.body.profilePicture,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
   isadmin: req.body.isadmin,
   ConfirmPass: req.body.ConfirmPass,
   CIN:req.body.CIN,
  
  });
  console.log('-----1-----',user.FirstName);

  try {
    console.log('--------2---------');
    // .............................................................crypt password..................................................................................................................
  const  saltRounds  =  10 ; 
  const  salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password,salt);

//................................................................password cryptee.......................................

    const newUser = await user.save();

//...............................................................  token fl header  .................................................
    const token =  user.genertok()
      res.header('x-auth-token',token).status(201).json({ newUser });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});
//******************************************           Delete         ********************************************************* */
router.delete("/:id",[auth,admin], getUser, async (_req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/********************************************          modif        ***************************************************************/
router.patch("/:id",  getUser,  (req, res) => {
  if (req.body.identifant != null) {
    res.user.identifant = req.body.identifant;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.phoneNumber != null) {
    res.user.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.profilePicture != null) {
    res.user.profilePicture = req.body.profilePicture;
  }
  if (req.body.FirstName != null) {
    res.user.FirstName = req.body.FirstName;
  }
  if (req.body.LastName != null) {
    res.user.LastName = req.body.LastName;
  }
  if (req.body.isadmin != null) {
    res.user.isadmin = req.body.isadmin;
  }
  if (req.body.ConfirmPass != null) {
    res.user.ConfirmPass = req.body.ConfirmPass;
  }
  if (req.body.CIN != null) {
    res.user.CIN = req.body.CIN;
  }
  
  try {
    res.user.save().then((updateduser) => {
      res.json(updateduser )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/*******************************************************************************************/
async function getUser(req, res, next) {
  let user 
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message:"2cannot find user" });
  }
  res.user = user;
  next();
}

async function getUserByMail (req,res,next){
  let user
  try {
      user = await User.findOne({email:req.body.email})
      if (user == null){
          return res.status(404).json({reponse : "mail non trouve"})
      }

  } catch (error) {
      return res.status(500).json({reponse: error.message})
  }
  res.user = user
  next()
}

//....................,authentificateToken
function authentificateToken (req,res,next){
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1]

  if (token == null) return res.status(401).json({reponse:"no token"})

  jwt.verify(token, "SECRET", (err,user)=>{
      if (err) return res.status(403).json({reponse:"token invalide"})
      req.user=user
      next()
  })

}
module.exports = router; 