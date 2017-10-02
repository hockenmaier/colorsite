#!/bin/bash
cd c:/projects/colorsite
docker stop $(docker ps -aq)
docker run -d -p 8080:80 colorsite