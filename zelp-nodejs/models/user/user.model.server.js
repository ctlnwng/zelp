var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

// GET

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.find({username: username})
}

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {
    username: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    role: 1
  });
}

function findAdmin() {
  return userModel.find({role: "0"});
}

function findAllUsers() {
  return userModel.find();
}

// CREATE

function createUser(user) {
  return userModel.create(user);
}

// DELETE

function deleteUser(userId) {
  return userModel.remove({ _id: userId });
}

// UPDATE

function updateUser(userId, newUser) {
  return userModel.findByIdAndUpdate(userId, newUser);
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findAdmin: findAdmin
};

module.exports = api;
