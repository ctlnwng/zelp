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

function deleteResponse(responseId, userId) {
    // FIXME filter out responses first (might not need if findOneAndRemove works
    return responseModel.findOneAndRemove({_id: responseId, userId: userId});
}

var api = {
    createResponse: createResponse,
    findAllResponses: findAllResponses,
    findResponseById: findResponseById,
    deleteResponse: deleteResponse
};

module.exports = api;
