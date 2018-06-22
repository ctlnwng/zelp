var mongoose = require("mongoose");
var userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    google: {
      id: String,
      token: String
    }
  },
  { collection: "user" }
);
module.exports = userSchema;
