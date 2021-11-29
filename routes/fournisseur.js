var express = require("express");
const Fournisseur = require("../models/fournisseur");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const fournisseur = await Fournisseur.find();
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getFournisseur, (req, res) => {
  res.json(res.fournisseur);
});

router.post("/", async (req, res, next) => {
  const fournisseur = new Fournisseur({
    identifant: req.body.identifant,
    idfournisseur: req.body.idfournisseur,
    codefournisseur: req.body.codefournisseur,
    profilePicture: req.body.profilePicture,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello9',fournisseur);

  try {
    const newFournisseur = await fournisseur.save();

      res.status(201).json({ newFournisseur });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getFournisseur, async (req, res) => {
  try {
    await res.fournisseur.remove();
    res.json({ message: "deleted fournisseur" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getFournisseur,  (req, res) => {
  if (req.body.identifant != null) {
    res.fournisseur.identifant = req.body.identifant;
  }
  if (req.body.idfournisseur != null) {
    res.fournisseur.idfournisseur = req.body.idfournisseur;
  }
  if (req.body.codefournisseur != null) {
    res.fournisseur.codefournisseur = req.body.codefournisseur;
  }
  
  if (req.body.profilePicture != null) {
    res.fournisseur.profilePicture = req.body.profilePicture;
  }
  
  if (req.body.verified != null) {
    res.fournisseur.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.fournisseur.parkId = req.body.parkId;
  }
  try {
    res.fournisseur.save().then((updatedfournisseur) => {
      res.json(updatedfournisseur )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getFournisseur(req, res, next) {
  try {
    fournisseur = await Fournisseur.findById(req.params.id);
    if (fournisseur == null) {
      return res.status(404).json({ message: "cannot find fournisseur" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.fournisseur = fournisseur;
  next();
}

module.exports = router;