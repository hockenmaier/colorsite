#!/bin/bash
echo 'cd c:/projects/colorsite'
cd c:/projects/colorsite
echo 'docker swarm leave --force'
docker swarm leave --force
echo 'docker swarm init --advertise-addr 192.168.99.100'
docker swarm init --advertise-addr 192.168.99.100
echo 'docker stack deploy -c docker-compose.yml colorapp'
docker stack deploy -c docker-compose.yml colorapp