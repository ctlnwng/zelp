module.exports = function(app) {
    app.get("/api/restaurant", findAllRestaurants);
    app.get("/api/restaurant/:rid", findRestaurantById);
    app.post("/api/restaurant", createRestaurant);

    var restaurantModel = require("../models/restaurant/restaurant.model.server");

    function findRestaurantById(req, res) {
        var id = req.params["rid"];
        restaurantModel.findRestaurantById(id).then(function(restaurant) {
            res.json(restaurant);
        });
    }

    function createRestaurant(req, res) {
        var restaurant = req.body;
        restaurantModel.createRestaurant(restaurant).then(function(restaurant) {
            res.send(restaurant);
        });
    }

    function findAllRestaurants(req, res) {
        restaurantModel.findAllRestaurant().then(function(restaurant) {
            res.send(restaurant);
        });
    }
};
