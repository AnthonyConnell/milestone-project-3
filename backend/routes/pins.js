//Dependencies
const router = require("express").Router();
const Pin = require("../models/pin.js");

//create new pin 
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save();

        //send response
        res.status(200).json(savedPin)
    } catch (err) {
        res.status(500).json(err)
    }
});

//get all pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();

        //send response
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
})

//exports
module.exports = router