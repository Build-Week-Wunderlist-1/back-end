const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');

describe('///// AUTH-ROUTER /////', () => {
  describe('// REGISTER //', () => {
    beforeEach(async () => {
      await db('users').where({ username: 'test' }).del();
    });

    it('STATUS CODE: 201', () => {
      const user = {
        username: 'test',
        email: 'test',
        password: 'test',
      };

      return request(server)
        .post('/api/auth/register')
        .send(user)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });

    it('RETURNS: username, password, & email', () => {
      const user = {
        username: 'test',
        email: 'test',
        password: 'test',
      };

      return request(server)
        .post('/api/auth/register')
        .send(user)
        .then((res) => {
          expect(res.body.data[0].id).toBeTruthy();
          expect(res.body.data[0].username).toBeTruthy();
          expect(res.body.data[0].email).toBeTruthy();
          expect(res.body.data[0].password).toBeTruthy();
        });
    });

    it('STATUS CODE: 500', () => {
      const user = {
        username: 'test',
        password: 'test',
      };

      return request(server)
        .post('/api/auth/register')
        .send(user)
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });

    it('RETURNS: Error Message', () => {
      const user = {
        username: 'test',
        password: 'test',
      };

      return request(server)
        .post('/api/auth/register')
        .send(user)
        .then((res) => {
          expect(res.body.errorMessage).toBeTruthy();
        });
    });
  });

  describe('// LOGIN //', () => {
    it('STATUS CODE: 200', () => {
      const userInfo = {
        username: 'tests',
        password: 'tests',
      };

      return request(server)
        .post('/api/auth/login')
        .send(userInfo)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it('RETURNS: Message, Userid, & Token', () => {
      const userInfo = {
        username: 'tests',
        password: 'tests',
      };

      return request(server)
        .post('/api/auth/login')
        .send(userInfo)
        .then((res) => {
          expect(res.body.token).toBeTruthy();
          expect(res.body.message).toBeTruthy();
          expect(res.body.userId).toBeTruthy();
        });
    });

    it('STATUS CODE: 500', () => {
      const userInfo = {
        username: 'tests',
      };

      return request(server)
        .post('/api/auth/login')
        .send(userInfo)
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });

    it('RETURNS: Error Message', () => {
      const userInfo = {
        username: 'tests',
      };

      return request(server)
        .post('/api/auth/login')
        .send(userInfo)
        .then((res) => {
          expect(res.body.errorMessage).toBeTruthy();
        });
    });
  });
});
