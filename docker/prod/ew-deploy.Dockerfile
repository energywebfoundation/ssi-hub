# This is the ssi-hub/ics image that is publicly available
ARG PUBLIC_IMAGE

FROM $PUBLIC_IMAGE 

ARG SENTRY_AUTH_TOKEN
ARG SENTRY_COMMIT

WORKDIR /app

# Upload the sourcemaps to sentry
RUN chmod +x ./sentry-upload.sh
RUN apk add --no-cache curl && \
  curl -sL https://sentry.io/get-cli/ | bash $$ \
  SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN SENTRY_COMMIT=$SENTRY_COMMIT ./sentry-upload.sh

