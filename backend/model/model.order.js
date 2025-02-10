const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    }],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Order = mongoose.model("Order", orderSchema);
export default Order;