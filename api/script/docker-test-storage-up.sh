# exit on any error raised
set -e

echo 'start docker containers'
docker-compose -f ./docker/test-storage.compose.yml up -d
