chai-fireproof
==============

Chai assertions and helpers for Firebase and Fireproof.

## Usage

First load the plugin like any other Chai plugin:

```javascript
chai.use(require('chai-fireproof'));
```

Now you can create assertions on Fireproof objects like anything else.
Note that these return promises that you'll have to pass back to your test framework.

An example with Mocha:
```javascript
describe('My Firebase', function() {
  
  var root = new Fireproof(new Firebase('https://metropolis.firebaseio.com'));

  it('should have some data in there already', function() {
    return expect(root.child('robots')).to.exist;
  });

  it('should have some users in there', function() {

    return expect(root.child('citizens')).to.deep.equal({
      fred: {
        name: 'Freder Frederson',
        hometown: 'Metropolis',
        assignment: 'Utopia'
      },
      maria: {
        name: 'Maria',
        hometown: 'Metropolis',
        assignment: 'Underworld'
      }
    });

  });

  it('should have the water level in there', function() {
    return expect(root.child('waterLevel')).to.be.lessThan(5);
  })

});
```
