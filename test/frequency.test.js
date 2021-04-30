const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');


describe('GET /frequency endpoint', () => {

    it('should throw an error if given string is undefind',()=>{
        const stData = undefined;
        const expected = 'Invalid request';
        return supertest(app).get('/frequency').query({s: stData}).expect(400, expected);
    });


    it('should count the frequency of occurrence of each character in string',()=>{
        const stData = 'aabb';
        const expectedA = 2;
        const expectedB = 2;
        return supertest(app).get('/frequency').query({s: stData}).expect(200).expect('Content-Type', /json/)
        .then(res => {
            expect(res.body.a).to.eql(expectedA);
            expect(res.body.b).to.eql(expectedB);
        });
    });

    it('should count the total number of distinct characters',()=>{
        const stData = 'aabbBBcc';
        const expectedUnique = 3;
        return supertest(app).get('/frequency').query({s: stData}).expect(200).expect('Content-Type', /json/)
        .then(res => {
            expect(res.body.unique).to.eql(expectedUnique);
        });
    });

    it('should count the average frequency',()=>{
        const stData = 'aabbcc';
        const expectedAverage = 2;
        return supertest(app).get('/frequency').query({s: stData}).expect(200).expect('Content-Type', /json/)
        .then(res => {
            expect(res.body.average).to.eql(expectedAverage);
        });
    });

    it('should present character with the highest frequency',()=>{
        const stData = 'aabbccAA';
        const expectedhighest = 'a';
        return supertest(app).get('/frequency').query({s: stData}).expect(200).expect('Content-Type', /json/)
        .then(res => {
            expect(res.body.highest).to.eql(expectedhighest);
        });
    });
});