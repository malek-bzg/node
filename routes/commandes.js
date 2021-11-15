var express = require("express");
const Commandes = require("../models/commandes");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const commandes = await Commandes.find();
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getCommandes, (req, res) => {
  res.json(res.commandes);
});

router.post("/", async (req, res, next) => {
  const commandes = new Commandes({
    identifant: req.body.identifant,
    idcommande: req.body.idcommande,
    qte: req.body.qte,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello236',commandes);

  try {
    const newCommandes = await commandes.save();

      res.status(201).json({ newCommandes });


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
  if (req.body.identifant != null) {
    res.commandes.identifant = req.body.identifant;
  }
  if (req.body.idcommande != null) {
    res.commandes.idcommande = req.body.idcommande;
  }
  if (req.body.qte != null) {
    res.commandes.qte = req.body.qte;
  }
  
  if (req.body.verified != null) {
    res.commandes.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.commandes.parkId = req.body.parkId;
  }
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

module.exports = router;