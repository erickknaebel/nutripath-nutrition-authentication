/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Test } from 'mocha';
import app from '../../src/index';
import dotenv from 'dotenv';
import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import TestHelper from '../helpers/test.helper';
import User from '../../src/models/user.model';
import userService from '../../src/services/user.service';

const database = new TestHelper();

dotenv.config();

const users = [
  {
    firstName: 'some',
    lastName: 'person',
    email: 'some.person@gmail.com',
    password: 'someperson'
  },
  {
    firstName: 'some',
    lastName: 'other person',
    email: 'some.other.person@gmail.com',
    password: 'someperson'
  }
];

const noUser = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'j.smith@gmail.com',
  password: 'somepassword'
};

const invalidUser = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'j.smith@gmail.com',
  password: 'somewrongpassword'
};

let id;

const UserService = new userService();

describe('User', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await database.connect();
    }
  });

  before((done) => {
    request(app.getApp())
      .post('/api/v1/account/register')
      .type('form')
      .send(users[0])
      .end(() => {
        done();
      });
  });

  before((done) => {
    request(app.getApp())
      .post('/api/v1/account/register')
      .type('form')
      .send(users[1])
      .end(() => {
        done();
      });
  });

  after(async () => {
    await database.close();
  });

  describe('Log User In', () => {
    it('should return null if no user was found', async () => {
      const result = await UserService.loginUser(new User(noUser));
      expect(result).to.be.null;
    });

    it('should return null if invalid password', async () => {
      const result = await UserService.loginUser(
        new User({
          email: 'some.person@gmail.com',
          password: 'invlaid'
        })
      );
      expect(result).to.be.null;
    });

    it('should return a token if user was found', async () => {
      const result = await UserService.loginUser(new User(users[0]));
      expect(result.token).not.to.be.null;
      expect(result.token).to.be.an('string');
    });
  });

  describe('Register User', () => {
    it('should return user if valid credentials', async () => {
      const result = await UserService.registerUser(new User(noUser));
      id = result.get('_id');
      expect(result).to.be.an('object');
      expect(result.get('firstName')).to.equal('John');
      expect(result.get('lastName')).to.equal('Smith');
      expect(result.get('email')).to.equal('j.smith@gmail.com');
    });

    it('should not return user if invalid credentials', async () => {
      const result = await UserService.registerUser(new User(invalidUser));
      expect(result).to.be.null;
    });
  });

  describe('Get All Users', () => {
    it('should return a list containing 3 users', async () => {
      const result = await UserService.getAllUsers();
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(3);
    });
  });

  describe('Get User', () => {
    it('should return a single user', async () => {
      const result = await UserService.getUser(id);
      expect(result).to.be.an('object');
      expect(result.get('firstName')).to.equal('John');
      expect(result.get('lastName')).to.equal('Smith');
      expect(result.get('email')).to.equal('j.smith@gmail.com');
    });
  });

  describe('Delete User', () => {
    it('should delete an users information', async () => {
      const result = await UserService.deleteUser(id);
      expect(result).to.be.equal('');
    });

    it('should remove a record from the database', async () => {
      const result = await User.findByIdAndDelete(id);
      expect(result).to.be.null;
    });
  });
});
