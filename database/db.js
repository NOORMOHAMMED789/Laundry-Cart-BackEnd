const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/laundryCart';

const connection = async () => {
    try {
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
        const type = (url == process.env.DATABASE_URL) ? 'remote' : 'local';
        console.log(`connected with ${type} database`);
    } catch(err) {
        console.log("error while connecting with database", err.message);
    }
}

module.exports = connection;