module.exports = function(app) {
    app.get("/api/response", findAllResponses);
    app.get("/api/response/:rid", findResponseById);
    app.get("/api/post/:pid/response", findResponseByPostId);
    app.post("/api/post/:pid/response", createResponse);
    app.post("/api/response/:rid/vote", voteResponse);
    app.delete("/api/response/:rid", deleteResponse);

    var responseModel = require("../models/response/response.model.server");

    function findResponseById(req, res) {
        var id = req.params["rid"];
        responseModel.findResponseById(id).then(function(response) {
            res.json(response);
        });
    }

    function findResponseByPostId(req, res) {
        var id = req.params["pid"];
        responseModel.findResponsesByPostId(id)
            .then(responses => res.json(responses))
    }

    function createResponse(req, res) {
        var response = {
            postId: req.params["pid"],
            userId: req.session["currentUser"]._id,
            restaurantId: req.body.restaurantId,
            upVotes: 0,
            downVotes: 0,
            descriptions: req.body.description,
            restaurantName: req.body.restaurantName,
            restaurantURL: req.body.restaurantURL,
            restaurantImageURL: req.body.restaurantImageURL

        };
        responseModel.createResponse(response).then(function(response) {
            res.send(response);
        });
    }

    function findAllResponses(req, res) {
        responseModel.findAllResponses().then(function(responses) {
            res.send(responses);
        });
    }

    function deleteResponse(req, res) {
        var rid = req.params["rid"];

        // FIXME make it work
        responseModel
            .deleteResponse(rid, req.session["currentUser"]._id)
            // After deleting, return all the responses.
            .then(
                response => responseModel.findAllResponses(),
                err => res.status(400).send(err)
            )
            .then(
                responses => res.json(responses),
                err => res.status(400).send(err)
            );
    }

    function voteResponse(req, res) {
        var rid = req.params["rid"];
        var userId = req.session["currentUser"]._id;

        var voteData = req.body
        var voteType = voteData.voteType;

        var newVote = {
            ...voteData,
            userId: userId

        }

        responseModel.findUserVote(rid, userId)
            .then(responses => {
                // already voted before
                if(responses.length > 0) {
                    let savedVotedType = responses[0].votes[0].voteType;

                    if(voteType === savedVotedType) {
                        // same result
                        res.json({conflict: true})
                    } else {
                        if(voteType === 1) {
                            responseModel.incrementVotes(rid, 2)
                                .then(() => responseModel.updateVote(rid, userId, newVote))
                                .then(resp => res.json(resp));
                        } else if (voteType === 0) {
                            responseModel.decrementVotes(rid, 2)
                                .then(() => responseModel.updateVote(rid, userId, newVote))
                                .then(resp => res.json(resp));
                        } else {
                            // most likely unreachable
                            res.sendStatus(404);
                        }
                    }
                } else {
                    // first time voting for the response
                    if(voteType === 1) {
                        responseModel.incrementVotes(rid, 1)
                            .then(() => responseModel.addVote(rid, newVote))
                            .then(resp => res.json(resp))
                    } else if (voteType === 0) {
                        responseModel.decrementVotes(rid, 1)
                            .then(() => responseModel.addVote(rid, newVote))
                            .then(resp => res.json(resp))
                    } else {
                        res.sendStatus(404);
                    }
                }
            })

    }
};
