const express = require('express')
const router = express.Router()
const Prod = require('../models/prod')
const multer = require ('../middleware/multer')
const prod = require('../models/prod')

//getting all
router.get ('/', async (req,res) => {
    try {
        const prod = await Prod.find().populate('user')
        if (prod.length>0){
            res.json({ prods: prod})
        }
        else{
            res.json({message:"nothing to show"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 
//getting one
router.get ('/:id',getProd,(req,res) => {
    res.send(res.prod.nom)
})
//creating one
router.post ('/',multer,async (req,res) => {
  
    const prod = new Prod({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        type: req.body.type,
    
        photo : `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
        user: req.body.user
    })
 
    try {
        const newProd = await prod.save()
        const newnewProd = await Prod.findById(newProd.id).populate('user')
        res.status(201).json(newnewProd)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//....................................updating one
router.patch ('/:id',getProd,multer,async (req,res) => {
    if (req.body.nom != null){
        res.prod.nom = req.body.nom
    }
    if (req.body.description != null){
        res.prod.description = req.body.description
    }
    if (req.body.prix != null){
        res.prod.prix = req.body.prix
    }
    if (req.body.photo!= null){
        res.prod.photo=  `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    }
    
    try {
        const updatedProd = await res.prod.save()
        res.json(updatedProd)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})
//...................................deleting one
router.delete ('/:id',getProd,async (req,res) => {
    try {
        await res.prod.remove()
        res.json({message : "Supprime avec succes"})
    } catch (error) {
        res.json({message : error.message})
    }
})
router.get ('/myProds/:id',getProdsByUser,async (req,res) => {
    res.json({prods:res.prods})
})

async function getProd(req,res,next){
    let prod
    try {
        prod = await Prod.findById(req.params.id)
        if (prod == null){
            return res.status(404).json({message : "produit non trouve"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.prod = prod
    next()
}

async function getProdsByUser  (req,res,next){
    let prods
    try {
        prods = await Prod.find({ user: req.params.id }).populate('user')
        if (prods == null){
            res.json({message:"sans produits"})
        }
    } catch (error) {
        res.json({message:error.message})

    }
    res.prods = prods
    next()
}
module.exports = router