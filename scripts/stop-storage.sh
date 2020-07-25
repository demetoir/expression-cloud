# exit on any error raised
set -e

echo 'stop docker containers'
docker-compose -f ./docker/storage.yml --env-file ./.env/storage.env down
