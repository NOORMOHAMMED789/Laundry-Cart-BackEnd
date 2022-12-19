const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", true);
dotenv.config({ path: "./config.env" });
const Users = require("./models/userSchema");
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

const app = express();
app.use(bodyParser.json());

//! we need to parse the json object received from client and pasre to object
app.use(express.json());

//! This is for the read the data -- (READ -- GET Method)
app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json({
      status: "Success",
      users: users,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (CREATE -- POST Method)
app.post("/api/v1/users", async (req, res) => {
  try {
    const users = await Users.create(req.body);
    res.json({
      status: "Success",
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (UPDATE -- PUT Method)
app.put("/api/v1/users/", async (req, res) => {
  try {
    const users = await Users.updateMany({ id: req.params });
    res.json({
      status: "Success",
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (DELETE -- DELETE Method)
app.delete("/api/v1/users/", async (req, res) => {
  try {
    const users = await Users.deleteOne({ id: req.params });
    res.json({
      status: "Success",
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

app.use("*", (req, res) => {
  res.status(500).send("Invalid Url");
});
app.listen(PORT, () => {
  console.log(`server is running at the ${PORT}`);
});
