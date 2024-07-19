#!/bin/sh
cd ../server

alacritty -e docker compose -f ./docker-compose.yml up &

cd ../client
# verificar si esta el archivo .env
if [ ! -f .env ]; then
  cp example.env .env
fi


# verificar si estan instaladas las dependencias
if [ ! -d node_modules ]; then
  npm install
fi

alacritty -e npm run start &