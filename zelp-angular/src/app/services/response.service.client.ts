const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class ResponseServiceClient {
  findResponseById(responseId) {
    return fetch(API_URL + "response/" + responseId).then(response =>
      response.json()
    );
  }

  findResponseByPostId(postId) {
    return fetch(API_URL + "post/" + postId + "/response").then(responses =>
      responses.json()
    );
  }

  createResponse(postId, restaurant, description) {
    console.log("hi")
    console.log(restaurant)
    const response = {
      postId: postId,
      description: description,
      restaurantName: restaurant.name, // FIXME not the ideal way.
      restaurantURL: restaurant.url,
      restaurantImageURL: restaurant.image_url,
    };

    return fetch(API_URL + "post/" + postId + "/response", {
      body: JSON.stringify(response),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }
}
