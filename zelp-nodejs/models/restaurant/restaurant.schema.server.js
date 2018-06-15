var mongoose = require("mongoose");
var restaurantSchema = mongoose.Schema(
    {
        name: String,
        url: String,
        imageUrl: String
    }
)
module.exports = restaurantSchema;