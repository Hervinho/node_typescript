"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var test_model_1 = require("../models/test.model");
var TestRoute = (function () {
    function TestRoute() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    TestRoute.prototype.routes = function () {
        this.router.get("/", function (req, res) {
            test_model_1.default.getAll()
                .then(function (result) { return res.json(result); });
        });
        this.router.get("/:id", function (req, res) {
            test_model_1.default.getFiltered(req.params.id)
                .then(function (result) { return res.json(result); });
        });
    };
    return TestRoute;
}());
exports.default = new TestRoute().router;
