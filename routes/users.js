
var express = require("express");
const User = require("../models/user");
var router = express.Router();
var jwt = require ("jsonwebtoken");
const  bcrypt  =  require ( 'bcrypt' ) ;
const Joi = require('joi');
const mongoose = require('mongoose'); 
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Token = require('../models/Token');

const multer = require("../middleware/multer");
 
const nodemailer = require("nodemailer");





/* GET users listing. */
//....................................




 /**
  * @swagger
 

 * /users:
 *   description: The users managing API
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [usres]
 *     responses:
 *       200:
 *         description: The list users
 *         content:
 *           application/json:

  *       500:
 *         description: user error
 */

 router.get("/", async (_req, res, _next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get user by ID

// get one user

/**
* @swagger
* tags:
*  name: User
*  description: This is for the main User
* /user/{id}:
*  get:
*   tags: [User]
*   summary: this Api used to get one user from database
*   description: this api is used to get one user from database
*   parameters:
*     - in: path
*       name: id
*       description: Must provide  email 
*       schema:
*        type: string
*   responses:
*     '200':
*        description: A successful response
 *     404:
 *       description: The user was not found
*/
router.get('/:id', getUser,  (req, res) => {
  res.json(res.user);
// const token =  res.user.genertok()
 //res.send(token);
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
  console.log(req.body);
 // const { error } = validate(req.body);
 // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({status:400, message: "Invalid Email or Password"});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({status:400, message: "Invalid Email or Password"});

 // const token = user.generateAuthToken();
// const token = jwt.sign({FirstName:user.FirstName ,_id:user._id  },'privet key')
   const token = user.genertok()
   res.status(200).json({ message:"you are connected", token:token, user:user });
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
function validateuser(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    isadmin: Joi.boolean().required(),
    phoneNumber: Joi.string(),
    photo:Joi.string(),
    FirstName: Joi.string(),
    LastName: Joi.string()
  });
  return schema.validate(req);
}


// ........................................................................add...........................................................................................................................

/**
* @swagger 
* tags:
*  name: User
*  description: This is for the main User
* /user:
*  post:
*   tags: [User]
*   summary: Creates a new user.
*   requestBody:
*      content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             email:
*              type: string
*             password:
*              type: string
*             phoneNumber:
*              type: number
*             photo:
*              type: string
*             FirstName:
*              type: string
*             LastName:
*              type: string
*             isadmin:
*              type: boolean

*  responses:
*      201:
*         description: Created
 */
router.post("/",multer,async (req, res, _next) => {

 //
 
 const { error } = validateuser(req.body);
 // if (error) return res.status(400).send(error.details[0].message);
  //let userr = await User.findOne({ email: req.body.email });
  //if ( await User.findOne({ email: req.body.email })) return res.status(400).send({status:400, message: "Invalid Email exist...12.."});
  //const authUser = users.find(user => user.username.toLowerCase() == username.toLowerCase() && user.password == password)
  

  const user = new User({
    
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    photo:`${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    isadmin: req.body.isadmin,
    CIN: req.body.CIN,
  });
 // console.log('hello2',filename);

  try {

    // .............................................................crypt password..................................................................................................................
  const  saltRounds  =  10 ; 
  const  salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password,salt);

//................................................................password cryptee.......................................

    const newUser = await user.save();

//...............................................................  token fl header  .................................................
    const token =  user.genertok()
      res.header('x-auth-token',token).status(201).json({ newUser });
      console.log('x-auth-token',token);

  } catch (error) {
    res.status(400).json({message : error.message});
  }
});
//******************************************           Delete         ********************************************************* */

//delet one user

/**
* @swagger
* tags:
*  name: User
*  description: This is for the main User
* /user/{email}:
*  delete:
*   tags: [User]
*   summary: this Api used to delete user from database
*   description: this api is used to delete  users from database
*   parameters:
*     - in: path
*       name: email
*       description: Must provide  email 
*       schema:
*        type: string
*   responses:
*     200:
*        description: A successful response
*/

router.delete("/:id",[auth,admin], getUser, async (_req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/********************************************          modif        ***************************************************************/

router.patch("/:id", multer, getUser, async (req, res) => {
 
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {

    const  saltRounds  =  10 ; 
    const  salt = await bcrypt.genSalt(saltRounds);
    res.user.password = await bcrypt.hash(req.body.password,salt);
  }
  if (req.body.phoneNumber != null) {
    res.user.phoneNumber = req.body.phoneNumber;
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
  if (req.body.photo!= null) {
    res.user.photo=  `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
  }


  if (req.body.CIN != null) {
    res.user.CIN= req.body.CIN;

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
async function getUser1(req, res, next) {
  console.log(req.params.email)
try {
  user = await User.find({ email: req.params.email });
  if (user == null) {
    return res.status(404).json({ message: "cannot find user" });
  }
} catch (error) {
  return res.status(500).json({ message: err.message });
}
res.user = user[0];
next();
}
//....................,authentificateToken
/*function authentificateToken (req,res,next){
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1]

  if (token == null) return res.status(401).json({reponse:"no token"})

  jwt.verify(token, "SECRET", (err,user)=>{
      if (err) return res.status(403).json({reponse:"token invalide"})
      req.user=user
      next()
  })

}*/

/*******************************    forget pass           ********************** */

router.post('/forgotPassword',getUserByMail, (req, res, next) => {
console.log("aaaaaaa")
  // user is not found into database
  if (!res.user) {
      return res.status(400).send({ msg: 'We were unable to find a user with that email. Make sure your Email is correct!' });
      console.log("1")

  } else {
      var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      var token = new Token({ email: res.user.email, token: seq });
      console.log(seq)

      token.save(function (err) {
          if (err) {
              return res.status(500).send({ msg: err.message });
              console.log("aaaaaaa")

          }

      });

      var smtpTrans = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'dalid7811@gmail.com',
              pass: 'dbiradali321'
          }
      });   

      var mailOptions = {
          from: 'dalid7811@gmail.com', to: res.user.email, subject:
              'Mot de passe oubliè Lost And Found', text: 'Vous recevez cet email car vous (ou quelqu\'n d\'autre) a fait cette demande de mot de passe oubliè.\n\n' +
                  'Merci de cliquer sur le lien suivant ou copier le sur votre navigateur pour completer le processus:\n\n' + 'Le code est :'+ token.token + '\n\n' +
                  'http:\/\/' + req.headers.host + '\/user\/resetPassword\/' + res.user.email + '\/' + token.token
                  + '\n\n Si vous n\'avez pas fait cette requete, veuillez ignorer ce message et votre mot de passe sera le méme.\n'
      };
      // Send email (use credintials of SendGrid)

      //  var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
      smtpTrans.sendMail(mailOptions, function (err) {
        console.log("9999")
          if (err) {
            console.log(seq)
              return res.status(500).send({ msg: err });
         
          }
          else {
              return res.status(200).send({succes:true, 
                  msg:'A reset password  email has been sent to ' + res.user.email + '. It will be expire after one day. If you not get verification Email click on resend token.',
                  token: token.token
                  
              })};

      });

  }

});


router.post('/resetPassword/:email/:token' ,async (req, res, next) => {
Token.findOne({ token: req.params.token }, function (err, token) {
  console.log("11")
  // token is not found into database i.e. token may have expired 
  if (!token) {
      return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
  }
  // if token is found then check valid user 
  else {
      User.findOne({email: req.params.email }, async function (err, user) {
          // not valid user
          if (!user) {
              return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
          } else {

              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(req.body.Password, salt);

              user.save(function (err) {
                  // error occur
                  if (err) {
                      return res.status(500).send({ msg: err.message });
                  }
                  // account successfully verified
                  else {
                      return res.status(200).json({reponse:'Your password has been successfully reset'});
                  }

              })

          }

      });
  }});

});

function mail (req,res,next){
var smtpTrans = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'dalid7811@gmail.com',
      pass: 'dbiradali321'
  }
});


var mailOptions = { from: 'dalid7811@gmail.com', to:"mohamedmelek.chtourou@esprit.tn", subject: 'Account Verification Link', text: 'Hello ' + "user.username" + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user\/confirmation\/' + "user.email" + '\/' + "token.token" + '\n\nThank You!\n' };
smtpTrans.sendMail(mailOptions, function (err) {
  if (err) {
      return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });

  }
  return res.status(200)
      .json(
          {
              msg: 'A verification email has been sent to ' + "user.email" +
                  '. It will be expire after one day. If you not get verification Email click on resend token.',
              user: "user"
          });
});
}
//...................................................

router.get('/confirmation/:email/:token', async (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
      // token is not found into database i.e. token may have expired 
      if (!token) {
          return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
      }
      // if token is found then check valid user 
      else {
          User.findOne({ email: token.email, email: req.params.email }, function (err, user) {
              // not valid user
              if (!user) {
                  return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
              }
              // user is already verified
              else if (user.isVerified) {
                  return res.status(200).send('User has been already verified. Please Login');
              }
              // verify user
              else {
                  // change isVerified to true
                  user.isVerified = true;
                  user.save(function (err) {
                      // error occur
                      if (err) {
                          return res.status(500).send({ msg: err.message });
                      }
                      // account successfully verified
                      else {
                          return res.status(200).send('Your account has been successfully verified');
                      }
                  });
              }
          });
      }

  });

});

module.exports = router;