const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

//supertest(app).get('/').expect(200, 'Hello Express!');

describe('Express App', () =>{
    it('should return a message from GET /', ()=>{
        return supertest(app).get('/').expect(200, 'Hello Express!');
    });
});


describe('GET /quotient', () =>{
    it('8/4 should be 2', () =>{
        return supertest(app).get('/quotient').query({a: 8, b: 4}).expect(200, '8 divided by 4 is 2');
    });

    it(`should return 400 if 'a' is missing`, () =>{
        return supertest(app).get('/quotient').query({b : 4}).expect(400, 'Value for a is needed');
    });

    it(`should return 400 if 'b' is missing`, () =>{
        return supertest(app).get('/quotient').query({a : 4}).expect(400, 'Value for b is needed');
    });

    it(`should return 400 if value of 'a' is not numeric`, () =>{
        return supertest(app).get('/quotient').query({a: '$', b: 5}).expect(400, 'Value for a must be numberic');
    });

    it(`should return 400 if value of 'b' is not numeric`, () =>{
        return supertest(app).get('/quotient').query({a: 10, b: '#'}).expect(400, 'Value for b must be numeric');
    });

    it(`should return 400 if value of 'a' and 'b' is not numeric`, () =>{
        return supertest(app).get('/quotient').query({a: '%', b: '5'}).expect(400, 'Value for a must be numberic');
    });

    it(`should return 400 if value of 'b' is equal to zero`, () =>{
        return supertest(app).get('/quotient').query({a: 10, b: 0}).expect(400, 'Cannot divide by 0');
    });
});
