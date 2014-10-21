
'use strict';

var Fireproof = require('fireproof');
var Firebase = require('firebase');
var chai = require('chai');

var Q = require('kew');
Fireproof.bless(Q);

global.root = new Fireproof(new Firebase(process.env.FIREBASE_URL));

global.expect = chai.expect;
chai.use(require('../index'));
