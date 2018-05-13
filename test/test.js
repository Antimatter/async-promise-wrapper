const ap = require('../index.js');

var assert = require('assert');

describe('delay', function() {
    it('should execute the promise after a delay', function(done) {
        ap.delay(1000)
        .then(function() {
            done();
        })
        .catch(function(error) {
            assert.fail(error);
            done();
        });
    });
});

describe('mapSeries', function() {
    it('should iterate over an array and execute a promise on each element', function(done) {
        ap.mapSeries([1, 2, 3], function(x) {
            return Promise.resolve(x + 1);
        })
        .then(function(result) {
            assert.deepStrictEqual(result, [2, 3, 4]);
            done();
        })
        .catch(function(error) {
            assert.fail('fail');
            done();
        });
    });
    it('should fail if any promise is rejected', function(done) {
        ap.mapSeries([1, 2, 3], function(x) {
            return Promise.reject('rejection');
        })
        .then(function(result) {
            assert.fail(result);
            done();
        })
        .catch(function(error) {
            done();
        });
    });
});

describe('eachSeries', function() {
    it('should iterate over an array and execute a promise on each element', function(done) {
        var nIter = 0;
        ap.eachSeries([1, 2, 3], function(x) {
            nIter++;
            return Promise.resolve(x + 1);
        })
        .then(function(result) {
            assert.ok(nIter === 3);
            done();
        })
        .catch(function(error) {
            assert.fail('fail');
            done();
        });
    });
    it('should fail if any promise is rejected', function(done) {
        ap.eachSeries([1, 2, 3], function(x) {
            return Promise.reject('rejection');
        })
        .then(function(result) {
            assert.fail(result);
            done();
        })
        .catch(function(error) {
            done();
        });
    });
});
