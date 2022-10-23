require('dotenv').config();

const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const connectDB = require('./config/dbConnection')
const verifyJWT = require('./middleware/verifyJWT')
connectDB();

app.use(express.json())

//routes
app.use('/', require('./routes/user'))

app.use(verifyJWT)
app.use('/transaction', require("./routes/budget"))


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDb");
    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
})

