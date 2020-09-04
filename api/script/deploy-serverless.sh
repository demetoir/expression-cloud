pwd

rm -rf .layer
mkdir .layer

cp ./package.json ./.layer/package.json

cd ./.layer
npm install --production
npm prune --production
node-prune

rm package.json
rm package-lock.json

cd ..

yarn serverless deploy

