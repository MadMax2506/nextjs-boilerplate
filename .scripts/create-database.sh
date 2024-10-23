#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `.scripts/./create-database.sh`

# On Linux and macOS you can run this script directly - `.scripts/./create-database.sh`

# import env variables from .env
set -a
source $PWD/.env

DATABASE_URL=$POSTGRESQL_DB_URL
DB_USER=$(echo "$DATABASE_URL" | awk -F'\/\/' '{print $2}' | awk -F':' '{print $1}')
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')
DB_NAME=$(echo "$DATABASE_URL" | awk -F'\/' '{print $4}' | awk -F'?' '{print $1}')
DB_CONTAINER_NAME="$DB_NAME-postgres"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

if [ ! -d "$POSTGRESQL_DOCKER_PATH" ]
then
    mkdir -p "$POSTGRESQL_DOCKER_PATH"
    echo "Docker path created"
else
    echo "Docker path exists"
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p "$DB_PORT":5432 \
  -v "$POSTGRESQL_DOCKER_PATH":/var/lib/postgresql/data \
  --restart unless-stopped \
  docker.io/postgres

echo "Starting database container '$DB_CONTAINER_NAME' with the following configuration:"
echo "Database name: $DB_NAME"
echo "Database user: $DB_USER"
echo "Database password: $DB_PASSWORD"
echo "Database port: $DB_PORT"
echo "Database path: $POSTGRESQL_DOCKER_PATH"
