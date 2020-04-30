const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');

describe('///// LIST-ROUTER /////', () => {
  let token;

  // HAVE TO REGISTER AN ACCOUNT FIRST BEFORE THESE TESTS WILL WORK

  // const register = () => {
  //   const userInfo = {
  //     username: 'tests',
  //     password: 'tests',
  //     email: 'tests@tests.com'
  //   }

  //   return request(server)
  //     .post('/api/auth/register')
  //     .send(userInfo)
  // }

  const login = () => {
    const userInfo = {
      username: 'tests',
      password: 'tests',
    };

    return request(server)
      .post('/api/auth/login')
      .send(userInfo)
      .then((res) => {
        token = res.body.token;
      });
  };

  const deleteTask = () => {
    return db('todo').where({ taskDescription: 'test' }).del();
  };

  // beforeAll(register);
  beforeEach(login);
  afterAll(deleteTask);

  it('GET: LISTS FAIL - NO TOKEN SET TO HEADERS', () => {
    return request(server)
      .get('/api/lists/')
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("We didn't get a token");
      });
  });

  it('GET: LISTS SUCCESS - TOKEN SET TO HEADERS', () => {
    return request(server)
      .get('/api/lists')
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('GET: LIST BY ID - STATUS 200', () => {
    return request(server)
      .get('/api/lists/1')
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('GET: LIST BY ID - STATUS 400', () => {
    return (
      request(server)
        .get('/api/lists/')
        // .set('Authorization', token)
        .then((res) => {
          expect(res.status).toBe(400);
        })
    );
  });

  // need to del this task from the db in before each
  it('POST: ADD TASK SUCCES - STATUS 201', () => {
    const task = {
      taskName: 'test',
      taskDescription: 'test',
    };

    return request(server)
      .post('/api/lists/1')
      .set('Authorization', token)
      .send(task)
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
});
