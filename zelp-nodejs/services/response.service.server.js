module.exports = function(app) {
    app.get("/api/response", findAllResponses);
    app.get("/api/response/:rid", findResponseById);
    app.post("/api/response", createResponse);

    var responseModel = require("../models/response/response.model.server");

    function findResponseById(req, res) {
        var id = req.params["rid"];
        responseModel.findResponseById(id).then(function(response) {
            res.json(response);
        });
    }

    function createResponse(req, res) {
        var response = req.body;
        responseModel.createResponse(response).then(function(response) {
            res.send(response);
        });
    }

    function findAllResponses(req, res) {
        responseModel.findAllResponses().then(function(responses) {
            res.send(responses);
        });
    }
};
