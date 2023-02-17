# This is the ssi-hub/ics image that is publicly available
ARG PUBLIC_IMAGE

FROM $PUBLIC_IMAGE 

ARG SENTRY_AUTH_TOKEN
ARG SENTRY_COMMIT
ARG SENTRY_RELEASE

USER root

WORKDIR /app

COPY ./sentry-upload.sh ./sentry-upload.sh
RUN chmod +x ./sentry-upload.sh

# Upload the sourcemaps to sentry
RUN apk add --no-cache curl bash
RUN curl -sL https://sentry.io/get-cli/ | bash
RUN SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN SENTRY_COMMIT=$SENTRY_COMMIT SENTRY_RELEASE=$SENTRY_RELEASE ./sentry-upload.sh
