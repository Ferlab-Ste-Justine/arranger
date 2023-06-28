#!/bin/sh
cd modules/mapping-utils
echo 'building mapping-utils'
rm -rf node_modules && rm package-lock.json && npm install
npm run prepare

cd ../schema
echo 'building schema'
rm -rf node_modules && rm package-lock.json && npm install --legacy-peer-deps
npm run prepare

cd ../middleware
echo 'building middleware'
rm -rf node_modules && rm package-lock.json && npsm install --legacy-peer-deps
npm run prepare

cd ../admin
echo 'building admin'
rm -rf node_modules && rm package-lock.json && npm install --legacy-peer-deps
npm run prepare
