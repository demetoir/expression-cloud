pwd

cd ./api
yarn pretty-quick --staged
yarn lint-staged
# todo apply lint staged
yarn
cd ..

cd ./app
# todo  apply lint only staged files
cd ..
