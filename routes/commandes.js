var express = require("express");
const commandes = require("../models/commandes");
const Commandes = require("../models/commandes");
var router = express.Router();
const User = require("../models/user");

/* GET command listing. */
router.get ('/', async (req,res) => {
  try {
      const commandes = await Commandes.find().populate('user').populate('prod')
      // const commandet = await Commandes.find().populate('prod')
      if (commandes.length>0){
          res.json({
            commandes: commandes})
      }
      else{
          res.json({message:"nothing to show"})
      }
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
}) 

//                   add commmend++++++++++++++++++++++++++++++++++++
router.get("/:id", getCommandes, (req, res) => {
  res.json(res.commandes);
});

router.post("/", async (req, res, next) => {
  const commandes = new Commandes({
    prod: req.body.prod,
    total: req.body.total,
    addresse: req.body.addresse,
    user: req.body.user
  });
  console.log('hello236',commandes);

  try {
    const newCommandes = await commandes.save();
    const newnewCommandes = await Commandes.findById(newCommandes.id).populate('prod')
    //const newnewnewCommandes = await Commandes.findById(newnewCommandes.id).populate('user')
      res.status(201).json( newCommandes );
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getCommandes, async (req, res) => {
  try {
    await res.commandes.remove();
    res.json({ message: "deleted commandes" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getCommandes,  (req, res) => {
  if (req.body.prod != null) {
    res.commandes.prod = req.body.prod;
  }
  if (req.body.total != null) {
    res.commandes.total = req.body.total;
  }
  if (req.body.addresse != null) {
    res.commandes.addresse = req.body.addresse;
  }
  res.commandes.dateModif = new Date().toISOString()
  
  try {
    res.commandes.save().then((updatedcommandes) => {
      res.json(updatedcommandes )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getCommandes(req, res, next) {
  try {
    commandes = await Commandes.findById(req.params.id);
    if (commandes == null) {
      return res.status(404).json({ message: "cannot find commandes" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.commandes = commandes;
  next();
}




router.get ('/myCommand/:id',getCommandsByUser,async (req,res,next) => {
  res.json({commandes:res.commandes})
})



async function getCommandsByUser  (req,res,next){
  let commandes
  let user
  try {
      user = await User.findById(req.params.id)

      commandes = await Commandes.find({ user: user }).populate('user')
      console.log( commandes);
      if (commandes.length==0){
        return res.status(404).json({message:"pas de command"})
      }
  } catch (error) {
    return res.status(500).json({message:"Id erroné"})

  }
  res.commandes = commandes
  next()
}
module.exports = router;