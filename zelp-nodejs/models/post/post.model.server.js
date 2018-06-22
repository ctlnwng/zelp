var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
var postModel = mongoose.model("PostModel", postSchema);


function findPostWithInput(input) {
    var regexValue='\.*'+input+'\.*';
    var notSame = postModel.find({title: new RegExp(regexValue, 'i')})

    return notSame;
}

function findPostById(pid) {
    return postModel.findById(pid);
}

function createPost(post) {
    return postModel.create(post);
}

function findAllPosts() {
    return postModel.find();
}

function deletePost(pid, userId) {
    return postModel.deleteOne({ _id: pid, author: userId });
}

function forceDeletePost(pid) {
    return postModel.remove({_id: pid});
}

var api = {
    createPost: createPost,
    findAllPosts: findAllPosts,
    findPostById: findPostById,
    deletePost: deletePost,
    findPostWithInput: findPostWithInput,
    forceDeletePost: forceDeletePost
};

module.exports = api;
