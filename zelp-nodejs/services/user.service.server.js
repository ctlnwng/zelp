module.exports = function(app) {
    app.get("/api/user", findAllUsers);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.get("/api/profile", profile);
    app.post("/api/logout", logout);
    app.post("/api/login", login);
    app.put("/api/user/:userId", updateUser);
    // FIXME need to change later
    app.get("/api/admin/create", createAdmin);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = require("../models/user/user.model.server");

    function findUserById(req, res) {
        var id = req.params["userId"];
        userModel.findUserById(id).then(function(user) {
            res.json(user);
        });
    }

    function profile(req, res) {
        res.send(req.session["currentUser"]);
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials).then(function(user) {
            req.session["currentUser"] = user;
            res.json(user);
        });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function(user) {
            res.send(user);
        });
    }

    function createAdmin(req, res){
        userModel.findAdmin().then(result => {if(result.length < 1){
            var user = {
                username: "admin",
                password: "admin",
                role: "0"
            }
            userModel.createUser(user).then(function (user) {
                res.send(user);
            });
        } else {
            res.sendStatus(409)
        }})
    }

    function findAllUsers(req, res) {
        if(req.session["currentUser"].role !== "0") {
            res.sendStatus(404);
        }
        userModel.findAllUsers().then(users =>res.send(users));
    }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        var user = req.body;
        var newUser = {
            ...user,
            _id: userId
        };
        if(req.session["currentUser"].role !== "0") {
            req.session["currentUser"] = newUser;
        }
        userModel.updateUser(userId, newUser).then(function(user) {
            res.send(user);
        });
    }

    function deleteUser(req, res) {
        var userId = req.params["userId"];
        userModel.deleteUser(userId).then(response => res.send(response))
    }
};
