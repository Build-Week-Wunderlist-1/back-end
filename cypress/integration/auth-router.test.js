const chance = require('chance');
const request = require('supertest');
const server = require("../../server.js");
const db = require("../../database/dbConfig.js");

describe('auth router test'), function () {
    describe("Register endpoint", function(){
        beforeEach(async () => {
            await db('users').truncate();
        })
        it("should return 201 ok status", function(){

        })
    });
}