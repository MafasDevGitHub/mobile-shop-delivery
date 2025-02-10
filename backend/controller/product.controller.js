const mongoose = require('mongoose');
const productService = require('../services/product.service');

const controller = {
    productUpload: async (req, res) => {
        try {
            const { productname, brand, price, stock } = req.body;

            const productId = req.user.id;

            const image = req.files?.image ? req.files.image[0].filename : null;

            const details = {
                productname,
                brand,
                price,
                stock,
                image,
                productId
            };

            const data = await productService.uploadProduct(details);

            if (data.user) {
                return res.status(data.statuscode).json({ error: data.error })
            }

            return res.status(201).json({ msg: 'Product uploaded successfully', data });
        }
        catch (error) {
            console.error(err);
            res.status(500).json({ error: 'Error in product upload controller' });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const cleanId = id.replace(/[^a-fA-F0-9]/g, "");

            if (!mongoose.Types.ObjectId.isValid(cleanId)) {
                return res.status(400).json({ error: "Invalid Product ID" });
            }

            const productId = req.user.id;
            const image = req.files?.image ? req.files.image[0].filename : null;
            const { productname, brand, price, stock } = req.body;

            const details = {
                productname,
                brand,
                price,
                stock,
                image,
                productId
            };

            const data = await productService.updateProduct(cleanId, details);
            if (data.error) {
                return res.status(data.statuscode).json({ error: data.error });
            }
            return res.json({ data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error in update controller' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            
            const deletedId = await productService.deleteProduct(id);

            if (deletedId.error) {
                return res.status(deletedId.statuscode).json({ error: deletedId.error });
            }

            res.json({ deletedId });
        }
        catch (error) {
            console.log(error, "Error in delete Product controller");
            res.status(500).json({ error: 'Error in delete Product controller' });
        }
    }

}

module.exports = controller;