const User = require('../model/user.model');
const authMiddleware = require('../middleware/Authorization');

const signup = async (username, email, password) => {
    try {
        const emailIsTaken = await User.emailIsTaken(email);
        if (emailIsTaken) {
            return { error: "Email is already taken", statuscode: 500 }
        }

        const newUser = new User({ username, email, password });
        const user = await newUser.save();
        return user;

    }
    catch (error) {
        console.log("Error in signup service:", error);
        return { error: "Error in signup service:", statuscode: 500 };
    }
}

const signin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, msg: "Invalid Email", statusCode: 409 };
        }

        const token = await authMiddleware.genarateToken(user);
        if (!token) {
            return { success: false, msg: "Token generation failed", statusCode: 500 };
        }

        return { success: true, user, token };
    } catch (error) {
        console.error(error);
        return { success: false, msg: "Something went wrong", statusCode: 500 };
    }
};

module.exports = {
    signup,
    signin
}