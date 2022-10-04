const router = require("express").Router();
const Pet = require("../models/pet.js");

router.post("/newpet", async (req, res) => {
    try {
        // create a new pet
        const newPet = new Pet({
            petName: req.body.petName,
            breed: req.body.breed,
            petAge: req.body.petAge,
            photo: req.body.photo
        });

        // save pet
        const pet = await newPet.save();

        //send response
        res.status(200).json(pet._id);
    } catch (err) {
        res.status(500).json(err);
    }
});

//access pet
router.get("/pet", async (req, res) => {
    try {
      //find pet
      const pet = await Pet.findOne({pet: req.body.pet});
      !pet && res.status(400).json("No Pet Found");
    
      //send response
      res.status(200).json({_id: pet._id, review: pet});
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete pet
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletePet = await Pet.deleteOne({_id: Pet._id});

    res.status(200).json(`Successfully deleted ${deletePet}`);
  } catch (err) {
    res.status(500).json(err);
  }
});


  module.exports = router