#!/bin/bash
cd c:/projects/colorsite
docker stop $(docker ps -aq)
docker build -t colorsite .
docker run -d -p 8080:80 colorsite