
'use strict';

describe('for "a/an" assertions', function() {


  before(function() {

    return root.authWithCustomToken(authToken)
    .then(function() {
      return root.child('a').set('foobar');
    });

  });


  it('resolves for correct assertions', function() {

    return expect(root.child('a')).to.be.a('string')
    .then(null, function(e) {
      throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
    });

  });


  it('rejects for incorrect assertions', function() {

    return expect(root.child('a')).to.be.a('number')
    .then(function() {
      throw new Error('Expected assertion to reject, but it resolved');
    }, function() {} );

  });


});
