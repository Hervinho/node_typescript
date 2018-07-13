"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var server_1 = require("../server");
var supertest = require("supertest");
var should = require("should");
var expect = require("expect");
var server = supertest(server_1.default);
var routes_config_1 = require("../config/routes.config");
var route = routes_config_1.appRoutes.api.userBaseUrl;
describe("**** Testing model: User ****", function () {
    this.timeout(3000);
    it("should get all users.", function (done) {
        server
            .get(route)
            .expect(200)
            .expect(function (result) {
            expect(typeof result.body.success).toBe('boolean');
            expect(result.body.success).toBe(true);
            expect(Array.isArray(result.body.data)).toBe(true);
        })
            .end(done);
    });
});
