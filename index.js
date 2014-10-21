
'use strict';

var Fireproof = require('fireproof');

module.exports = function(chai, utils) {

  chai.Assertion.overwriteMethod('equal', function (_super) {

    return function checkFireproof(expectedValue) {

      var obj = this._obj;
      if (obj && obj instanceof Fireproof) {
        return obj.then(function(snap) {
          new chai.Assertion(snap.val()).to.deep.equal(expectedValue);
        });

      } else {
        _super.apply(this, arguments);
      }

    };

  });

};
