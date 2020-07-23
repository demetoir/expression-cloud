echo 'start docker containers'
docker-compose -f ./docker/api-server.yml --env-file ./.env/api-server.env up
