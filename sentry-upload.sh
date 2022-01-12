#!/bin/sh
if [ -z "$SENTRY_RELEASE" ]
  then 
    echo 'SENTRY NOT CONFIGURED TO UPLOAD'
else 
  sentry-cli releases new "$SENTRY_RELEASE"
  sentry-cli releases files "$SENTRY_RELEASE" upload-sourcemaps ./dist --url-prefix '~/dist'
  sentry-cli releases set-commits "$VERSION" --auto
  sentry-cli releases finalize "$SENTRY_RELEASE"
fi
