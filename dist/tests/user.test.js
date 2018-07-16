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
var route = routes_config_1.appRoutes.api.userBaseUrl;
// UNIT test begin.
describe("**** Testing model: User ****", function () {
    this.timeout(3000);
    it("should get all users.", function (done) {
        server
            .get(route)
            .expect(200) // THis is HTTP response
            .expect(function (result) {
            //console.log('Result : ', result.body.data);
            expect(typeof result.body.success).toBe('boolean');
            expect(result.body.success).toBe(true);
            expect(Array.isArray(result.body.data)).toBe(true);
            //expect(typeof result.body.data[0]).toBe('object');
        })
            .end(done);
    });
});
