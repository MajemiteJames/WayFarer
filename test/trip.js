import chai from 'chai';
import supertest from 'supertest';
import db from '../server/models/db';
import app from '../server/index';

const { expect } = chai;
const server = supertest(app);

const createAccounts = `CREATE TABLE IF NOT EXISTS trips2(
    id SERIAL PRIMARY KEY,
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    busId INT,
    tripDate DATE NOT NULL,
    fare NUMERIC NOT NULL,
    status TRIP_STATUS NOT NULL DEFAULT 'unstarted',
    FOREIGN KEY(busId) REFERENCES buses(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);`;


const dropAccounts = 'DROP TABLE IF EXISTS trips2;';

const signup = {
  firstName: 'test',
  lastName: 'testAgain',
  email: 'test@test.com',
  password: 'awesometest',
  is_admin: true,
};
const signup2 = {
  firstName: 'tester',
  lastName: 'testerAgain',
  email: 'transact2@test.com',
  password: 'awesometest',
  is_admin: false,
};

const login = {
  email: 'test@test.com',
  password: 'awesometest',
};

const login2 = {
  email: 'hello@postgresql.com',
  password: 'hello1234',
};
describe('Trips', () => {
  before('drop accounts table and then re-create it', async () => {
    await server.post('/api/v1/auth/signup')
      .send(signup);
    await server.post('/api/v1/auth/signup')
      .send(signup2);
  });


  describe('create new trip', () => {
    it('should indicate that token is needed', async () => {
      const response = await server.post('/api/v1/trips')
        .send({
          type: 'current',
        });
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('token is not provided!');
    });
  });

  describe('create new trip', () => {
    it('should indicate that an invalid token has been provided', async () => {
      const response = await server.post('/api/v1/trips')
        .send({
          type: 'current',
        })
        .set('x-access-token', 'fjhghhjklkjhdjgjlkgrdth');
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('invalid token provided');
    });
  });


  describe('create new trip', () => {
    it('should give the right error messages', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const response = await server.post('/api/v1/trips')
        .send({
          type: '',
        })
        .set('x-access-token');
      expect(response.status).to.equal(400);
      const errorMessages = response.body.errors;
    });
  });


  describe('display trip details', () => {
    it('should give the right error message', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const response = await server
        .get('/api/v1/trip/00123456')
        .set('x-access-token');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Endpoint does not exist');
      expect(response.body).to.be.an('object');
    });
  });


  describe('update trip status', () => {
    it('should update trip status', async () => {
      const loginResponse = await server.post('/api/v1/auth/signin')
        .send(login);
      const response = await server.patch('/api/v1/trips/00112233')
        .send({
          status: 'active',
        })
        .set('x-access-token');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Cannot find that trip');
    });
  });
});
