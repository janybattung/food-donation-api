const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/server')

// describe('App', () => {
//   it('GET / responds with 200 containing "Hello, world!"', () => {
//     return supertest(app)
//       .get('/')
//       .expect(200, 'Hello, world!')
//   })
// })

// describe('GET /api/charity', () => {
//   it('should return an array of charities', () => {
//     return supertest(app)
//       .get('/api/charity')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then(res => {
//         expect(res.body).to.be.an('array');
//         expect(res.body).to.have.lengthOf.at.least(1);
//         const charity = res.body[0];
//         expect(charity).to.include.all.keys(
//           'charityName', 'firstName', 'lastName', 'email'
//           );
//       });
//   })
// })

describe('GET /api/charity', () => {
  it.only('should return an array of charities', () => {
    // only this test runs
    // ...
  });

  it('should be 400 if sort is incorrect', () => {
    // this and all other tests are skipped
    //  ...
  });

  // ...
});