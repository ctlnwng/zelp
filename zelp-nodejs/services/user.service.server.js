var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function(app) {
  // var auth = authorized;
  app.get("/api/user", findAllUsers);
  app.get("/api/user/:userId", findUserById);
  app.post("/api/user", createUser);
  app.get("/api/profile", profile);
  app.post("/api/logout", logout);
  app.post("/api/login", login);
  app.put("/api/user/:userId", updateUser);

  var userModel = require("../models/user/user.model.server");

  function findUserById(req, res) {
    var id = req.params["userId"];
    userModel.findUserById(id).then(function(user) {
      res.json(user);
    });
  }

  function profile(req, res) {
    res.send(req.session["currentUser"]);
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function login(req, res) {
    var credentials = req.body;
    userModel.findUserByCredentials(credentials).then(function(user) {
      req.session["currentUser"] = user;
      res.json(user);
    });
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then(function(user) {
      req.session["currentUser"] = user;
      res.send(user);
    });
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers().then(function(users) {
      res.send(users);
    });
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    var newUser = {
      ...user,
      _id: userId
    };
    req.session["currentUser"] = newUser;
    userModel.updateUser(userId, newUser).then(function(user) {
      res.send(user);
    });
  }

  // GOOGLE STUFF

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );

  var googleConfig = {
    clientID:
      "335507456677-v1tfiindo6lbofmr455up0abkop848bi.apps.googleusercontent.com",
    clientSecret: "iM-qrDG-KLxO-fCx8qz2x_Ee",
    callbackURL: "http://localhost:4000/auth/google/callback"
  };

  passport.use(new GoogleStrategy(googleConfig, googleStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function googleStrategy(token, refreshToken, profile, done) {
    console.log(profile);
    // userModel
    //   .findUserByGoogleId(profile.id)
    //   .then(
    //     function(user) {
    //       if (user) {
    //         return done(null, user);
    //       } else {
    //         var newGoogleUser = {
    //           lastName: profile.name.familyName,
    //           firstName: profile.name.givenName,
    //           email: profile.emails[0].value,
    //           google: {
    //             id: profile.id,
    //             token: token
    //           }
    //         };
    //         return userModel.createUser(newGoogleUser);
    //       }
    //     },
    //     function(err) {
    //       if (err) {
    //         return done(err);
    //       }
    //     }
    //   )
    //   .then(
    //     function(user) {
    //       req.session["currentUser"] = user;
    //       return done(null, user);
    //     },
    //     function(err) {
    //       if (err) {
    //         return done(err);
    //       }
    //     }
    //   );

    done(null, profile);
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel.findUserById(user._id).then(
      function(user) {
        done(null, user);
      },
      function(err) {
        done(err, null);
      }
    );
  }

  //   function authorized(req, res, next) {
  //     if (!req.isAuthenticated()) {
  //       res.sendStatus(401);
  //     } else {
  //       next();
  //     }
  //   }
};
