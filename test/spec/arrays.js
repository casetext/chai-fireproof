
'use strict';

describe('for array assertions', function() {


  before(function() {
    return root.child('arrays').set(['a', 'b', 'c']);
  });


  describe('like "include"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('arrays')).to.include('a')
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('arrays')).to.include('z')
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('like "members"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('arrays')).to.have.members(['a', 'b', 'c'])
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('arrays')).to.have.members(['a', 'd'])
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('like "length"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('arrays')).to.have.length(3)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('arrays')).to.have.length(1)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


});
