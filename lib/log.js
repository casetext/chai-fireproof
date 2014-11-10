
// we have to hijack console.log to capture Firebase messages
chai.use(function() {

  chai.getFirebaseMessage = function(name) {
    return chai._firebaseMsg[name];
  };

  chai.flushFirebaseMessages = function() {

    chai._firebaseMsg = {
      log: '',
      warn: '',
      error: ''
    };

  };

  chai.flushFirebaseMessages();

  function hijackedLog(logFn, name) {

    return function() {

      var message = '';
      for (var i = 0; i < arguments.length; i++) {
        message += arguments[i].toString();
      }

      if (message.match(/^FIREBASE.*?: /)) {
        chai._firebaseMsg[name] += message.replace(/^FIREBASE.*?: /, '') + '\n';
      } else {
        logFn.apply(console, arguments);
      }

    };

  }


  if (console && console.log) {

    chai._firebaseLog = '';
    chai._firebaseWarn = '';

    var oldLog = console.log,
      oldWarn = console.warn,
      oldError = console.error;

    console.log = hijackedLog(oldLog, 'log');
    console.warn = hijackedLog(oldWarn, 'warn');
    console.error = hijackedLog(oldError, 'error');

  }

});
