const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    // email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, default: 18 },
    address: { type: String },
    city: { type: String, default: 'Raleigh'},
    state: { type: String, default: 'NC'}
})

module.exports = mongoose.model('User', userSchema)