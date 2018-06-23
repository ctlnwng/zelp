const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class UserServiceClient {

  findAllUsers() {
    return fetch(API_URL + "user", {
      credentials: "include" // include, same-origin, *omit
    }).then(response => response.json());
  }

  findUserById(userId) {
    return fetch(API_URL + "user/" + userId).then(response => response.json());
  }

  profile() {
    return fetch(API_URL + "profile", {
      credentials: "include" // include, same-origin, *omit
    }).then(function(response) {
      return response.text().then(function(text) {
        return text ? JSON.parse(text) : {};
      });
    });
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

  createUser(username, password, role) {
    const user = {
      username: username,
      password: password,
      role: role
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

  createUserAd(username, password, firstName, lastName, email, role) {
    const user = {
      username: username,
      password: password,
      role: role
    };
    return fetch(API_URL + "user", {
      body: JSON.stringify(user),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  updateUser(id, username, password, first, last, email) {
    const user = {
      username: username,
      password: password,
      firstName: first,
      lastName: last,
      email: email
    };
    return fetch(API_URL + "user/" + id, {
      body: JSON.stringify(user),
      credentials: "include", // include, same-origin, *omit
      method: "put",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  deleteUser(userId) {

  }
}
