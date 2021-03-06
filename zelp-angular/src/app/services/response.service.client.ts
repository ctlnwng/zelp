const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class ResponseServiceClient {
  // GET

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

  // POST

  createResponse(postId, restaurant, description) {
    const response = {
      postId: postId,
      description: description,
      restaurantName: restaurant.name, // FIXME not the ideal way.
      restaurantURL: restaurant.url,
      restaurantImageURL: restaurant.image_url
    };

    return fetch(API_URL + "post/" + postId + "/response", {
      body: JSON.stringify(response),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      if (response.status === 409) {
      }
      response.json();
    });
  }

  vote(type, rid) {
    const vote = {
      voteType: type
    };

    return fetch(API_URL + "response/" + rid + "/vote", {
      body: JSON.stringify(vote),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  // DELETE

  deleteResponse(rid) {
    return fetch(API_URL + "response/" + rid, {
      method: "delete",
      credentials: "include"
    }).then(response => response.json());
  }
}
