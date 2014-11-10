
'use strict';

describe('the "children" assertion', function() {

  before(function() {

    return root.authWithCustomToken(authToken)
    .then(function() {
      return root.child('children').set({ a: 1, b: 2, c: 3});
    });

  });

  it('is a synonym for "keys"', function() {

    return expect(root.child('children')).to.include.children(['a', 'c'])
    .then(function() {
      return expect(root.child('children')).to.have.children(['a', 'b', 'c']);
    });

  });

});
