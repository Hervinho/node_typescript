"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var TestModel = /** @class */ (function () {
    function TestModel() {
        this.data = [
            { id: 1, name: "Bruce Wayne" },
            { id: 2, name: "Clark Kent" },
            { id: 3, name: "Harvey Dent" }
        ];
    }
    ;
    TestModel.prototype.getAll = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve({
                success: true,
                message: "Received data!!!",
                data: _this.data ? _this.data : []
            });
        });
    };
    TestModel.prototype.getFiltered = function (id) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve({
                success: true,
                message: "Received data!!!",
                data: _this.data ? _this.data.find(function (item) { return item.id == id; }) : null
            });
        });
    };
    return TestModel;
}());
exports.default = new TestModel();
