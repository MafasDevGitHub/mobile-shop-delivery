const jwt = require('jsonwebtoken');
require('dotenv').config();

const genarateToken = async (user) => {
    try {
        console.log("Generating token for user:", user);

        const { email, username, _id } = user;
        const payload = { email, username, id: _id };

        if (!process.env.JWT_SECRATE_KEY) {
            throw new Error("SECRET_KEY is undefined. Check your .env file.");
        }

        const token = jwt.sign(payload, process.env.JWT_SECRATE_KEY, { expiresIn: '1d' });

        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.error("Error in token generation:", error);
        return { error: "Error in token generation", details: error.message };
    }
};

module.exports = {
    genarateToken
}