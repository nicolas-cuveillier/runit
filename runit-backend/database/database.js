const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to mongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error))
