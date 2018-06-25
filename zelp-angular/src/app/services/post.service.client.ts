const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class PostServiceClient {
  // GET

  findAllPosts() {
    return fetch(API_URL + "post").then(response => response.json());
  }
  findPostById(postID) {
    return fetch(API_URL + "post/" + postID).then(response => response.json());
  }
  findPostByUserId(id) {
    return fetch(API_URL + "post/user/" + id).then(response => response.json());
  }

  // POST

  createPost(title, description, restaurant) {
    let post;

    if (isEmpty(restaurant)) {
      post = {
        title: title,
        description: description,
        type: "0"
      };
    } else {
      post = {
        title: title,
        description: description,
        restaurantName: restaurant.name,
        restaurantURL: restaurant.url,
        restaurantImageURL: restaurant.image_url,
        type: "1"
      };
    }

    return fetch(API_URL + "post", {
      body: JSON.stringify(post),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  // DELETE

  deletePost(postId) {
    return fetch(API_URL + "post/" + postId, {
      method: "delete",
      credentials: "include"
    }).then(response => response.json());
  }

  // FAVORITES

  findPostsForUser() {
    return fetch(API_URL + "users/favorite", {
      credentials: "include"
    }).then(function(response) {
      return response.text().then(function(text) {
        return text ? JSON.parse(text) : {};
      });
    });
  }

  //TODO maybe move the functions below to a favorites service
  addToFavorite(postId) {
    return fetch(API_URL + "users/" + postId + "/favorite", {
      method: "post",
      credentials: "include"
    });
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
