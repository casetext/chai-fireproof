
'use strict';

describe('chai-fireproof', function() {

  it('modifies Chai assertions to return a promise for Firebase refs', function() {

    var promise = expect(root.child('foo')).to.equal(null);
    expect(promise.then).to.be.a('function');

  });

});
