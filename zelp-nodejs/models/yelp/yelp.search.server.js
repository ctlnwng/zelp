// COMBINED WITH RESTAURANT MODEL FOR NOW

'use strict';
const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY
const client = yelp.client(apiKey);

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
    searchRestaurant: searchRestaurant
};
module.exports = api;

// search('Four Barrel Coffee', 'san francisco, ca');