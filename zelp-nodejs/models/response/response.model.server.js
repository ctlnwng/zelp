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

var api = {
    createResponse: createResponse,
    findAllResponses: findAllResponses,
    findResponseById: findResponseById
};

module.exports = api;
