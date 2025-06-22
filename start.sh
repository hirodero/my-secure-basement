#!/bin/bash

# Stop and remove existing containers
docker-compose down

# Build and start the service
docker-compose up --build -d