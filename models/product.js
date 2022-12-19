const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: String,
    description: String,
    price: Number
})

module.exports = mongoose.model("products", productSchema)