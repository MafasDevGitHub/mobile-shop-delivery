const asyncHandler = require('express-async-handler')
const { createOrder } = require('../services/order.service')

//Create New Order
const createOrderController = asyncHandler(async(req, res) => {
    try {
        const savedOrder = await createOrder(req.body);
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
})

module.exports = {
    createOrderController
}