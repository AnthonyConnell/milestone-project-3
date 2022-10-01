const Location = require("../models/locations.js");
const router = require("express").Router();

//new location
router.post("/newlocation", async (req, res) => {
    try {
        //create new location
        const newLocation = new Location({
            location: req.body.location,
            visitDate: req.body.visitDate,
            coordLat: req.body.coordLat,
            coordLatDir: req.body.coordLatDir,
            coordLong: req.body.coordLong,
            coordLongDir: req.body.coordLongDir
        })

        //save location
        const location = await newLocation.save();

        res.status(200).json(location._id);

    } catch (err) {
        res.status(500).json(err);
    }
});

//location
router.post("/location", async (req, res) => {
    try {
      //find location
      const location = await Location.findOne({location: req.body.location});
      !location && res.status(400).json("Invalid Location");
    
      //send response
      res.status(200).json({_id: location._id, location: location});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router