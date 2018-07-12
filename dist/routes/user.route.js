"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require("jsonwebtoken");
var User = require("../models/user.model");
var jwt_config_1 = require("../config/jwt.config");
var UserRoute = /** @class */ (function () {
    function UserRoute() {
        this.router = express_1.Router();
        this.routes();
        this.UserModel = User.default.UserSchema;
    }
    ;
    UserRoute.prototype.routes = function () {
        var _this = this;
        //get all users.
        this.router.get("/", function (req, res) {
            _this.UserModel.find()
                .then(function (users) {
                res.json({ success: true, data: users });
            });
        });
        //create a user.
        this.router.post("/", function (req, res) {
            if (!req.body.username || !req.body.password) {
                res.json({ success: false, msg: "Please pass username and password." });
            }
            else {
                var newUser = new _this.UserModel({
                    username: req.body.username,
                    password: req.body.password
                });
                // save the user
                newUser.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, msg: "Error creating user", error: err });
                    }
                    res.json({ success: true, msg: "Successful created new user.", id: user._id });
                });
            }
        });
        //user login.
        this.router.post("/login", function (req, res) {
            if (!req.body.username || !req.body.password) {
                res.json({ success: false, msg: "Please pass username and password." });
            }
            else {
                _this.UserModel.findOne({
                    username: req.body.username
                }, function (err, user) {
                    if (err)
                        res.json({ success: false, message: "Error logging in", error: err });
                    if (!user)
                        res.status(401).send({ success: false, msg: "Authentication failed. User not found." });
                    else {
                        // check if password matches
                        user.comparePassword(req.body.password, function (err, isMatch) {
                            if (isMatch && !err) {
                                //var token = jwt.sign(user.tojson(), secret);
                                var token = jwt.sign(user.toObject(), jwt_config_1.secret);
                                res.json({ success: true, token: "JWT " + token });
                            }
                            else
                                res.status(401).send({ success: false, msg: "Authentication failed. Wrong password." });
                        });
                    }
                });
            }
        });
    };
    return UserRoute;
}());
//make sure to export the router, so all routes will be accessible from app.ts
exports.default = new UserRoute().router;
