import 'mocha';
import app from "../server";
let supertest = require("supertest");
let should = require("should");
let expect = require("expect");

// This agent refers to PORT where the program is running.
let server = supertest(app);

// API URLs.
import { appRoutes } from "../config/routes.config";
let route = appRoutes.api.testBaseUrl;

// UNIT test begin.

describe("**** Testing model: Test ****", function(){

    // #1 should return home page
    it("should get all test data", function(done) {
      server
      .get(route)
      .expect(200) // THis is HTTP response
      .expect(function(result){
        //console.log('Body : ', result.body);
        expect(typeof result.body.success).toBe('boolean');
        expect(result.body.success).toBe(true);
        expect(typeof result.body.message).toBe('string');
        expect(Array.isArray(result.body.data)).toBe(true);
        //expect(typeof result.body.data[0]).toBe('object');
      })
      .end(done);
    });
  
});