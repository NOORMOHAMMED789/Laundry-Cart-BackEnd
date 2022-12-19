const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userapi");
  console.log("connected successfully to the database");
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const UserSchema = new Schema({
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

  const User = mongoose.model("User", UserSchema);
  try {
    const user = await User.create({
      storeLocation: "Marthalli",
      city: "Bangalore",
      storePhone: 7799222325,
      TotalItem: 20,
      price: 443,
    });
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.disconnect());

module.exports = User;
