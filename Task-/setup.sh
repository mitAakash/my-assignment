#!/bin/bash

echo "Installing Docker..."

sudo apt update
sudo apt install -y docker.io docker-compose

sudo systemctl enable docker
sudo systemctl start docker

echo "Building containers..."

docker compose build

echo "Starting application stack..."

docker compose up -d

echo "Application deployed successfully"