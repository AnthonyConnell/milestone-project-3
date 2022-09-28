const mongoose = require('mongoose')

let locationSchema = new mongoose.Schema({
    location: { type: String, default: 'Raleigh' },
    visitDate: { type: Date, default: new Date()},
    coordLat: { type: Number, default: 35.7796 },
    coordLatDir: { type: String, default: 'N' },
    coordLong: { type: Number, default: 78.6382 },
    coordLongDir: { type: String, default: 'W' }
})

module.exports = mongoose.model('Location', locationSchema)