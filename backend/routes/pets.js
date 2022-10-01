const router = require("express").Router();
const Pet = require("../models/pet.js");

router.post("/pets/new", async (req, res) => {
    try {
        // create a new review
        const newPet = new Pet({
            petName: req.body.petName,
            breed: req.body.breed,
            petAge: req.body.petAge,
            photo: req.body.photo
        })

        // save Pet
        const pet = await newPet.save();

        res.status(200).json(pet._id);
    } catch (err) {
        res.status(500).json(err);
    }
})

//access review
router.post("/pet", async (req, res) => {
    try {
      //find review
      const pet = await Pet.findOne({pet: req.body.pet});
      !pet && res.status(400).json("No Pet Found");
    
      //send response
      res.status(200).json({_id: pet._id, review: pet});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router