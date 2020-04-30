const request = require('supertest');
const server = require('../server.js');
const db = require('../database/dbConfig.js');

describe('auth-router', function(){
    const username = 'Bob';
    const email = 'Bobs email';
    const password = 'Bobs password';

    describe('register endpoint', function(){
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('should return 201 ok', function(){
            return request(server)
            .post('/api/auth/register')
            .send({username, email, password})
            .then(res => {
                expect(res.status).toBe(201);
            }); 
        });

        it('should return a user JSON', function(){
            return request(server)
            .post('/api/auth/register')
            .send({username, email, password})
            .then(res => {
                expect(res.body.username).toBe('Bob');
            }); 
        });

        it('should add the user to the database', async function(){
            const existing = await db('users').where({username: "Bob"});
            expect(existing).toHaveLength(0);

            await request(server)
            .post('/api/auth/register')
            .send({username, email, password})
            .then(res => {
                expect(res.body.username).toBe('Bob');
            }); 

            const inserted = await db('users').where({username: "Bob"});
            expect(inserted).toHaveLength(1);
            
        });
    });

    describe("login endpoint", function(){
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('should return 200 ok', async function(){

            await request(server)
            .post('/api/auth/register')
            .send({username, email, password})
            .then(res => {
                expect(res.body.username).toBe('Bob');
            }); 

            await request(server)
            .post('/api/auth/login')
            .send({username, password})
            .then(res => {
                expect(res.status).toBe(200);
            }); 
        });

        it('should return a token', async function(){

            await request(server)
            .post('/api/auth/register')
            .send({username, email, password})
            .then(res => {
                expect(res.body.username).toBe('Bob');
            }); 

            await request(server)
            .post('/api/auth/login')
            .send({username, password})
            .then(res => {
                expect(res.body.token).toBeTruthy();
            }); 
        });
    });
});