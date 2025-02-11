const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes')

const routes = [
    {
        path: '/account',
        route: userRoutes
    },
    {
        path: '/product',
        route: productRoutes
    },
    {
        path: '/order',
        route: orderRoutes
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router;