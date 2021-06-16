const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI;

mongoose
    .connect('mongodb://127.0.0.1:27017/restaurants', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db