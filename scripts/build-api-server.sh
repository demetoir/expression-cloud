echo 'start docker containers'

docker-compose build -f ./docker/api-server.yml --env-file ./.env/api-server.env
