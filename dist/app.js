"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//Database config.
var db_config_1 = require("./config/db.config");
//API URLs
var routes_config_1 = require("./config/routes.config");
//routes.
var test_route_1 = require("./routes/test.route");
var user_route_1 = require("./routes/user.route");
//Import authentication middleware
var auth_1 = require("./auth/auth");
var App = /** @class */ (function () {
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
        //route /test
        this.app.use(routes_config_1.appRoutes.api.testBaseUrl, test_route_1.default);
        //route /users
        this.app.use(routes_config_1.appRoutes.api.userBaseUrl, user_route_1.default);
    };
    ;
    return App;
}());
exports.default = new App().app;
