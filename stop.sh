#!/bin/bash
echo 'cd c:/projects/colorsite'
cd c:/projects/colorsite
echo 'removing 3 services'
docker service rm colorapp_web
docker service rm colorapp_mongo
docker service rm colorapp_visualizer
echo 'docker swarm leave --force'
docker swarm leave --force