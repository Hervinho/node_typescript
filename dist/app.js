"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Modules
var express = require("express");
var bodyParser = require("body-parser");
//API URLs
var routes_1 = require("./config/routes");
//routes.
var test_route_1 = require("./routes/test.route");
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
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(this.auth);
    };
    ;
    App.prototype.routes = function () {
        //route /test
        this.app.use(routes_1.appRoutes.api.testBaseUrl, test_route_1.default);
    };
    ;
    return App;
}());
exports.default = new App().app;
