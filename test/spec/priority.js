
'use strict';

describe('for priority assertions', function() {


  before(function() {

    return root.child('priority/number').setWithPriority(true, 7.5)
    .then(function() {
      return root.child('priority/string').setWithPriority(true, 'wut');
    });

  });


  describe('as a method', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('priority/number')).to.have.priority(7.5)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('priority/number')).to.have.priority('z')
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('as a chaining method for priorities like numbers', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('priority/number')).to.have.priority.lessThan(8)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('priority/number')).to.have.priority.lessThan(7)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


  describe('as a chaining method for priorities like strings', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('arrays')).to.have.priority.match(/[a-z]/)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('arrays')).to.have.priority.string('asdfadsf')
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {});

    });

  });


});
