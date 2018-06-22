// CRUD operations

var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {
    username: 1,
    firstName: 1,
    lastName: 1,
    email: 1
  });
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function updateUser(userId, newUser) {
  return userModel.findByIdAndUpdate(userId, newUser);
}

// GOOGLE

function findUserByGoogleId(googleId) {
  return userModel.findOne({ "google.id": googleId });
}

// EXPORT

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
  updateUser: updateUser,
  findUserByGoogleId: findUserByGoogleId
};

module.exports = api;
