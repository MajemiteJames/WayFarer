import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server/index';

const {
  expect,
} = chai;
const server = supertest(app);
chai.use(chaiHttp);
const API_PREFIX = '/api/v1/';
const login = {
  email: 'hello@postgresql.com',
  password: 'hello1234',
};
// start

describe('user sign up', () => {
  it('should create a new user', async () => {
    const response = await server.post('/api/v1/signup')
      .send({
        email: 'hello@postgresql1.com',
        password: 'hello1234',
        firstName: 'Bukky',
        lastName: 'Abayomi',
      });
    // expect(response.status).to.equal(201);
    console.log(response);
  });
});

// end
it('Should not register a user with an existing email address', (done) => {
  const newUser = {
    firstName: 'Severus',
    lastName: 'Snape',
    email: 'snape16@hogwarts.com',
    password: 'mischiefmanaged',
    password2: 'mischiefmanaged',
  };
  chai
    .request(app)
    .post(`${API_PREFIX}/signup`)
    .send(newUser)
    .end((err, res) => {
      expect(res.body)
        .to.have.property('status')
        .eql(400);
      expect(res.status).to.equal(400);
      done();
    });
});
describe('user sign up', () => {
  it('should give the corresponding error messages', async () => {
    const response = await server.post('/api/v1/signup')
      .send({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        type: '',
      });
    expect(response.status).to.equal(400);
    const errorMessages = response.body.errors;
    for (let i = 0; i < errorMessages.length; i += 1) {
      expect(errorMessages[0]).to.equal('First name cannot be empty');
      expect(errorMessages[1]).to.equal('First name can only contain letters');
      expect(errorMessages[2]).to.equal('Last name cannot be empty');
      expect(errorMessages[3]).to.equal('Last name can only contain letters');
      expect(errorMessages[4]).to.equal('Email cannot be empty');
      expect(errorMessages[5]).to.equal('Input a valid email address');
    }
  });
});
describe('user sign up', () => {
  it('should give the corresponding error messages', async () => {
    const response = await server.post('/api/v1/signup')
      .send({
        email: 'hello@andelacom',
        firstName: 'Bukky1',
        lastName: 'Abay omi',
        password: 'hello1234',
        type: 'baller',
      });
    expect(response.status).to.equal(400);
    const errorMessages = response.body.errors;
    for (let i = 0; i < errorMessages.length; i += 1) {
      expect(errorMessages[0]).to.equal('First name can only contain letters');
      expect(errorMessages[1]).to.equal('Last name can only contain letters');
      expect(errorMessages[2]).to.equal('Input a valid email address');
    }
  });
});
describe('user sign in', () => {
  it('should successfully sign in a user', async () => {
    const response = await server.post('/api/v1/signin')
      .send({
        email: 'hello@postgresql.com',
        password: 'hello1234',
      });
    // expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data');
    expect(response.body).to.be.an('object');
    expect(response.body.data).to.be.an('array');
  });
});


describe('user sign in', () => {
  it('should give the right error message', async () => {
    const response = await server.post('/api/v1/signin')
      .send({
        email: '',
        password: '',
      });
    expect(response.status).to.equal(400);
    const errorMessages = response.body.errors;
    for (let i = 0; i < errorMessages.length; i += 1) {
      expect(errorMessages[0]).to.equal('Input a valid email address');
      expect(errorMessages[1]).to.equal('Email cannot be empty');
      expect(errorMessages[2]).to.equal('Password cannot be empty');
    }
  });
});

describe('user sign in', () => {
  it('should give the right error message', async () => {
    const response = await server.post('/api/v1/signin')
      .send({
        email: 'sheggy1@andela.com',
        password: 'lsfbeyiw',
      });
    expect(response.status).to.equal(400);
  });
});

describe('user sign in', () => {
  it('should give the right error message', async () => {
    const response = await server.post('/api/v1/signin')
      .send({
        email: 'hello@postgresql.com',
        password: 'ballerz',
      });
    expect(response.status).to.equal(400);
  });
});
