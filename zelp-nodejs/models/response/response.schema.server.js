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
        upVotes: Number,
        downVotes: Number,
        descriptions: String
    }
)
module.exports = responseSchema;