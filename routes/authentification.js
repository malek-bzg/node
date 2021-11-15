var express = require("express");
const authentification = require("../models/authentification");
const Authentification = require("../models/authentification");
var router = express.Router();

/* GET users listing. */
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

module.exports = router;