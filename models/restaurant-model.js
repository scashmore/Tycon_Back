const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Restaurant = new Schema(
    {
        restName: { type: String, required: true },
        restCuisine: { type: String, required: true },
        restMenu: { type: Array, required: false },
        restMenuNum: {type: Number, required: false},
        restId: {type: Number, require: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('restaurants', Restaurant)