const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

if(process.env.NODE_ENV === "development"){
    mongoose
        .connect('mongodb://127.0.0.1:27017/restaurants',options)
        .catch(e => {
        console.error('Connection error', e.message)
        })
} else {
    mongoose.connect(uri,options)
        .catch(e => {
        console.error('Connection error', e.message)
        })
}

const db = mongoose.connection

module.exports = db