const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors');
const connection = require("./database/db.js");
const product_list = require("./product_list.js");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/user', require('./routes/userRoute'));

connection();

app.listen(PORT, () => console.log("server is running on port", PORT));

product_list();