# exit on any error raised
set -e

echo 'build dockerFile'

echo 'build nginx [1/2]'
docker build . -t nginx.expression-cloud:latest -f ./docker/dockerFiles/nginx.dockerFile

echo 'build nodeCluster [2/2]'
docker build . -t node.expression-cloud:latest -f ./docker/dockerFiles/node.dockerFile

