const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes/index.routes');

app.use(express.json());
app.use('/api', routes);


const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@mobileshop.um0s5.mongodb.net/?retryWrites=true&w=majority&appName=mobileshop`
mongoose.connect(mongoURI)
    .then(() => {
        console.log("DB Connection Successfull")
    })
    .catch((error) => {
        console.log("DB Connection Error",error)
    })

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})