const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class UserServiceClient {
  findUserById(userId) {
    return fetch(API_URL + "user/" + userId).then(response => response.json());
  }

  profile() {
    return fetch(API_URL + "profile", {
      credentials: "include" // include, same-origin, *omit
    }).then(response => response.json());
  }

  logout() {
    return fetch(API_URL + "logout", {
      method: "post",
      credentials: "include"
    });
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };

    return fetch(API_URL + "login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch(API_URL + "user", {
      body: JSON.stringify(user),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    });
  }
}
