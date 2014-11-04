
'use strict';

describe('for string assertions', function() {


  before(function() {
    return root.child('strings')
    .set('I am the very model of the modern major general!');
  });


  describe('like "match"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('strings')).to.match(/(major|lieutenant) general!$/)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('strings')).to.match(/(lieutenant|brigadier) general!$/)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('like "string"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('strings')).to.have.string('general')
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('strings')).to.have.string('colonel')
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('like "length"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('strings')).to.have.length(48)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('strings')).to.have.length(1)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


});
