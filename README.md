chai-fireproof
==============

Chai assertions for Fireproof promises.

## Usage

First load the plugin like any other Chai plugin:

```javascript
chai.use(require('chai-fireproof'));
```

Now you can create assertions on Fireproof objects like anything else.
Note that these return promises that you'll have to pass back to your test framework.

An example with Mocha:
```javascript

it('handles equality expectations correctly', function() {

  return expect(root.child('something')).to.equal({
    an: 'object';
  });

});

it('handles greaterThan expectations correctly', function() {
  return expect(root.child('userCount')).to.be.above(8);
});

```
