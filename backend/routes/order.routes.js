const express = require('express')
const { createOrderController } = require('../controller/order.controller')
const authMiddleware = require('../middleware/Authorization')
const router = express.Router();

router.post("/createorder",authMiddleware.verifyToken, createOrderController)

module.exports = router