//dependencies
const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
    try {
        //generate password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            age: req.body.age,
            address: req.body.address,
            city: req.body.city,
            State: req.body.state
        })

        //save user
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router