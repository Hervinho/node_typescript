"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db_config_1 = require("./config/db.config");
var routes_config_1 = require("./config/routes.config");
var test_route_1 = require("./routes/test.route");
var user_route_1 = require("./routes/user.route");
var auth_1 = require("./auth/auth");
var App = (function () {
    function App() {
        this.auth = auth_1.default.authenticate;
        this.app = express();
        this.config();
        this.routes();
    }
    App.prototype.config = function () {
        mongoose.connect(db_config_1.dbConfig.url);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(this.auth);
    };
    ;
    App.prototype.routes = function () {
        this.app.use(routes_config_1.appRoutes.api.testBaseUrl, test_route_1.default);
        this.app.use(routes_config_1.appRoutes.api.userBaseUrl, user_route_1.default);
    };
    ;
    return App;
}());
exports.default = new App().app;
