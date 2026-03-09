# Syook DevOps Assignment — Task 1

## Task 1: On-Premise Application Stack Deployment

### Overview
This task simulates an **on-premises customer deployment** by containerizing and deploying a full-stack application environment. The stack combines:

1. **MERN Stack** (MongoDB, Express, React, Node.js)  
2. **LAMP Stack** (Linux, Apache, MySQL, PHP)  

All services are orchestrated using **Docker Compose**, and Nginx is used as a reverse proxy to route traffic between the MERN and LAMP applications.

This mirrors real-world deployment scenarios encountered in Syook InSite’s IoT platform deployments.

---

## Architecture

**Routing Rules via Nginx:**
- `/app` → MERN application (React frontend served via Nginx, Node.js backend, MongoDB)
- `/legacy` → LAMP application (PHP/Apache, MySQL database)

---

## Prerequisites

Ensure the following are installed on your Linux VM or local machine:

- Docker  
- Docker Compose  
- Node.js (v20+) and npm  
- Git  

---

## Directory Structure

task-1/
├─ frontend/ # React frontend
├─ backend/ # Node.js / Express API
├─ lamp/ # Apache + PHP + MySQL stack
├─ docker-compose.yml # Multi-service orchestration
├─ setup.sh # Bootstrap script
└─ nginx/ # Reverse proxy configuration
---

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/mitAakash/my-assignment.git
cd task-1

### The setup.sh script installs dependencies, builds Docker images, and starts all services:
chmod +x setup.sh
./setup.sh

### Access the Applications

MERN Stack: http://localhost

LAMP Stack: http://localhost/legacy

## Check running containers:

docker ps
docker logs <container_name>

# Key Components
# Docker Compose

# Brings up MongoDB, MySQL, Node.js backend, React frontend, Apache + PHP, and Nginx reverse proxy.

# Ensures consistent environment setup without manual installation.

# Nginx Reverse Proxy

# Routes /app requests to MERN stack.

# Routes /legacy requests to LAMP stack.

# Simplifies access and mimics a real customer deployment scenario.

# Notes

# This setup simulates a customer on-prem environment.

# The frontend runs on localhost using Vite; no code modification was required to achieve this.

# The backend and LAMP services are fully containerized and isolated.

# Troubleshooting

# If the frontend does not load, ensure port 80 is free.

# If backend or LAMP services fail, check container logs:

docker logs lamp-server
docker logs backend

# CI/CD Pipeline (GitHub Actions)
# Overview

# The pipeline automates:

# Linting and testing frontend & backend

# Building Docker images for each service

# Pushing Docker images to Docker Hub

# Deploying to the staging server

# Health check and automatic rollback if deployment fails

# Workflow Steps

# Checkout Code – Pulls the repository.

# Setup Node.js – Prepares Node.js environment for frontend/backend lint & tests.

# Lint & Test – Runs npm lint and npm test for frontend & backend.

# Docker Login – Authenticates with Docker Hub using secrets.

# Build Docker Images – Tags images with Git commit SHA.

# Push Docker Images – Uploads images to Docker Hub.

# Deploy to Staging – Pulls images on the server, starts containers, performs health check, and rolls back if needed.

# Rollback Strategy

# Deployment reads last successful tag from last_successful.txt.

# Pulls new Docker images and starts containers.

# Performs health check on the MERN app.

# If health check fails:

# Stops failed containers

# Starts previous working containers (rollback)

# Exits pipeline

# Updates last_successful.txt if deployment succeeds.

# Notes

# Server must have Docker, Docker Compose, and the updated docker-compose.yml at /path/to/task-1.

# Deployment is fully automated via GitHub Actions; code is inside Docker images.

# Future improvements: Blue-Green deployment for zero downtime, multi-stage builds, and integration tests.