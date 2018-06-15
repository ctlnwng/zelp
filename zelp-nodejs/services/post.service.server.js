module.exports = function(app) {
    app.get("/api/post", findAllPosts);
    app.get("/api/post/:pid", findPostById);
    app.post("/api/post", createPost);

    var postModel = require("../models/post/post.model.server");

    function findPostById(req, res) {
        var id = req.params["pid"];
        postModel.findPostById(id).then(function(post) {
            res.json(post);
        });
    }

    function createPost(req, res) {
        var post = req.body;
        postModel.createPost(post).then(function(post) {
            res.send(post);
        });
    }

    function findAllPosts(req, res) {
        postModel.findAllPosts().then(function(posts) {
            res.send(posts);
        });
    }
};
