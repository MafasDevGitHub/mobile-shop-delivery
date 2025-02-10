const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/Authorization');
const productController = require('../controller/product.controller');
const upload = require('../configs/Multer');

//Upload Product
router.post("/uploadproduct",authMiddleware.verifyToken, upload.fields([
    {name: 'image', maxCount: 1}
]),productController.productUpload)

//Update Product
router.put("/updateproduct/:id",authMiddleware.verifyToken, upload.fields([
    {name: 'image', maxCount: 1}
]),productController.updateProduct)

module.exports = router;