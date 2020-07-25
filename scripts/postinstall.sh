# exit on any error raised
set -e

echo 'install api server'
cd ./api
yarn install
cd ..

echo 'install vue app'
cd ./app
yarn install
cd ..
