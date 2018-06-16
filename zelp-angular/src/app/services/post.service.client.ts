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
    }).then(response => alert("Post deleted"));
  }
}
