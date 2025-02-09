const User = require('../model/user.model');
const userService = require('../services/user.service');

const controller = {
    signup: async (req, res) => {
        try {
            console.log(req.body); 
            const { username, email, password } = req.body; 
    
            const newuser = await userService.signup(username, email, password); 
    
            if (newuser.error) {
                return res.status(newuser.statuscode || 500).json({ error: newuser.error });
            }
    
            res.status(201).json({ newuser }); 
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ "error": "error in sign up controller" });
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body; 
    
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }
    
            const user = await userService.signin(email, password);
    
            if (user.error) {
                return res.status(user.statuscode || 500).json({ error: user.error });
            }
            
            res.status(200).json({ user });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error in sign-in controller" });
        }
    }
    
}

module.exports = controller;