# exit on any error raised
set -e

echo 'build docker containers'

docker-compose -f ./docker/api-server.yml --env-file ./.env/api-server.env build
