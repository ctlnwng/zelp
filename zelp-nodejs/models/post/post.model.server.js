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

function deletePost(pid, userId) {
    // FIXME filter out responses first (might not need if findOneAndRemove works
    return postModel.findOneAndRemove({_id: pid, author: userId});
}

var api = {
    createPost: createPost,
    findAllPosts: findAllPost,
    findPostById: findPostById,
    deletePost: deletePost
};

module.exports = api;
