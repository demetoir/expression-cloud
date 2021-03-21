# exit on any error raised
set -e

echo 'stop docker containers'
# docker, docker-compose 버전이 달라지면서 --env-file 경로가 docker-compose.yml 위치 기준으로 변경되었다...
# https://docs.docker.com/compose/compose-file/compose-file-v3/#env_file
docker-compose -f ./docker/dev-storage.compose.yml --env-file ../env/.env.dev down
