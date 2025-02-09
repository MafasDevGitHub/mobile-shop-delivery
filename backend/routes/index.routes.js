const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/user.routes');

const routes = [
    {
        path: '/account',
        route: userRoutes
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router;