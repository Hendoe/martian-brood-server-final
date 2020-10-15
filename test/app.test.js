const app = require('../src/app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Martian Brood Server Home', () => {
    it('should get a message', () => { 
      return request(app) 
        .get('/')
        .expect(200, "MARTIAN BROOD SERVER");
    });
});