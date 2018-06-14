export class UserServiceClient {
  findUserById(userId) {
    return fetch("http://localhost:4000/api/user/" + userId).then(response =>
      response.json()
    );
  }

  profile() {
    return fetch("http://localhost:4000/api/profile", {
      credentials: "include" // include, same-origin, *omit
    }).then(response => response.json());
  }

  logout() {
    return fetch("http://localhost:4000/api/logout", {
      method: "post",
      credentials: "include"
    });
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };

    return fetch("http://localhost:4000/api/login", {
      method: "post",
      body: JSON.stringify(credentials),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch("http://localhost:4000/api/user", {
      body: JSON.stringify(user),
      credentials: "include", // include, same-origin, *omit
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  // FIXME: made up fetch url for now!!!
  loginUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user/login', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

}
