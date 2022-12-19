const express = require("express");
const router = express.Router();
const app = express();
const Order = require("../models/order.js");

const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            status: "Failed",
            message: "Token is missing"
        })
    }
    try {
        const response = jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "failed",
                    message: "Not a valid token"
                })
            }
            req.loggedIn_email = decoded.data;
            next();
        })
    } catch (err) {
        return res.status(401).json({
            status: "Failed",
            message: "Not Authorized"
        })
    }
}