# exit on any error raised
set -e

echo 'start docker containers'
docker-compose -f ./docker/api.compose.yml --env-file ./.env/api.env  down
