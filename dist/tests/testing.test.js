"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var server_1 = require("../server");
var supertest = require("supertest");
var should = require("should");
var expect = require("expect");
// This agent refers to PORT where the program is running.
var server = supertest(server_1.default);
// API URLs.
var routes_config_1 = require("../config/routes.config");
var route = routes_config_1.appRoutes.api.testBaseUrl;
// UNIT test begin.
describe("**** Testing model: Test ****", function () {
    // #1 should return home page
    it("should get all test data", function (done) {
        server
            .get(route)
            .expect(200) // THis is HTTP response
            .expect(function (result) {
            //console.log('Body : ', result.body);
            expect(typeof result.body.success).toBe('boolean');
            expect(result.body.success).toBe(true);
            expect(typeof result.body.message).toBe('string');
            expect(Array.isArray(result.body.data)).toBe(true);
        })
            .end(done);
    });
});
