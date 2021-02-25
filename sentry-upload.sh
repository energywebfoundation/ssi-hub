#!/bin/sh

sentry-cli releases new "$SENTRY_RELEASE"
sentry-cli releases files "$SENTRY_RELEASE" upload-sourcemaps ./dist --url-prefix '~/dist'
sentry-cli releases finalize "$SENTRY_RELEASE"
