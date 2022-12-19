const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', userSchema);