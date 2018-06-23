var mongoose = require("mongoose");
var postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel"
    },
    title: String,
    description: String,
    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResponseModel"
      }
    ],
    restaurantName: { type: String, default: "" },
    restaurantURL: { type: String, default: "" },
    restaurantImageURL: { type: String, default: "" },
    type: { type: String, default: "0" }
  },
  { collection: "post" }
);
module.exports = postSchema;
