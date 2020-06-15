pwd

cd ./api
yarn lint-staged
yarn pretty-quick --staged
# todo apply lint staged
yarn
cd ..

cd ./app
# todo  apply lint only staged files
cd ..
