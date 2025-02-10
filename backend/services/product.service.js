const Product = require('../model/model.product');
const mongoose = require('mongoose');

const uploadProduct = async (details) => {
    try {
        const product = new Product(details);
        console.log("Product Comes");

        const data = await product.save();
        if (!data) {
            console.log("Not Stored")

            return { statuscode: 409, error: "product not stored" }
        }
        console.log("Product comes 2")
        return { statuscode: 201, product }
    }
    catch (error) {
        console.log(error);
        return { error: "error in product upload services", statuscode: 500 }
    }
}

const updateProduct = async (id, details) => {
    try {
        const update = await Product.findByIdAndUpdate(
            id,
            { $set: details },
            { new: true }
        )

        if (!update) {
            return { statuscode: 403, error: "Product Not updated" }
        }

        return { statuscode: 200, update }

    }
    catch (error) {
        console.log(error);
        return { error: "error in product update services", statuscode: 500 }
    }
}

const deleteProduct = async (id) => {
    try{
        const deleteData = await Product.findByIdAndDelete(id);
        return deleteData._id
    }
    catch(error){
        console.log(error);
    return {error:"error in delete Product services",statuscode:500}
    }
}

module.exports = {
    uploadProduct,
    updateProduct,
    deleteProduct
}