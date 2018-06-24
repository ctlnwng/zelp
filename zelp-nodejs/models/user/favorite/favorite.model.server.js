var mongoose = require('mongoose');
var favoriteSchema = require('./favorite.schema.server');
var favoriteModel = mongoose.model(
    'FavoriteModel',
    favoriteSchema
);

function findFavoriteById(fid) {
    return favoriteModel.findById(fid);
}

function createFavorite(favorite) {
    return favoriteModel.create(favorite);
}

function unFavorite(fid) {
    return favoriteModel.remove({_id: fid});
}

function findPostsForUser(userId) {
    return favoriteModel
        .find({userId: userId})
        .populate('post')
        .exec();
}

function findFavorite(favorite) {
    return favoriteModel.find(favorite);
}

function deleteFavoriteByPost(post) {
    return favoriteModel.remove({post: post});
}


var api = {
    createFavorite: createFavorite,
    unFavorite: unFavorite,
    findFavorite: findFavorite,
    findPostsForUser: findPostsForUser,
    findFavoriteById: findFavoriteById,
    deleteFavoriteByPost: deleteFavoriteByPost
};

module.exports = api;