const assert = require('assert');
var request = require('supertest');
import { app_server } from '../server'


describe('Search Test', () => {

  it('test search api endpoint', function (done) {
    request(app_server)
      .get(`/search`)
      .end (function (err: Error, res:any) {
        assert.equal(200, res.statusCode);
        done();
      });
  });

  it('api endpoint should return no result with empty search parameters', function (done) {
    const searchTerm = ''
    request(app_server)
      .get(`/search/?search_param=${searchTerm}`)
      .end(function (error: Error, response:any) {
        const data = response.body.body
        assert.equal(true, data.length === 0);
        done();
      })
  });

  it('api endpoint should return result', function (done) {
    const searchTerm = 'good'
    request(app_server)
      .get(`/search/?search_param=${searchTerm}`)
      .end(function (error: Error, response:any) {
       const data = response.body.body
        assert.equal(true, data.length > 0);
        done();
      })
  });


});

