
'use strict';

describe('for comparator assertions', function() {


  before(function() {

    return root.child('comparisons').set({
      'foo': 5,
      'bar': 9.5
    });

  });


  describe('like "lessThan"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.lessThan(6)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.lessThan(4)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "greaterThan"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.greaterThan(4)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.greaterThan(6)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "at.least"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.at.least(5)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.at.least(6)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "at.most"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.at.most(5)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/foo')).to.be.at.most(4)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "within"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/bar')).to.be.within(9, 10)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/bar')).to.be.within(9.6, 10)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "closeTo"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('comparisons/bar')).to.be.closeTo(9, 0.5)
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });

    it('rejects for incorrect assertions', function() {

      return expect(root.child('comparisons/bar')).to.be.closeTo(8, 0.5)
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


});
