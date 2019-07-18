import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import HeadLineController from '../api/headlines';
import EmployeeController from '../api/employees';

import App from '../app';
const app_class = new App(
    [
      new HeadLineController(),
      new EmployeeController(),
    ],
    5000,
);
chai.use(chaiHttp);
const app = app_class.app;
app.listen();
const expect = chai.expect;
const cat = "sports";
const sub = "finance";
const testDate = "08%2F15%2F1972";

describe('GET /headlines', () => {

    it('Should return all headlines', () => {
      return chai.request(app).get('/headlines')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(9);
        });
    });
  
    it('Should return only headlines with specified category parameter', () => {
      return chai.request(app).get(`/headlines/category/${cat}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(3);
        });
    });
  
    it('Should return only headlines with specified date parameter', () => {
      return chai.request(app).get(`/headlines/date/${testDate}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
        });
    });
  
    it('Should return only headlines with specified date and category parameter', () => {
      return chai.request(app).get(`/headlines/date/${testDate}/category/${cat}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(3);
        });
    });
});  

describe('GET /employees', () => {

    it('Should return all employees', () => {
      return chai.request(app).get('/employees')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(10);
        });
    });
  
    it('Should return only employees with specified subscription parameter', () => {
      return chai.request(app).get(`/employees/subscription/${sub}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(2);
        });
    });  
});
