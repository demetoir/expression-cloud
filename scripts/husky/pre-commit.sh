pwd

cd ./api
yarn lint-staged
yarn pretty-quick --staged
cd ..

cd ./app
yarn lint-staged
# todo  apply lint only staged files
cd ..
