#!/bin/sh

FC_DIR="/root/foodcomputer-server"
export NODE_ENV=production

cd $FC_DIR
git fetch --all
git reset --hard origin/master
npm install
$FC_DIR/node_modules/.bin/sequelize db:migrate
pm2 startOrRestart pm2-production.config.js
