const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  storeLocation: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  storePhone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  TotalItem: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

//we will create a new Collection
const Users = mongoose.model("User", userSchema);
module.exports = Users;
