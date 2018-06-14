// CRUD operations

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, { username: 1 });
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials
};

module.exports = api;
