#!/bin/bash

export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
export AWS_REGION=$3
export IAM_CACHE_SERVER_IMAGE=$4

# Login to docker registry
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $IAM_CACHE_SERVER_IMAGE

# Creating backup
make backup

# Stopping docker compose
docker-compose stop

# Coping old docker-compose.yml
cp docker-compose.yml docker-compose.old.yml

# Coping old env file
cp .env .env.old

# Adding new .env file
mv .env.ci.dist .env

# Adding new docker-compose.yml file
mv docker-compose.prod.yml docker-compose.yml

# Pulling new image from registry
docker-compose pull

# Starting application
docker-compose up -d

# logout from docker registry
docker logout

# unset env variables
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_REGION
unset IAM_CACHE_SERVER_IMAGE

# remove deploy.sh
rm deploy.sh
