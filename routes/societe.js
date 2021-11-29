var express = require("express");
const Societe = require("../models/societe");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const societe = await Societe.find();
    res.json(societe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getSociete, (req, res) => {
  res.json(res.societe);
});

router.post("/", async (req, res, next) => {
  const societe = new Societe({
    identifant: req.body.identifant,
    email: req.body.email,
    password: req.body.password,
    Adress: req.body.Adress,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello13',societe);

  try {
    const newSociete = await societe.save();

      res.status(201).json({ newSociete });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getSociete, async (req, res) => {
  try {
    await res.societe.remove();
    res.json({ message: "deleted Societe" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getSociete,  (req, res) => {
  if (req.body.identifant != null) {
    res.societe.identifant = req.body.identifant;
  }
  if (req.body.email != null) {
    res.societe.email = req.body.email;
  }
  if (req.body.password != null) {
    res.societe.password = req.body.password;
  }
  
  if (req.body.Adress != null) {
    res.societe.Adress = req.body.Adress;
  }
  if (req.body.FirstName != null) {
    res.societe.FirstName = req.body.FirstName;
  }
  if (req.body.LastName != null) {
    res.societe.LastName = req.body.LastName;
  }
  if (req.body.verified != null) {
    res.societe.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.societe.parkId = req.body.parkId;
  }
  try {
    res.societe.save().then((updatedsociete) => {
      res.json(updatedsociete )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getSociete(req, res, next) {
  try {
    societe = await Societe.findById(req.params.id);
    if (societe == null) {
      return res.status(404).json({ message: "cannot find societe" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.societe = societe;
  next();
}

module.exports = router;