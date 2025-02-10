const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/Authorization');
const roleMiddleware = require('../middleware/RoleConfigration');
const productController = require('../controller/product.controller');
const upload = require('../configs/Multer');

//Upload Product
router.post("/uploadproduct",authMiddleware.verifyToken, roleMiddleware.authorizeRole("admin"), upload.fields([
    {name: 'image', maxCount: 1}
]),productController.productUpload)

//Update Product
router.put("/updateproduct/:id",authMiddleware.verifyToken, roleMiddleware.authorizeRole("admin"), upload.fields([
    {name: 'image', maxCount: 1}
]),productController.updateProduct)

//Delete Product
router.delete("/deleteproduct/:id", authMiddleware.verifyToken, roleMiddleware.authorizeRole("admin"), productController.deleteProduct)

module.exports = router;