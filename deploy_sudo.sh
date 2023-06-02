#!/bin/bash

# Instalando as dependências do composer (o docker compose na linha 20 utiliza o sail para montar o container)
sudo docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd)/api:/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs

# Estarei utilizando o arquivo .env.example para esse deploy, porem o correto é colocar essas variaveis de ambiente diretamente no servidor
rm ./api/.env
cp ./api/.env.example ./api/.env

# Removendo o arquivo sqlite antes de criar outro (caso execute o comando deploy novamente)
rm -f ./api/database/database.sqlite
touch ./api/database/database.sqlite

# Subir containers
sudo docker compose up -d --build

# Build da estrutura do laravel
sudo docker exec -it api_laravel php artisan migrate:fresh
sudo docker exec -it api_laravel php artisan db:seed

# Build da estrutura do react
#sudo docker exec -it front_react yarn install
#sudo docker exec -it front_react yarn build
