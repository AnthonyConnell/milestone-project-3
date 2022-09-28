const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: { type: String },
    content: { type: String, default: ''},
    stars: { type: Number, required: true}
})

module.exports = mongoose.model('Review', reviewSchema)