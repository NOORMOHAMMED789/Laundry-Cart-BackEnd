const products = require("./constants/dataProduct.js");
const Product = require("./models/product.js");

const product_list = async () => {
    try {
        await Product.insertMany(products);
        console.log("product list imported succesfully");
    } catch(err) {
        if (err.code == 11000) return console.log("product list present in database")
        console.log("Error while inserting product list", err.message)
    }
}

module.exports = product_list;