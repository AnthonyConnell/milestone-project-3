//dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users.js")
const pinRoute = require("./routes/pins.js")
const petRoute = require("./routes/pets.js")
const locationRoute = require("./routes/locations.js")
const reviewRoute = require("./routes/review.js")

//configuring dotenv
dotenv.config();

//set up post to parse
app.use(express.json());

//connecting to mongo
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to database')
}).catch((err) => console.log(err));

//connecting to users
app.use("/user", userRoute)
//connecting to pins
app.use("/api/pets", petRoute)
app.use("/pins", pinRoute)
// connecting to pets
app.use("/api/pets", petRoute)
//connecting to locations
app.use("/locations", locationRoute)
//connecting to review
app.use("/reviews", reviewRoute)

//creating app
app.listen(5500, () => {
    console.log('backend is running')
});
