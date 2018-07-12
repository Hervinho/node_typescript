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

// UNIT test begin.

describe("**** Testing model: User ****", function(){
    this.timeout(3000);
    it("should get all users.", function(done) {
      server
      .get(route)
      .expect(200) // THis is HTTP response
      .expect(function(result){
        //console.log('Result : ', result.body.data);
        expect(typeof result.body.success).toBe('boolean');
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.data)).toBe(true);
        //expect(typeof result.body.data[0]).toBe('object');
      })
      .end(done);
    });
  
});