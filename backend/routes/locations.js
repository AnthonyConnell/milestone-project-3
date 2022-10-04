const Location = require("../models/locations.js");
const router = require("express").Router();

//location
router.get("/", async (req, res) => {
    try {
        const location = await Location.find();
  
        //send response
        res.status(200).json(location)
    } catch (err) {
        res.status(500).json(err)
    }
  });

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

        //send response
        res.status(200).json(location._id);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router