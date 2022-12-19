const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");

const tokenAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      status: "Failed",
      message: "Token is missing",
    });
  }
  try {
    const response = jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          status: "failed",
          message: "Not a valid token",
        });
      }
      req.loggedIn_email = decoded.data;
      next();
    });
  } catch (err) {
    return res.status(401).json({
      status: "Failed",
      message: "Not Authorized",
    });
  }
};

//! This is for the read the data -- (READ -- GET Method)
router.get("/", tokenAuth, async (req, res) => {
  try {
    const orders = await Order.find({ email: req.loggedIn_email });
    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (CREATE -- POST Method)
router.post("/", tokenAuth, async (req, res) => {
  try {
    req.body.email = req.loggedIn_email;
    const orders = await Order.create(req.body);
    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (UPDATE -- PUT Method)
router.put("/:id", tokenAuth, async (req, res) => {
  try {
    const data = await Order.findOne({ id: req.params.id });

    //* checking the user email is entered same or not.
    if (data.email !== req.loggedIn_email) {
      return res.status(401).json({
        status: "Failed",
        message: "Not Authorized",
      });
    }

    const updateData = {};
    if (req.body.orderId) {
      updateData.orderId = req.body.orderId;
    }
    if (req.body.orderTimeDate) {
      updateData.orderTimeDate = req.body.orderTimeDate;
    }
    if (req.body.storeLocation) {
      updateData.storeLocation = req.body.storeLocation;
    }

    if (req.body.city) {
      updateData.city = req.body.city;
    }
    if (req.body.storePhone) {
      updateData.storePhone = req.body.storePhone;
    }
    if (req.body.totalItems) {
      updateData.totalItems = req.body.totalItems;
    }
    if (req.body.price) {
      updateData.price = req.body.price;
    }
    const orders = await Order.updateOne({ id: req.params.id }, updateData);
    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//! This is for the read the data -- (DELETE -- DELETE Method)
router.delete("/:id", tokenAuth, async (req, res) => {
  try {
    const data = await Order.findOne({ id: req.params.id });

    //* checking the user email is entered same or not.
    if (data.email !== req.loggedIn_email) {
      return res.status(401).json({
        status: "Failed",
        message: "Not Authorized",
      });
    }
    const orders = await Order.deleteOne({ id: req.params.id });
    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.use("*", (req, res) => {
  res.status(500).send("Invalid Url");
});

module.exports = router;
