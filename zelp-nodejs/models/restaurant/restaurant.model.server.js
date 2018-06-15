var mongoose = require("mongoose");
var restaurantSchema = require("./restaurant.schema.server");
var restaurantModel = mongoose.model("RestaurantModel", restaurantSchema);

'use strict';

const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY
const client = yelp.client(apiKey);

function findRestaurantById(rid) {
    return restaurantModel.findById(rid);
}

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}

function findAllRestaurant() {
    return restaurantModel.find();
}

function searchRestaurant(name, location) {
    return client.search({
        term: name,
        location: location
    }).then(response => {
            let restaurant = {
                name: response.jsonBody.businesses[0].name,
                url: response.jsonBody.businesses[0].url,
                image_url: response.jsonBody.businesses[0].image_url
            }
            return restaurant
        }
    ).catch(e => {
        console.log(e);
    });
}


var api = {
    createRestaurant: createRestaurant,
    findAllRestaurant: findAllRestaurant,
    findRestaurantById: findRestaurantById,
    searchRestaurant: searchRestaurant
};
module.exports = api;
