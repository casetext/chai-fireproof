
/**
 * Set the Firebase auth token to use in tests.
 * @method setFirebaseAuthToken
 * @memberof chai
 * @param {String} newToken The auth token to use in testing.
 */
chai.setFirebaseAuthToken = function(newToken) {
  chai._firebaseToken = newToken;
};

/**
 * Thrown by chai-fireproof when something goes wrong with Firebase unexpectedly.
 * @constructor FirebaseError
 * @memberof chai
 * @param {String} message The error message.
 */
chai.FirebaseError = function FirebaseError(message) {

  Error.call(this);
  this.message = message;

};

chai.FirebaseError.prototype = Object.create(Error.prototype);

chai.use(function(chai, utils) {

  /*
  CryptoJS v3.1.2
  code.google.com/p/crypto-js
  (c) 2009-2013 by Jeff Mott. All rights reserved.
  code.google.com/p/crypto-js/wiki/License
  */
  var CryptoJS;
  /* jshint ignore:start */
  CryptoJS=function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
  r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
  32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
  2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
  u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
  a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
  d)).finalize(c)}}});var t=f.algo={};return f}(Math);
  (function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
  c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
  d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
  (function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
  this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();
  /* jshint ignore:end */

  var codex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  function toBase64(str) {
    /* jshint bitwise:false */

    var bits = [];
    while(str.length > 0) {
      bits.push(str.slice(0, 3));
      str = str.slice(3);
    }

    return bits
    .reduce(function(b64, word) {

      var intVal = (word.charCodeAt(0) << 16) +
        ( (word.charCodeAt(1) << 8) || 0) +
        ( word.charCodeAt(2) || 0);

      return b64 + codex.charAt(intVal >> 18) +
        codex.charAt( (intVal & 0x3F000) >> 12) +
        (word.length > 1 ? codex.charAt( (intVal & 0xFC0) >> 6 ) : '' ) +
        (word.length > 2 ? codex.charAt( (intVal & 0x3F)) : '' );

    }, '');

  }

  function createToken(obj, secret) {

    var header = toBase64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    var payload = toBase64(JSON.stringify({
      v: 0,
      debug: true,
      admin: obj && obj.admin === true,
      iat: Math.round(Date.now() / 1000),
      d: obj
    }));
    var message = header + '.' + payload;
    var signature = CryptoJS.HmacSHA256(message, secret);

    return message + '.' + toBase64(signature.toString(CryptoJS.enc.Latin1));

  }

  /**
   * Asserts that the described operation is possible given the security rules.
   * @method chai.Assertion.can
   * @memberof chai.Assertion
   */
  chai.Assertion.addProperty('can', function() {
    utils.flag(this, 'positivity', true);
  });

  /**
    * Asserts that the described operation is impossible given the security rules.
   * @method chai.Assertion.cannot
   * @memberof chai.Assertion
   */
  chai.Assertion.addProperty('cannot', function() {
    utils.flag(this, 'positivity', false);
  });

  /**
   * Asserts that the supplied ```ref``` is readable by the expected user.
   * @method chai.Assertion.read
   * @memberof chai.Assertion
   */
  chai.Assertion.addProperty('read', function() {
    utils.flag(this, 'operation', 'read');
  });

  /**
   * Asserts that the supplied ```ref``` is writable by the expected user.
   * @method chai.Assertion.write
   * @memberof chai.Assertion
   * @param {*} [value=null] The value to try to write.
   */
  chai.Assertion.addChainableMethod('write', function(data) {

    utils.flag(this, 'operation', 'write');
    if (data) {
      utils.flag(this, 'operationData', data);
    }

  }, function() {
    utils.flag(this, 'operation', 'write');
  });

  /**
   * Relates the assertion to a given Fireproof database reference. Will throw
   * a {@link chai.FirebaseError} if {@link chai.setFirebaseAuthToken} has not been called.
   * @method chai.Assertion.ref
   * @memberof chai.Assertion
   * @param {Fireproof} ref The ref to test against.
   * @returns {Promise}
   * @example
   * ```js
   * expect(null).cannot.write({random: 'data'}).to(root.child('just').child('anywhere'));
   * ```
   */
  chai.Assertion.addMethod('ref', function(ref) {

    var self = this,
      users = self._obj,
      operation = utils.flag(self, 'operation'),
      data = utils.flag(self, 'operationData');

    if (!chai._firebaseToken) {
      throw new chai.FirebaseError('You must call chai.setFirebaseAuthToken()!');
    }

    if (typeof ref.unauth !== 'function') {
      throw new chai.FirebaseError('You must hand in a ref to ref(), instead you handed in ' + ref);
    }

    function promiseResolved(user) {

      return function() {

        var info = chai.getFirebaseMessage('log');
        chai.flushFirebaseMessages();

        self.assert(
          utils.flag(self, 'positivity') === true,
          'Expected ' + (user ? user.uid : 'an unauthenticated user') +
            ' not to be able to ' + operation +
            (data ? JSON.stringify(data, undefined, 2) : '') +
            ' at ref ' + ref.toString() +
            ', but Firebase allowed it. Debug info:\n' + info,
          ''
        );

        return info;

      };

    }

    function promiseRejected(user) {

      return function(err) {

        var info = chai.getFirebaseMessage('log');
        chai.flushFirebaseMessages();

        self.assert(
          utils.flag(self, 'positivity') === false,
          'Expected ' + (user ? user.uid : 'an unauthenticated user') +
            ' to be able to ' + operation +
            (data ? JSON.stringify(data, undefined, 2) : '') +
            ' at ref ' + ref.toString() +
            ', but received error:\n "' + err.message + '". Debug info:\n' +
            info,
          ''
        );

        return info;

      };

    }

    function nextPromise(user) {

      return function() {

        var promise;

        if (user) {

          ref.unauth();
          promise = ref.authWithCustomToken(createToken(user, chai._firebaseToken))
          .then(function() {

            if (operation === 'read') {
              return ref.once('value').then(promiseResolved(user), promiseRejected(user));
            } else if (operation === 'write') {
              return ref.set(data || null).then(promiseResolved(user), promiseRejected(user));
            }

          });

        } else {

          ref.unauth();
          if (operation === 'read') {
            promise = ref.once('value').then(promiseResolved(user), promiseRejected(user));
          } else if (operation === 'write') {
            promise = ref.set(data || null).then(promiseResolved(user), promiseRejected(user));
          }

        }

        return promise;

      };

    }


    if (!(Array.isArray(users))) {
      users = [users];
    }

    return users.reduce(function(promise, user) {

      if (promise) {
        return promise.then(nextPromise(user));
      } else {

      }

    }, nextPromise(users[0])());

  });

});

