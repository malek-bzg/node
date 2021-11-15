var express = require("express");
const facture = require("../models/facture");
const Facture = require("../models/facture");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const facture = await Facture.find();
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getFacture, (req, res) => {
  res.json(res.facture);
});

router.post("/", async (req, res, next) => {
  const facture = new Facture({
    identifant: req.body.identifant,
    idfacture: req.body.idfacture,
    montantfacture: req.body.montantfacture,
    datefacture: req.body.datefacture,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello2',facture);

  try {
    const newFacture = await facture.save();

      res.status(201).json({ newFacture });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getFacture, async (req, res) => {
  try {
    await res.facture.remove();
    res.json({ message: "deleted facture" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getFacture,  (req, res) => {
  if (req.body.identifant != null) {
    res.facture.identifant = req.body.identifant;
  }
  if (req.body.idfacture != null) {
    res.facture.idfacture = req.body.idfacture;
  }
  if (req.body.montantfacture != null) {
    res.facture.montantfacture = req.body.montantfacture;
  }
  if (req.body.datefacture != null) {
    res.facture.datefacture = req.body.datefacture;
  }
  if (req.body.verified != null) {
    res.facture.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.facture.parkId = req.body.parkId;
  }
  try {
    res.facture.save().then((updatedfacture) => {
      res.json(updatedfacture )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getFacture(req, res, next) {
  try {
    facture = await Facture.findById(req.params.id);
    if (facture == null) {
      return res.status(404).json({ message: "cannot find facture" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.facture = facture;
  next();
}

module.exports = router;