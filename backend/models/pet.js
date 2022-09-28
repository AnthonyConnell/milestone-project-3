const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    petName: { type: String, required: true},
    breed: { type: String, default: 'dog' },
    petAge: { type: Number, default: 1 },
    photo: { type: String, default: 'https://place-puppy.com/200x200' }
})

module.exports = mongoose.model('Pet', petSchema)