import 'mocha';
import app from "server";
let supertest = require("supertest");
let should = require("should");
let expect = require("expect");
//let expect = require("jest-extended");

// This agent refers to PORT where the program is running.
//let server = supertest.agent("http://localhost:4040");
let server = supertest(app);

// UNIT test begin.

describe("**** Unit Testing ****", function(){

    // #1 should return home page
    it("should get all data.", function(done) {
      server
      .get("/test/")
      .expect(200) // THis is HTTP response
      .expect(function(result){
        //console.log('Body : ', result.body);
        expect(typeof result.body.success).toBe('boolean');
        expect(result.body.success).toBe(true);
        expect(typeof result.body.message).toBe('string');
        expect(typeof result.body.data[0]).toBe('object');
      })
      .end(done);
    });
  
});