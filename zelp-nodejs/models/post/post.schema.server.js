var mongoose = require("mongoose");
var postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        title: String,
        description: String,
        responses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ResponseModel'
        }]
    },
    { collection: "post" }
)
module.exports = postSchema;