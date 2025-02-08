const jwt = require('jsonwebtoken');
require('dotenv').config();

const genarateToken = async (user) => {
    try{
        const id = user._id;
        const email = user.email;
        const username = user.username;
        payload = {id, email, username};
        const token = jwt.sign(payload, process.env.JWT_SECRATE_KEY, {expiresIn: 'id'});
        return token;
    }
    catch(error){
        console.log("Error in token genarate");
        return{error: "error in token genarate", error};
    }
}

module.exports = {
    genarateToken
}