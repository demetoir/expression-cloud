pwd

cd ./api
yarn lint-staged
yarn pretty-quick --staged
cd ..

cd ./app
# todo  apply lint only staged files
cd ..
