
'use strict';

describe('for equality assertions', function() {

  before(function() {
    return root.authWithCustomToken(authToken);
  });

  it('resolves for correct assertions', function() {

    return expect(root.child('foo')).to.equal(null)
    .then(null, function(e) {
      console.log(e.constructor.name);
      throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
    });

  });


  it('rejects for incorrect assertions', function() {

    return expect(root.child('foo')).to.equal(7)
    .then(function() {
      throw new Error('Expected assertion to reject, but it resolved');
    }, function() {} );

  });


});
