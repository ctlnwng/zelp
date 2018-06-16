module.exports = function(app) {
    app.get("/api/post", findAllPosts);
    app.get("/api/post/:pid", findPostById);
    app.get("/api/post/contains/:input", findPostWithInput);
    app.post("/api/post", createPost);
    app.delete("/api/post/:pid", deletePost);
    app.delete("/api/post/:pid/admin", forceDeletePost);

    var postModel = require("../models/post/post.model.server");

    function findPostWithInput(req, res){
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
            author: req.session["currentUser"]._id,
            title: req.body.title,
            description: req.body.description,
            responses: []
        };

        postModel.createPost(post).then(function(post) {
            res.send(post);
        });
    }

    function findAllPosts(req, res) {
        postModel.findAllPosts().then(function(posts) {
            res.send(posts);
        });
    }

    function deletePost(req, res) {
        var pid = req.params["pid"];

        // FIXME make it work
        postModel
            .deletePost(pid, req.session["currentUser"]._id)
            // After deleting, return all the responses.
            .then(
                post => postModel.findAllPosts(),
                err => res.status(400).send(err)
            )
            // Reloading the entire post page after deleting.
            .then(
                posts => res.json(posts),
                err => res.status(400).send(err)
            );
    }

    function forceDeletePost(req, res) {
        var pid = req.params["pid"];

        postModel.forceDeletePost(pid)
            .then(
                post => postModel.findAllPosts(),
                err => res.status(400).send(err)
            )
            // Reloading the entire post page after deleting.
            .then(
                posts => res.json(posts),
                err => res.status(400).send(err)
            );;
    }
};
