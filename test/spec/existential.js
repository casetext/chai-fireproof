
'use strict';

describe('for existential assertions', function() {

  before(function() {

    return root.authWithCustomToken(authToken)
    .then(function() {

      return root.child('existential').setWithPriority({
        yes: true,
        no: false
      }, 7);

    });

  });

  describe('like "satisfy"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential')).to.satisfy(function(snap) {
        return snap.name() === 'existential' && snap.getPriority() === 7;
      })
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential')).to.satisfy(function(snap) {
        return snap.name() === 'existential' && snap.getPriority() === 4;
      })
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "ok"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential')).to.be.ok
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential/nope')).to.be.ok
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "true"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential/yes')).to.be.true
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential/no')).to.be.true
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "false"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential/no')).to.be.false
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential/yes')).to.be.false
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "null"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential/nope')).to.be.null
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential')).to.be.null
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "exist"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('existential')).to.exist
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('existential/nope')).to.exist
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });

});
