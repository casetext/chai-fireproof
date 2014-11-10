
'use strict';

describe('for security rules', function(done) {

  before(function() {

    // upload some new security rules
    root.authWithCustomToken(authToken)
    .then(function() {

      require('request')({
        url: root.toString() + '/.settings/rules.json?auth=' + authToken,
        method: 'PUT',
        json: true,
        body: require('../fixtures/security.json')
      }, function(err, res, out) {

        root.unauth();
        if (out.error) {
          throw new Error('Got error from Firebase: ' + out.error);
        } else if (err) {
          throw new Error('Could not send security rules: ' + err.message);
        } else {
          done();
        }

      });

    });

  });


  describe('chai.setFirebaseAuthToken', function() {

    it('has to be called before tests can be run', function() {

      expect(function() {
        expect(null).can.read.ref(root);
      }).to.throw(chai.FirebaseError);

      chai.setFirebaseAuthToken(authToken);

      expect(function() {
        expect(null).can.read.ref(root);
      }).not.to.throw();

    });

    it('throws if you fail to hand in a ref', function() {

      expect(function() {
        expect(null).can.read.ref('foo');
      }).to.throw(chai.FirebaseError);

    });

  });


  describe('the "can.read.ref" test syntax', function() {

    it('resolves when the user matches the security rules', function() {
      return expect({ uid: 'custom:1' }).can.read.ref(root.child('specificUser'));
    });

    it('rejects when the user does not match the security rules', function() {
      return expect({ uid: 'custom:1' }).cannot.read.ref(root.child('adminOnly'));
    });

    it('provides some debug info in the promise resolution', function() {

      return expect({ uid: 'custom:1' }).can.read.ref(root.child('specificUser'));

    });

    it('treats object "null" as an unauthenticated user', function() {
      return expect(null).cannot.read.ref(root.child('specificUser'));
    });

    it('always resolves for admin users', function() {
      return expect({uid: 'custom:1', admin: true})
      .can.read.ref(root.child('adminOnly'));
    });

  });


  describe('the "can.write.to.ref" test syntax', function() {

    it('resolves when the user matches the security rules', function() {
      return expect({ uid: 'custom:1' }).can.write
      .to.ref(root.child('specificUser'));
    });

    it('rejects when the user does not match the security rules', function() {
      return expect({ uid: 'custom:1' }).cannot.write
      .to.ref(root.child('adminOnly'));
    });

    it('treats object "null" as an unauthenticated user', function() {
      return expect(null).cannot.write
      .to.ref(root.child('specificUser'));
    });

    it('always resolves for admin users', function() {
      return expect({ admin: true, uid: 'custom:1' }).can.write
      .to.ref(root.child('adminOnly'));
    });

    it('optionally accepts some data to try to write to the ref', function() {
      return expect({ uid: 'custom:1' }).can.write({ foo: 'bar' })
      .to.ref(root.child('specificUser'));
    });

  });

});
