const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class PostServiceClient {
  findAllPosts() {
    return fetch(API_URL + "post").then(response => response.json());
  }
  findPostById(postID) {
    return fetch(API_URL + "post/" + postID).then(response => response.json());
  }

  createPost(title, description) {
    const post = {
      title: title,
      description: description
    };

    return fetch(API_URL + "post", {
      body: JSON.stringify(post),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  deletePost(postId) {
    return fetch(API_URL + "post/" + postId, {
      method: "delete"
    }).then(response => response.json());
  }

  //TODO move the functions below to favorite service
  addToFavorite(postId) {
    return fetch(API_URL + 'users/' + postId + '/favorite',{
      method: 'post',
      credentials: 'include'
    });
  }

  findPostsForUser() {
    return fetch(API_URL + 'users/favorite',{
        credentials: 'include'
      }).then(function(response) {
      return response.text().then(function(text) {
        return text ? JSON.parse(text) : {}
      })
    })}
}
