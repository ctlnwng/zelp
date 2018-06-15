// COMBINED WITH RESTAURANT MODEL FOR NOW

require('dotenv').config({path: '../../.env'})
'use strict';
const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY
const client = yelp.client(apiKey);

export function search(name, location)
{
    client.search({
        term: name,
        location: location
    }).then(response => {
            let restaurant = {
                name: response.jsonBody.businesses[0].name,
                url: response.jsonBody.businesses[0].url,
                image_url: response.jsonBody.businesses[0].image_url
            }
            console.log(restaurant)
        }
    ).catch(e => {
        console.log(e);
    });
}

// search('Four Barrel Coffee', 'san francisco, ca');