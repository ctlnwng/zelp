var mongoose = require("mongoose");
var restaurantSchema = require("./restaurant.schema.server");
var restaurantModel = mongoose.model("RestaurantModel", restaurantSchema);

function findRestaurantById(rid) {
    return restaurantModel.findById(rid);
}

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}

function findAllRestaurant() {
    return restaurantModel.find();
}

var api = {
    createRestaurant: createRestaurant,
    findAllRestaurant: findAllRestaurant,
    findRestaurantById: findRestaurantById
};

module.exports = api;
