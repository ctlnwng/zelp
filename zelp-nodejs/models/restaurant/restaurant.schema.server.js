var mongoose = require("mongoose");
var restaurantSchema = mongoose.Schema(
    {
        name: String,
        url: String
    }
)
module.exports = restaurantSchema;