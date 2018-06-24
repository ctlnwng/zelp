var mongoose = require("mongoose");
var userSchema = mongoose.Schema(
  {
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    role: { type: String, default: "1" }
  },
  { collection: "user" }
);
module.exports = userSchema;
