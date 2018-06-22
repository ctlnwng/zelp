module.exports = function(app) {
    app.get("/api/response", findAllResponses);
    app.get("/api/response/:rid", findResponseById);
    app.get("/api/post/:pid/response", findResponseByPostId);
    app.post("/api/post/:pid/response", createResponse);
    app.post("/api/response/:rid/vote/:type", voteResponse);
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
        var voteType = req.params["type"];
        var voting = req.body

        responseModel.findUserVote(rid, req.session["currentUser"]._id)
            .then(responses => {
                // already voted before
                if(responses.length > 0) {
                    let vote = responses[1].votes.type;
                    if(voteType === vote) {
                        // same result
                        res.send(409)
                    } else {
                        if(vote === 1) {
                            responseModel.incrementVotes(rid)
                                .then(() => console.log("gotta save"))
                        } else if (vote === 0) {
                            responseModel.incrementVotes(rid)
                                .then(() => console.log("gotta save"))
                        } else {
                            res.send(404);
                        }
                    }
                } else {
                    // first time voting for the response
                    if(voteType === 1) {
                        responseModel.incrementVotes()
                            .then(() => console.log("gotta save"))
                    } else if (voteType === 0) {
                        responseModel.incrementVotes()
                            .then(() => console.log("gotta save"))
                    } else {
                        res.send(404);
                    }
                }
            })

    }
};
