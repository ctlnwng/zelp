var mongoose = require("mongoose");
var responseSchema = require("./response.schema.server");
var responseModel = mongoose.model("ResponseModel", responseSchema);

function findResponseById(responseId) {
    return responseModel.findById(responseId);
}

function createResponse(response) {
    return responseModel.create(response);
}

function findAllResponses() {
    return responseModel.find();
}

function findResponsesByPostId(pid) {
    return responseModel.find({postId: pid});
}

function deleteResponse(responseId, userId) {
    // FIXME filter out responses first (might not need if findOneAndRemove works
    return responseModel.findOneAndRemove({_id: responseId, userId: userId});
}

function decrementVotes(responseId) {
    return responseModel.update({
        _id: responseId
    }, {
        $inc: {voteCounts: -1}
    });
}

function incrementVotes(responseId) {
    return responseModel.update({
        _id: responseId
    }, {
        $inc: {voteCounts: +1}
    });
}

function findUserVote(responseId, userId) {
    return responseModel.find({_id: responseId, votes: [{userId: userId}]});
}

function addVote(rid, vote) {
    return responseModel.findOneAndUpdate({ _id: rid }, {$push: {votes: vote}});
}

var api = {
    createResponse: createResponse,
    findAllResponses: findAllResponses,
    findResponseById: findResponseById,
    findResponsesByPostId: findResponsesByPostId,
    deleteResponse: deleteResponse,
    decrementVotes: decrementVotes,
    incrementVotes: incrementVotes,
    findUserVote: findUserVote,
    addVote: addVote
};

module.exports = api;
