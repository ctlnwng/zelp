var mongoose = require("mongoose");
var responseSchema = mongoose.Schema(
    {
        answerer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        upVotes: Number,
        downVotes: Number
    }
)