const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class RestaurantServiceClient {

  getRestaurant(name, location) {
    console.log(API_URL + 'restaurant/' + name + '/' + location)
    return fetch(API_URL + 'restaurant/' + name + '/' + location)
      .then(response => response.json());
  }
}
