
'use strict';

describe('chai-fireproof', function() {

  before(function() {
    return root.child('test-thing').set(true);
  });

  it('modifies equal() to return a promise for Firebase refs', function() {

    var promise = expect(root.child('foo')).to.equal(null);
    expect(promise.then).to.be.a('function');

  });

  describe('when it generates a promise, the promise', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('foo')).to.equal(null)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error', e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('foo')).to.equal(7)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });

});
