var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");
var postModel = mongoose.model("PostModel", postSchema);

// GET

function findAllPosts() {
  return postModel.find();
}

function findPostWithInput(input) {
  var regexValue = ".*" + input + ".*";
  var notSame = postModel.find({ title: new RegExp(regexValue, "i") });

  return notSame;
}

function findPostById(pid) {
  return postModel.findById(pid);
}

// POST

function createPost(post) {
  return postModel.create(post);
}

// DELETE

function deletePost(pid, userId, role) {
    if (role == "0") {
        return postModel.deleteOne({ _id: pid });
    }
  return postModel.deleteOne({ _id: pid, author: userId });
}

var api = {
  createPost: createPost,
  findAllPosts: findAllPosts,
  findPostById: findPostById,
  deletePost: deletePost,
  findPostWithInput: findPostWithInput
};

module.exports = api;
