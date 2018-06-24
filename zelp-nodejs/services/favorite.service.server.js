module.exports = function(app) {
  app.get("/api/users/favorite", findPostsForUser);
  app.post("/api/users/:postId/favorite", favoriteResponse);

  var favoriteModel = require("../models/user/favorite/favorite.model.server");

  function favoriteResponse(req, res) {
    var currentUser = req.session["currentUser"];

    var userId = currentUser._id;
    var postId = req.params["postId"];

    var favorite = {
      userId: userId,
      post: postId
    };

    favoriteModel.findFavorite(favorite).then(favorites => {
      if (favorites.length === 0) {
        favoriteModel.createFavorite(favorite).then(favorite => {
          res.json(favorite);
        });
      } else {
        //already in favorite
        favoriteModel
          .unFavorite(favorites[0]._id)
          .then(favorite => res.json(favorite));
      }
    });
  }

  function findPostsForUser(req, res) {
    var currentUser = req.session["currentUser"];

    if (currentUser === undefined) {
      res.sendStatus(404);
    } else {
      var userId = currentUser._id;
      favoriteModel.findPostsForUser(userId).then(favorites => {
        res.json(favorites);
      });
    }
  }
};
