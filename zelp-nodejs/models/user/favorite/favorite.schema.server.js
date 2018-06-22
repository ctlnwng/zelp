var mongoose = require('mongoose');
var favoriteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostModel'
    }
}, {collection: 'favorites'});
module.exports = favoriteSchema;