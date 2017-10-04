#!/bin/bash
echo 'cd c:/projects/colorsite'
cd c:/projects/colorsite
echo 'docker build -t colorsite .'
docker build -t colorsite .
echo 'docker service rm colorapp_web'
docker service rm colorapp_web
echo 'docker stack deploy -c docker-compose.yml colorapp'
docker stack deploy -c docker-compose.yml colorapp