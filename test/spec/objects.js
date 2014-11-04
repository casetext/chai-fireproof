
'use strict';

describe('for object assertions', function() {


  before(function() {

    return root.child('object').set({
      foo: 9,
      bar: { baz: '777' },
      quux: [0, 1, 2]
    });

  });


  describe('like deepEqual', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('object')).to.deep.equal({
        foo: 9,
        bar: { baz: '777' },
        quux: [0, 1, 2]
      })
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('object')).to.deep.equal({
        foo: 9,
        bar: { baz: '777' },
        quux: [0, 1, 3]
      })
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


  describe('like "keys"', function() {

    it('resolves for correct assertions', function() {

      return expect(root.child('object')).to.include.keys(['foo', 'quux'])
      .then(null, function(e) {
        throw new Error('Expected assertion to resolve, but it rejected with error ' + e.message);
      });

    });


    it('rejects for incorrect assertions', function() {

      return expect(root.child('object')).to.include.keys(['foo', 'baz'])
      .then(function() {
        throw new Error('Expected assertion to reject, but it resolved');
      }, function() {} );

    });

  });


});
