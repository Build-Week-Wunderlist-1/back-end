const request = require('supertest');
const server = require('../server.js');

describe('users-router', function(){
    
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiQ2hhcmxpZSIsInVzZXJlbWFpbCI6IkNoYXJsaWVAQ29vbC5jb20iLCJpYXQiOjE1ODc4NDY5NjcsImV4cCI6MTU4OTA1NjU2N30.aL57ivyXiPaQ1SCN90JhL_5YifRGs-fPhGQzEgF8ZmM';

    describe('GET users endpoint', function(){
        it('should have length 1', function(){
            return request(server)
            .get('/api/users')
            .set('Authorization', token)
            .then(res => {
                expect(res.body).toHaveLength(0);
            })
        })
    })
});