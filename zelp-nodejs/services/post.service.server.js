module.exports = function(app) {
    app.get("/api/post", findAllPosts);
    app.get("/api/post/:pid", findPostById);
    app.get("/api/post/contains/:input", findPostWithInput);
    app.post("/api/post", createPost);
    app.delete("/api/post/:pid", deletePost);

    var postModel = require("../models/post/post.model.server");
    var favModel = require("../models/user/favorite/favorite.model.server");
    var responseModel = require("../models/response/response.model.server");

    function findAllPosts(req, res) {
        postModel.findAllPosts().then(function(posts) {
            res.send(posts);
        });
    }

    function findPostWithInput(req, res) {
        var input = req.params["input"];
        postModel.findPostWithInput(input).then(function(posts) {
            res.send(posts);
        });
    }

    function findPostById(req, res) {
        var id = req.params["pid"];
        postModel.findPostById(id).then(function(post) {
            res.json(post);
        });
    }

    function createPost(req, res) {
        var post = {
            ...req.body,
            author: req.session["currentUser"]._id,
            responses: []
        };

        postModel.createPost(post).then(function(post) {
            res.send(post);
        });
    }

    function deletePost(req, res) {
        var pid = req.params["pid"];
        var user = req.session["currentUser"]

        postModel
            .deletePost(pid, user._id, user.role)
            .then(posts => {if (posts.n > 0) {
                favModel.deleteFavoriteByPost(pid);
                responseModel.deleteResponseByPost(pid);
                res.json(posts);
            } else {
                res.json({ conflict: true });
            }}, err => res.sendStatus(400));
    }
};
