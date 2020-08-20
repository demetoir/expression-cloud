# exit on any error raised
set -e

echo 'build docker file'
docker-compose -f ./docker/api.compose.yml --env-file ./.env/api.env build
