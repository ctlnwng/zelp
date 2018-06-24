var mongoose = require("mongoose");
var responseSchema = require("./response.schema.server");
var responseModel = mongoose.model("ResponseModel", responseSchema);

// GET

function findAllResponses() {
    return responseModel.find();
}

function findResponseById(responseId) {
    return responseModel.findById(responseId);
}

function findResponsesByPostId(pid) {
    return responseModel.find({ postId: pid });
}

// POST

function createResponse(response) {
    return responseModel.create(response);
}

// DELETE

function deleteResponse(responseId, userId, role) {
    // Admin can delete any response
    if (role == "0") {
        return responseModel.deleteOne({ _id: responseId });
    }
    return responseModel.deleteOne({ _id: responseId, userId: userId });
}

function deleteResponseByPost(pid) {
    return responseModel.remove({postId: pid});
}

// VOTE HELPERS

function decrementVotes(responseId, amt) {
    return responseModel.update(
        {
            _id: responseId
        },
        {
            $inc: { voteCounts: -amt }
        }
    );
}

function incrementVotes(responseId, amt) {
    return responseModel.update(
        {
            _id: responseId
        },
        {
            $inc: { voteCounts: +amt }
        }
    );
}

function findUserVote(responseId, userId) {
    return responseModel.find(
        { _id: responseId, "votes.userId": userId },
        { _id: responseId, votes: { $elemMatch: { userId: userId } } }
    );
}

function addVote(rid, vote) {
    return responseModel.findOneAndUpdate(
        { _id: rid },
        { $push: { votes: vote } },
        { new: true }
    );
}

function updateVote(rid, userId, vote) {
    return responseModel.findOneAndUpdate(
        { _id: rid, "votes.userId": userId },
        { $set: { "votes.$.voteType": vote.voteType } },
        { new: true }
    );
}

function deleteVote(rid, userId) {
    return responseModel.findOneAndUpdate(
        { _id: rid },
        { $pull: { "votes": {userId: userId}}},
        { new: true }
    );
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
    addVote: addVote,
    updateVote: updateVote,
    deleteVote: deleteVote,
    deleteResponseByPost: deleteResponseByPost
};

module.exports = api;
