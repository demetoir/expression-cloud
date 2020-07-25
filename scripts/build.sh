# exit on any error raised
set -e

echo 'remove /dist'
rm -rf ./dist

mkdir ./dist
mkdir ./dist/api


echo 'build api server'
cd ./api
yarn build
cd ..

echo 'copy built source'
cp -r ./api/dist ./dist/api/dist
cp ./api/package.json  ./dist/api/package.json
cp ./api/yarn.lock ./dist/api/yarn.lock
cp ./api/ormconfig.js ./dist/api/ormconfig.js


echo 'build vue app'
cd ./app
yarn build
cd ..

mkdir ./dist/app

echo 'copy built source'
cp -r ./app/dist ./dist/app/dist



