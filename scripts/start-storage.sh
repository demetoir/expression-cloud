# exit on any error raised
set -e

echo 'start docker containers'
docker-compose -f ./docker/storage.yml --env-file ./.env/storage.env up -d
