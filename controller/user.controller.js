const User = require('../model/user.model');
const userService = require('../services/user.service');

const controller = {
    signup: async (req, res) => {
        try {
            const { username, email, passoword } = req.body;
            const newuser = await userService.signup(username, email, passoword);

            if (newuser.error) {
                return res.status(newUser.statuscode || 500).json({ error: newUser.error })
            }
            res.status(201).json({ newUser })

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ "error": "error in sign up controller" })
        }
    },

    signin: async (req, res) => {
        try {
            const { email, passoword } = req.body;
            const user = await userService.signin(email, password);

            if (user.error) {
                return res.status(user.statuscode || 500).json({ error: user.error })
            }
            res.status(201).json({ user })

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ "error": "error in sign in controller" })
        }
    }
}

module.exports = controller;