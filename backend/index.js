//dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users.js")
const pinRoute = require("./routes/pins.js")
const petRoute = require("./routes/pets.js")


//configuring dotenv
dotenv.config();

//set up post to parse
app.use(express.json());

//connecting to mongo
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to database')
}).catch((err) => console.log(err));

//connecting to users
app.use("/api/user", userRoute)
//connecting to pins
app.use("/api/pins", pinRoute)
// connecting to pets
app.use("/api/pets", petRoute)

//creating app
app.listen(5500, () => {
    console.log('backend is running')
});
