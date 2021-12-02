var express = require("express");
const authentification = require("../models/authentification");
var router = express.Router();
var jwt = require ("jsonwebtoken");
const  bcrypt  =  require ( 'bcrypt' ) ; 
const Joi = require('joi')
const _ = require('lodash')
// const {User} = require("../models/user");
const { JSONCookie } = require("cookie-parser");
const user = require("../models/user");
//const { User } = require("../Models/user");


/********************************************* if(error) {
    return res.status(404).send({message:'error.details[0].message'});

  }  let user = await User.findOne({email: req.body.email});*/
/*
router.post("/", async (req, res, next) => {
  const {error} = valid (req.body)
 
 
getUserByMail
const use = res.user;
  if (!user) {
    return res.status(404).send('Invalid mail or password');
  }
const checkPassword = await bcrypt.compare(req.body.password,user.password);
if (!checkPassword) {
  return res.status(404).send('Invalid mail or password');
}
res.send('ok');
});

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

function valid(req) {
  const schema = {
    email : Joi.string().min(3),
    password : Joi.string().min(1).max(255).required()

  }
  return Joi.valid(req,schema)
}

// email : Joi.string().min(3).max(255).required().email(),


















//................................
router.get("/", async (req, res, next) => {
  try {
    const authentification = await Authentification.find();
    res.json(authentification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getAuthentification, (req, res) => {
  res.json(res.authentification);
});
/*//*.........................................!!!!!!!!!!!!!!!!!!!!!!!!!!!!....................
router.post("/", async (req, res, next) => {
  const authentification = new Authentification({
    identifant: req.body.identifant,
    userName: req.body.userName,
    password: req.body.password,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello777',authentification);

  try {
    const newAuthentification = await authentification.save();

      res.status(201).json({ newAuthentification });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});
*//*
router.delete("/:id", getAuthentification, async (req, res) => {
  try {
    await res.authentification.remove();
    res.json({ message: "deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getAuthentification,  (req, res) => {
  if (req.body.identifant != null) {
    res.authentification.identifant = req.body.identifant;
  }
  if (req.body.password != null) {
    res.authentification.password = req.body.password;
  }
  if (req.body.userName != null) {
    res.authentification.userName = req.body.userName;
  }
  if (req.body.verified != null) {
    res.authentification.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.authentification.parkId = req.body.parkId;
  }
  try {
    res.authentification.save().then((updateduser) => {
      res.json(updateduser )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getAuthentification(req, res, next) {
  try {
    authentification = await Authentification.findById(req.params.id);
    if (authentification == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.authentification = authentification;
  next();
}

module.exports = router;*/
// login
/*router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({status:400, message: "Invalid Email or Password"});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({status:400, message: "Invalid Email or Password"});

  const token = user.generateAuthToken();
  res.status(200).send({status:200, data: token, message: "User Loggedin Succesfully"});
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  return schema.validate(req);
}
*/
module.exports = router;