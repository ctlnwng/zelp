const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class PostServiceClient {
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
    });
  }
}
