var express = require("express");
const Client = require("../models/client");
var router = express.Router();
var jwt = require ("jsonwebtoken");
/* GET users listing. */
router.get("/", async (req, res, next) => {

  try {
    const client = await Client.find();
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getClient, (req, res) => {
  res.json(res.client);
});

router.post("/", async (req, res, next) => {
  const client = new Client({
    identifant: req.body.identifant,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    profilePicture: req.body.profilePicture,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello', client);

  try {
    const newClient = await client.save();

    res.status(201).json({ newClient });


  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: "deleted client" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getClient, (req, res) => {
  if (req.body.identifant != null) {
    res.client.identifant = req.body.identifant;
  }
  if (req.body.email != null) {
    res.client.email = req.body.email;
  }
  if (req.body.password != null) {
    res.client.password = req.body.password;
  }
  if (req.body.phoneNumber != null) {
    res.client.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.profilePicture != null) {
    res.client.profilePicture = req.body.profilePicture;
  }
  if (req.body.FirstName != null) {
    res.client.FirstName = req.body.FirstName;
  }
  if (req.body.LastName != null) {
    res.client.LastName = req.body.LastName;
  }
  if (req.body.verified != null) {
    res.client.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.client.parkId = req.body.parkId;
  }
  try {
    res.client.save().then((updatedclient) => {
      res.json(updatedclient)

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getClient(req, res, next) {
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: "cannot find client" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.client = client;
  next();
}

module.exports = router;