const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY || '1234zeesh@encoded';

router.use(express.json());

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                status: "Failed",
                message: "Account already exists"
            })
        }
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds);
        const new_User = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            state: req.body.state,
            district: req.body.district,
            address: req.body.address,
            pincode: req.body.pincode,
            password: hashed_password
        };
        const response = await User.create(new_User);
        res.status(201).json({
            status: "Success",
            message: "Register Successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Account not found, Please Register"
            })
        }
        const response = await bcrypt.compare(password, user.password);
        if (response) {
            const token = jwt.sign({
                data: user.email
            }, PRIVATE_KEY, { expiresIn: '1h' });

            return res.json({
                status: "Success",
                token: token,
                name: user.name
            })
        } else {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
})

module.exports = router;
