module.exports = function(app) {
    // require('dotenv').config({path: '../.env'})
    app.get("/api/restaurant/:name/:loc", searchRestaurant);

    var restaurantModel = require("../models/restaurant/restaurant.model.server");

    function searchRestaurant(req, res) {
        var name = req.params["name"];
        var location = req.params["loc"]
        restaurantModel.searchRestaurant(name, location).then(function(restaurant) {
            res.json(restaurant);
        });
    }
};