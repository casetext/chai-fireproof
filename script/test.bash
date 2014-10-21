#!/usr/bin/env bash

# check for CI firebase admin token
if [ -e /tmp/firestone-admin-token-rc ]; then
  export $(cat /tmp/firestone-admin-token-rc | xargs)
fi

if [ -z $FIREBASE_ADMIN_TOKEN ]; then
  echo "FIREBASE_ADMIN_TOKEN is not set. Please run firebase-admin login."
  exit 1
fi

echo Bootstrapping Firebase instance...
./node_modules/.bin/firebase-admin bootstrap | sed -E 's/\\(.)/\1/g' | cat > /tmp/firestone-db-rc
cat /tmp/firestone-db-rc
export $(cat /tmp/firestone-db-rc | xargs)

if [ -z $ONLY ]; then
  export ONLY=''
fi

./node_modules/mocha/bin/mocha --recursive -u bdd -t 30000 -s 2000 -r test/setup test/spec/$ONLY
MOCHA_RESULT=$?

# tear down DB
./node_modules/.bin/firebase-admin delete $FB_NAME

exit $MOCHA_RESULT
