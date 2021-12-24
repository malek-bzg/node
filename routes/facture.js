var express = require("express");
const facture = require("../models/facture");

var router = express.Router();

const User = require("../models/user");

/* GET command listing. */
router.get ('/', async (req,res) => {
  try {
      const factures = await Factures.find().populate('user').populate('prod')
      // const cacturet = await Cactures.find().populate('prod')
      if (factures.length>0){
          res.json({
            factures: factures})
      }
      else{
          res.json({message:"nothing to show"})
      }
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
}) 

//                   add commmend++++++++++++++++++++++++++++++++++++
router.get("/:id", getFactures, (req, res) => {
  res.json(res.factures);
});

router.post("/", async (req, res, next) => {
  const factures = new Factures({
    prod: req.body.prod,
    total: req.body.total,
    addresse: req.body.addresse,
    user: req.body.user
  });
  console.log('hello236',factures);

  try {
    const newCactures = await cactures.save();
    const newnewCactures = await Cactures.findById(newCactures.id).populate('prod')
    //const newnewnewCactures = await Cactures.findById(newnewCactures.id).populate('user')
      res.status(201).json( newCactures );
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getCactures, async (req, res) => {
  try {
    await res.cactures.remove();
    res.json({ message: "deleted cactures" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getCactures,  (req, res) => {
  if (req.body.prod != null) {
    res.cactures.prod = req.body.prod;
  }
  if (req.body.total != null) {
    res.cactures.total = req.body.total;
  }
  if (req.body.addresse != null) {
    res.cactures.addresse = req.body.addresse;
  }
  res.cactures.dateModif = new Date().toISOString()
  
  try {
    res.cactures.save().then((updatedcactures) => {
      res.json(updatedcactures )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getCactures(req, res, next) {
  try {
    cactures = await Cactures.findById(req.params.id);
    if (cactures == null) {
      return res.status(404).json({ message: "cannot find cactures" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.cactures = cactures;
  next();
}




router.get ('/myCommand/:id',getCommandsByUser,async (req,res,next) => {
  res.json({cactures:res.cactures})
})



async function getCommandsByUser  (req,res,next){
  let cactures
  let user
  try {
      user = await User.findById(req.params.id)

      cactures = await Cactures.find({ user: user }).populate('user')
      console.log( cactures);
      if (cactures.length==0){
        return res.status(404).json({message:"pas de command"})
      }
  } catch (error) {
    return res.status(500).json({message:"Id erroné"})

  }
  res.cactures = cactures
  next()
}
module.exports = router;