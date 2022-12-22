const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    // orderTimeDate: { type: String, required: true },
    storeLocation: { type: String, required: true },
    city: { type: String, required: true },
    storePhone: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Ready to Pickup" },
    cart: []
}, { timestamps: true })

module.exports = mongoose.model("orders", orderSchema);
