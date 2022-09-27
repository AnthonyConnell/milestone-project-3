//dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//configuring dotenv
dotenv.config();

//connecting to mongo
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to database')
}).catch((err) => console.log(err))

//creating app
app.listen(5500, () => {
    console.log('backend is running')
}) 