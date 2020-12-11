#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until curl --fail --silent -o /dev/null $host; do
  echo >&2 "db not ready"
  sleep 1
done

exec $cmd
