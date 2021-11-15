var express = require("express");
const Stock = require("../models/stock");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getStock, (req, res) => {
  res.json(res.stock);
});

router.post("/", async (req, res, next) => {
  const stock = new Stock({
    identifant: req.body.identifant,
    idstock: req.body.idstock,
    qtestock: req.body.qtestock,
    qtemin: req.body.qtemin,
    stockPicture: req.body.stockPicture,
    verified: req.body.verified,
    className: req.body.className,
    parkId: req.body.parkId,
  });
  console.log('hello4',stock);

  try {
    const newStock = await stock.save();

      res.status(201).json({ newStock });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getStock, async (req, res) => {
  try {
    await res.stock.remove();
    res.json({ message: "deleted stock" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getStock,  (req, res) => {
  if (req.body.identifant != null) {
    res.stock.identifant = req.body.identifant;
  }
  if (req.body.idstock != null) {
    res.stock.idstock = req.body.idstock;
  }
  if (req.body.qtestock != null) {
    res.stock.qtestock = req.body.qtestock;
  }
  if (req.body.qtemin != null) {
    res.stock.qtemin = req.body.qtemin;
  }
  if (req.body.stockPicture != null) {
    res.stock.stockPicture = req.body.stockPicture;
  }
  if (req.body.verified != null) {
    res.stock.verified = req.body.verified;
  }
  if (req.body.parkId != null) {
    res.stock.parkId = req.body.parkId;
  }
  try {
    res.stock.save().then((updatedstock) => {
      res.json(updatedstock )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getStock(req, res, next) {
  try {
    stock = await Stock.findById(req.params.id);
    if (stock == null) {
      return res.status(404).json({ message: "cannot find stock" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.stock = stock;
  next();
}

module.exports = router;