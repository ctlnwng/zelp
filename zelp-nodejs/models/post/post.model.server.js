var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
var postModel = mongoose.model("PostModel", postSchema);

function findPostById(pid) {
    return postModel.findById(pid);
}

function createPost(post) {
    return postModel.create(post);
}

function findAllPost() {
    return postModel.find();
}

var api = {
    createPost: createPost,
    findAllPosts: findAllPost,
    findPostById: findPostById
};

module.exports = api;
