var mongoose = require("mongoose");
var responseSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PostModel'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RestaurantModel'
        },
        descriptions: String,
        restaurantName: String,
        restaurantURL: String,
        restaurantImageURL: String,
        votes: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel'
            },
            // for convenience, 0 is down-vote and 1 is up-vote
            voteType: Number
        }],
        voteCounts: { type: Number, default: 0 }
    }
)
module.exports = responseSchema;