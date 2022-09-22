/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {} from 'mocha';
import app from '../../src/index';
import { expect } from 'chai';
import HttpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';
import TestHelper from '../helpers/test.helper';
import { User } from '../../src/constants/user.messages';

const database = new TestHelper();

const user = {
  firstName: 'some',
  lastName: 'person',
  email: 'some.person@gmail.com',
  password: 'someperson'
};

const login = {
  email: 'some.person@gmail.com',
  password: 'someperson'
};

const data = {
  firstName: 'some',
  lastName: 'other person',
  email: 'some.other.person@gmail.com',
  password: 'someperson'
};

let token, id;

describe('User Controller APIs Test', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await database.connect();
    }
  });

  before((done) => {
    request(app.getApp())
      .post('/api/v1/account/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        done();
      });
  });

  before((done) => {
    request(app.getApp())
      .post('/api/v1/account/login')
      .type('form')
      .send(login)
      .end((err, res) => {
        expect(res.header.authorization).to.be.an('string');
        token = res.header.authorization;
        id = res.body.data._id;
        done();
      });
  });

  after(async () => {
    await database.close();
  });

  describe('POST /account/register', () => {
    it('should return status code of 500 when data is invalid', (done) => {
      request(app.getApp())
        .post('/api/v1/account/register')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });

    it('should return status code of 201 user when data is valid', (done) => {
      request(app.getApp())
        .post('/api/v1/account/register')
        .type('form')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('should return status code of 409 if user exists', (done) => {
      request(app.getApp())
        .post('/api/v1/account/register')
        .type('form')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
          done();
        });
    });
  });

  describe('POST /account/login', () => {
    it('should return status code of 500 when data is invalid', (done) => {
      request(app.getApp())
        .post('/api/v1/account/login')
        .send('')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });

    it('should return status code of 409 with incorrect credentials', (done) => {
      const user = { ...login };
      user.email = 'some@gmail.com';
      request(app.getApp())
        .post('/api/v1/account/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
          expect(res.body.code).to.be.equal(HttpStatus.CONFLICT);
          expect(res.body.message).to.be.equal(User.USER_INVALID);
          done();
        });
    });

    it('should retrun a token when user has successfully logged in', (done) => {
      request(app.getApp())
        .post('/api/v1/account/login')
        .send(login)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          expect(res.body.data).to.be.an('object');
          expect(res.header.authorization).to.be.an('string');
          done();
        });
    });
  });

  describe('GET /account', () => {
    it('should not return all user accounts and return 400 when no token is present', (done) => {
      request(app.getApp())
        .get('/api/v1/account')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });

    it('should return all user accounts and return 200 when token is present', (done) => {
      request(app.getApp())
        .get('/api/v1/account')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('GET /account/:id', () => {
    it('should not return user and return 400 when no token is present', (done) => {
      request(app.getApp())
        .get('/api/v1/account/' + id)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });

    it('should return user and return 200 when token is present', (done) => {
      request(app.getApp())
        .get('/api/v1/account/' + id)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /account/:id', () => {
    it('should not update user and return 400 when no token is present', (done) => {
      request(app.getApp())
        .put('/api/v1/account/' + id)
        .send({ name: 'another name' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });
    it('should update user and return 202 when token is present', (done) => {
      request(app.getApp())
        .put('/api/v1/account/' + id)
        .auth(token, { type: 'bearer' })
        .send({ firstName: 'Somebody' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.firstName).to.be.equal('Somebody');
          done();
        });
    });
  });

  describe('DELETE /account/:id', () => {
    it('should not delete user and return 400 when no token is present', (done) => {
      request(app.getApp())
        .delete('/api/v1/account/' + id)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body.data).to.be.undefined;
          done();
        });
    });
    it('should delete user and return 200 when token is present', (done) => {
      request(app.getApp())
        .delete('/api/v1/account/' + id)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
