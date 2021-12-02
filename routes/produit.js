var express = require("express");
const Produit = require("../models/produit");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const produit = await Produit.find();
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getProduit, (req, res) => {
  res.json(res.produit);
});

router.post("/", async (req, res, next) => {
  const produit = new Produit({
    identifant: req.body.identifant,
    produitPicture: req.body.produitPicture,
    produitName: req.body.produitName,
    information: req.body.information,
    verified: req.body.verified,
    prix: req.body.prix,
    parkId: req.body.parkId,
  });
  console.log('hello100',produit);

  try {
    const newProduit = await produit.save();

      res.status(201).json({ newProduit });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getProduit, async (req, res) => {
  try {
    await res.produit.remove();
    res.json({ message: "deleted produit" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getProduit,  (req, res) => {

  if (req.body.phoneNumber != null) {
        res.produit.phoneNumber = req.body.phoneNumber;
      }
  if (req.body.produitName != null) {
    res.produit.produitName = req.body.produitName;
  }
  if (req.body.information != null) {
    res.produit.information = req.body.information;
  }
  if (req.body.verified != null) {
    res.produit.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.produit.parkId = req.body.parkId;
  }
  try {
    res.produit.save().then((updatedproduit) => {
      res.json(updatedproduit )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getProduit(req, res, next) {
  try {
    Produit = await Produit.findById(req.params.id);
    if (Produit == null) {
      return res.status(404).json({ message: "cannot find produit" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.produit = Produit;
  next();
}

module.exports = router;