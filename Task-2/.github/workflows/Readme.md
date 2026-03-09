# Task 2 — CI/CD Pipeline for Syook Assignment
## Requiremets
one server with pem file, username and pulic IP
Install docker on the server and copy two file docker-compose.yml and setup.sh one time.
## Overview

This task implements a **CI/CD pipeline** for the application stack from Task 1, automating:

1. **Linting & Testing** — Frontend (React) and Backend (Node.js/Express)
2. **Building Docker Images** — MERN frontend/backend and LAMP stack
3. **Pushing Images** — Docker Hub registry
4. **Deploying to Staging** — Automated deployment with **health checks** and **auto-rollback**

The pipeline uses **GitHub Actions** and is triggered on pushes to the `main` branch.

---

## Pipeline Flow

```mermaid
flowchart LR
    A[Code Commit / PR] --> B[GitHub Actions Trigger]
    B --> C[Checkout Code]
    C --> D[Lint & Test Frontend]
    C --> E[Lint & Test Backend]
    D --> F[Build Docker Images]
    E --> F
    F --> G[Push Docker Images to Docker Hub]
    G --> H[Deploy to Staging Server]
    H --> I{Health Check}
    I -->|Pass| J[Update last_successful.txt]
    I -->|Fail| K[Rollback to Previous Version]

 Notes:

Docker images are tagged with the Git commit SHA for versioning.

Deployment is performed via SSH to the staging server using a setup.sh and docker-compose.yml.

Health check ensures the frontend is reachable before marking deployment as successful.

GitHub Actions Workflow

File: .github/workflows/deploy.yml

Trigger: push to main branch

Steps:

Checkout repository

Setup Node.js (v16)

Lint & Test Frontend/Backend (npm install, npm run lint, npm test)

Docker Login (Docker Hub secrets required)

Build Docker Images (tagged with ${{ github.sha }})

Push Docker Images to Docker Hub

Deploy to Staging (SSH → docker compose down → docker compose up -d)

Health Check (checks frontend endpoint, rollback if status != 200)

Important: The staging server must have:

Docker & Docker Compose installed

setup.sh and docker-compose.yml present

Network access for Docker Hub image pulls

Rollback Strategy:

Each deployment reads the last successful Git SHA tag from last_successful.txt.

New Docker images are pulled from Docker Hub and started.

Health check: If the frontend is not healthy, the pipeline stops the failed deployment and rolls back to the previous stable version.

If deployment succeeds, last_successful.txt is updated with the new SHA.

Result: Zero or minimal downtime during automatic rollback.