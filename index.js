
'use strict';

var Fireproof = require('fireproof');

module.exports = function(chai, utils) {

  // Overrides any Chai assertion in the list below to do the following:
  // If the subject of the assertion is a Fireproof reference, the assertion
  // will return a promise that resolves on passage of the test or rejects
  // with the assertion error on failure.
  function fireproofify(name, isProperty) {

    return function(_super) {

      return function() {
        var oldArguments = arguments;
        var self = this;
        var obj = this._obj;
        if (obj && obj instanceof Fireproof) {
          return obj.then(function(snap) {

            var newAssertion;

            if (name === 'satisfy') {
              newAssertion = new chai.Assertion(snap);
            } else if (utils.flag(self, 'priority')) {
              newAssertion = new chai.Assertion(snap.getPriority());
            } else {
              newAssertion = new chai.Assertion(snap.val());
            }

            utils.transferFlags(self, newAssertion, false);
            newAssertion.message = self.message;

            if (isProperty) {

              // property.
              newAssertion.to.be[name];

            } else {

              // method.
              newAssertion.to[name].apply(newAssertion, oldArguments);

            }

          });

        } else {
          _super.apply(this, arguments);
        }

      };

    };

  }

  function fireproofifyChain() {

    return function(_super) {

      return function() {
        return _super.apply(this, arguments);
      };

    };

  }

  chai.Assertion.addChainableMethod('priority', function(expectedPriority) {

    if (this._obj && this._obj instanceof Fireproof) {

      return this._obj.then(function(snap) {
        new chai.Assertion(snap.getPriority()).to.equal(expectedPriority);
      });

    } else {
      throw new Error('Got a non-Fireproof object for priority call');
    }

  }, function() {
    utils.flag(this, 'priority', true);
  });


  chai.Assertion.addMethod('children', function(children) {

    if (this._obj && this._obj instanceof Fireproof) {

      if (utils.flag(this, 'contains')) {

        return this._obj.then(function(snap) {
          new chai.Assertion(snap.val()).to.contain.keys(children);
        });

      } else {

        return this._obj.then(function(snap) {
          new chai.Assertion(snap.val()).to.have.keys(children);
        });

      }

    } else {
      throw new Error('Got a non-Fireproof object for priority call');
    }

  });


  /* Some notes on behavior:
   *
   * "Satisfy" is different from all other methods insofar as it hands in
   * the FireproofSnapshot itself rather than snap.val(), so you can do advanced
   * testing on it.
   *
   * The following methods are new:
   * - priority (chainable method), which checks the priority of the object
   * - children(), which is an alias for keys()
   *
   * Since Firebase objects are always primitives, the following methods are
   * not overridden:
   * - instanceof (use "a/an" instead)
   * - property/ownProperty/haveOwnProperty (use "include.key" instead)
   * - empty (meaningless in Firebase, there are no empty arrays)
   * - undefined (again meaningless in Firebase)
   *
   */
  [
    ['equal', 'method'],
    ['equals', 'method'],
    ['eq', 'method'],
    ['eql', 'method'],
    ['eqls', 'method'],
    ['above', 'method'],
    ['gt', 'method'],
    ['greaterThan', 'method'],
    ['least', 'method'],
    ['gte', 'method'],
    ['below', 'method'],
    ['lt', 'method'],
    ['lessThan', 'method'],
    ['most', 'method'],
    ['lte', 'method'],
    ['within', 'method'],
    ['lengthOf', 'method'],
    ['length', 'chainableMethod'],
    ['match', 'method'],
    ['string', 'method'],
    ['include', 'chainableMethod'],
    ['contain', 'chainableMethod'],
    ['keys', 'method'],
    ['key', 'method'],
    ['satisfy', 'method'],
    ['closeTo', 'method'],
    ['members', 'method'],
    ['a', 'chainableMethod'],
    ['an', 'chainableMethod'],
    ['null', 'property'],
    ['ok', 'property'],
    ['true', 'property'],
    ['false', 'property'],
    ['exist', 'property']
  ].forEach(function(kind) {

    switch(kind[1]) {
    case 'method':
      chai.Assertion.overwriteMethod(kind[0], fireproofify(kind[0]));
      break;
    case 'chainableMethod':
      chai.Assertion.overwriteChainableMethod(kind[0], fireproofify(kind[0]), fireproofifyChain(kind[0]));
      break;
    default:
      chai.Assertion.overwriteProperty(kind[0], fireproofify(kind[0], true));
      break;
    }

  });

};
