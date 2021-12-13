var express = require("express");
const Produit = require("../models/produit");
const upload = require('../middleware/storage');
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

//:::::::::::::get by id
router.get('/:id', getProduit, async (req, res) => {
  res.json(res.produit);
});

router.post("/",upload.single('image'), async (req, res, next) => {
  const produit = new Produit({
    produitName: req.body.produitName,
    marge: req.body.marge,
    information: req.body.information,
    prix: req.body.prix,
    produitImage: req.file.filename,
    
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


  if (req.body.produitName != null) {
    res.produit.produitName = req.body.produitName;
  }
  if (req.body.marge != null) {
    res.produit.marge = req.body.marge;
  }
  if (req.body.prix != null) {
    res.produit.prix = req.body.prix;
  }
  if (req.body.information != null) {
    res.produit.information = req.body.information;
  }
  if (req.body.produitImage != null) {
    res.produit.produitImage = req.body.produitImage;
  }
  if (req.body.verified != null) {
    res.produit.verified = req.body.verified;
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
  let produit
  try {
    produit = await Produit.findById(req.params.id);
    if (produit == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message:"2cannot find user" });
  }
  res.produit =produit
  next();
}
module.exports = router;