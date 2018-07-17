import 'mocha';
import app from "../server";
let supertest = require("supertest");
let should = require("should");
let expect = require("expect");

// This agent refers to PORT where the program is running.
let server = supertest(app);

// API URLs.
import { appRoutes } from "../config/routes.config";
import { isArray } from 'util';
let route = appRoutes.api.userBaseUrl;
const testData = { username: "Robo_mongo", password: "robomongo" };
const token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQ3MmRmODRmMWRjOTAwOGMzMmVhYTkiLCJ1c2VybmFtZSI6IlJvYm9fbW9uZ28iLCJwYXNzd29yZCI6IiQyYSQxMCQxOW56azZnWlhMV2RQdkQxV0tIV3llSXZ2S2wuWDNhNGlLQmlOWHdVRHVxRDJCbjJMQjkzUyIsIl9fdiI6MCwiaWF0IjoxNTMxNzMyODA1fQ.1fg0l6ELsMIQoP9KyZYNhC6g1Xtg_0poOdAal3FfSLo";

// UNIT test begin.

describe("**** Testing model: User ****", function(){
    this.timeout(5000);

    it("should not get all users without providing a token first.", function(done) {
      server
      .get(route)
      .expect(401) // THis is HTTP response
      .expect(function(error, result){
        //console.log('Error : ', error);
      })
      .end(done);
    });

    it("should get all users.", function(done) {
      server
      .get(route)
      .set('authorization', token)
      .expect(200) // THis is HTTP response
      .expect(function(result){
        //console.log('Result : ', result.body);
        expect(typeof result.body.success).toBe('boolean');
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.data)).toBe(true);
      })
      .end(done);
    });

    it("should login a user.", function(done) {
      server
      .post(`${route}/login`)
      .send(testData)
      .expect(200) // THis is HTTP response
      .expect(function(result){
        //console.log('Result : ', result.body.data);
        expect(typeof result.body.success).toBe('boolean');
        expect(result.body.success).toBe(true);
        expect(typeof result.body.token).toBe('string');
      })
      .end(done);
    });
  
});