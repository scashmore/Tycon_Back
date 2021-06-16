const Restaurant = require('../models/restaurant-model');

createRestaurant = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a restaurant',
        })
    }

    const restaurant = new Restaurant(body)

    if (!restaurant) {
        return res.status(400).json({ success: false, error: err })
    }

    restaurant
        .save()
        .then(() => {
            socket.emit("product-created", restaurant)
            return res.status(201).json({
                success: true,
                id: restaurant._id,
                message: 'Restaurant created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Restaurant not created!',
            })
        })
}

updateRestaurant = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Restaurant not found!',
            })
        }
        restaurant.restName = body.restName
        restaurant.restCuisine = body.restCuisine
        restaurant.restMenu = body.restMenu
        restaurant.restMenuNum = body.restMenuNum
        restaurant.restId = body.restId
        restaurant
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: restaurant._id,
                    message: 'Restaurant updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Restaurant not updated!',
                })
            })
    })
}

deleteRestaurant = async (req, res) => {
    await Restaurant.findOneAndDelete({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!restaurant) {
            return res
                .status(404)
                .json({ success: false, error: `Restaurant not found` })
        }
        socket.emit("product-deleted", restaurant)
        return res.status(200).json({ success: true, data: restaurant })
    }).catch(err => console.log(err))
}

getRestaurantById = async (req, res) => {
    await Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!restaurant) {
            return res
                .status(404)
                .json({ success: false, error: `Restaurant not found` })
        }
        return res.status(200).json({ success: true, data: restaurant })
    }).catch(err => console.log(err))
}

getRestaurants = async (req, res) => {
    await Restaurant.find({}, (err, restaurants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!restaurants.length) {
            return res
                .status(200)
                .json({ success: true,data: [] })
        }
        return res.status(200).json({ success: true, data: restaurants })
    }).catch(err => console.log(err))
}

module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurants,
    getRestaurantById,
}