const jwt = require('jsonwebtoken');
require('dotenv').config();

const genarateToken = async (user) => {
    try {
        console.log("Generating token for user:", user);

        const { email, username, role, _id } = user;
        const payload = { email, username, role, id: _id };

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

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log("Authorization Header ", authHeader)

        const token = authHeader && authHeader.split(' ')[1];
        console.log("Token ", token);

        jwt.verify(token, process.env.JWT_SECRATE_KEY, (err, user) => {
            if (err) {
                console.log("JWT Verification Error: ", err)
                return res.status(403).json("Invalid Token")
            }

            req.user = user;
            console.log("Decoded user:", req.user);

            next();

        })
    }
    catch (error) {
        console.log("Error in verifyToken:", error);
        res.status(500).json("Server error");
    }
}

module.exports = {
    genarateToken,
    verifyToken
}