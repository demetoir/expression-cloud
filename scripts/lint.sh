# exit on any error raised
set -e

# goto root directory

cd ./api
yarn format
yarn lint
cd ..


cd ./app
yarn lint
cd ..
