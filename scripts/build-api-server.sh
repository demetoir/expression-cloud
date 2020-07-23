echo 'build docker containers'

docker-compose -f ./docker/api-server.yml --env-file ./.env/api-server.env build
dock
