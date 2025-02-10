const Order = require('../model/model.order');

//Create a new order
const createOrder = async (orderData) => {
    try {
        const { user, orderItems, shippingAddress, paymentMethod, totalPrice } = orderData;

        // Create a new order with the provided data
        const newOrder = new Order({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid: false,  
            isDelivered: false,  
        });

        return await newOrder.save();
    }
    catch(error){
        console.log(error);
        return { error: "error in order services", statuscode: 500 }
    }
}

module.exports = {
    createOrder
}