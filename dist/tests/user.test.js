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
var testData = { username: "Robo_mongo", password: "robomongo" };
var token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQ3MmRmODRmMWRjOTAwOGMzMmVhYTkiLCJ1c2VybmFtZSI6IlJvYm9fbW9uZ28iLCJwYXNzd29yZCI6IiQyYSQxMCQxOW56azZnWlhMV2RQdkQxV0tIV3llSXZ2S2wuWDNhNGlLQmlOWHdVRHVxRDJCbjJMQjkzUyIsIl9fdiI6MCwiaWF0IjoxNTMxNzMyODA1fQ.1fg0l6ELsMIQoP9KyZYNhC6g1Xtg_0poOdAal3FfSLo";
// UNIT test begin.
describe("**** Testing model: User ****", function () {
    this.timeout(5000);
    it("should not get all users without providing a token first.", function (done) {
        server
            .get(route)
            .expect(401) // THis is HTTP response
            .expect(function (error, result) {
            //console.log('Error : ', error);
        })
            .end(done);
    });
    it("should get all users.", function (done) {
        server
            .get(route)
            .set('authorization', token)
            .expect(200) // THis is HTTP response
            .expect(function (result) {
            //console.log('Result : ', result.body);
            expect(typeof result.body.success).toBe('boolean');
            expect(result.body.success).toBe(true);
            expect(Array.isArray(result.body.data)).toBe(true);
        })
            .end(done);
    });
    it("should login a user.", function (done) {
        server
            .post(route + "/login")
            .send(testData)
            .expect(200) // THis is HTTP response
            .expect(function (result) {
            //console.log('Result : ', result.body.data);
            expect(typeof result.body.success).toBe('boolean');
            expect(result.body.success).toBe(true);
            expect(typeof result.body.token).toBe('string');
        })
            .end(done);
    });
});
