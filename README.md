# Node-ci-cd-app

End-to-End CI/CD Pipeline with GitHub Actions, SonarQube, Docker & GKE
📌 Overview

This project demonstrates a complete CI/CD pipeline built using GitHub Actions that performs:

✔ Code checkout
✔ Dependency installation
✔ Unit testing
✔ Static code analysis (SonarQube)
✔ Docker image build & push (DockerHub)
✔ Deployment to GKE (Google Kubernetes Engine)

The pipeline ensures automated quality checks before deploying the application to Kubernetes.

🔁 Workflow Trigger

The pipeline runs automatically when:

Push → main branch
🏗 Pipeline Architecture
Stage 1️⃣ – Build, Test & Code Quality Scan

Job: build-test-scan

Steps:

Checkout source code
Setup Node.js (v18)
Install dependencies (npm install)
Run unit tests (npm test)
Perform SonarQube static code analysis

🔐 SonarQube authentication is handled via GitHub Secrets:
SONAR_TOKEN
SONAR_HOST_URL

✔ Prevents bad-quality code from reaching production
✔ Enforces automated testing
✔ Improves code maintainability

Stage 2️⃣ – Docker Build & Push

Job: docker-build-push
Runs only if Stage 1 succeeds.

Steps:

Login to DockerHub securely using GitHub Secrets
Setup Docker Buildx
Build Docker image
Push image to DockerHub

✔ Immutable image tagging using Git commit SHA
✔ No use of "latest" tag
✔ Production-safe versioning

Secrets used:

DOCKERHUB_USERNAME
DOCKERHUB_TOKEN

Stage 3️⃣ – Deployment to GKE
Job: deploy-k8s
Runs only after successful image push.

Steps:

Authenticate to Google Cloud using service account key
Fetch GKE cluster credentials
Verify cluster connectivity
Update Kubernetes Deployment image
Monitor rollout status

Deployment Command Used:
kubectl set image deployment/myapp \
  myapp=shobhitnagar/myapp:${{ github.sha }}

✔ Zero-downtime rolling update
✔ Automatic rollback if deployment fails
✔ Cluster authentication handled securely via GitHub Secrets

Secrets used:

GCP_SA_KEY
GKE_CLUSTER_NAME
GKE_ZONE
GCP_PROJECT_ID

🔐 Security Best Practices Implemented

No credentials hardcoded
All sensitive data stored in GitHub Secrets
SHA-based image versioning
Controlled deployment through CI pipeline
Separate authentication for DockerHub and GCP

📦 Tech Stack

GitHub Actions
Node.js
SonarQube
Docker
DockerHub
Google Kubernetes Engine (GKE)
kubectl

🎯 Key DevOps Concepts Demonstrated

Continuous Integration (CI)
Continuous Deployment (CD)
Automated Testing
Static Code Analysis
Immutable Docker Tagging
Kubernetes Rolling Updates
Secure Secret Management
Multi-Stage Pipeline Dependencies


🔄 End-to-End Flow Diagram (Conceptual)
Code Push
   ↓
Build & Test
   ↓
SonarQube Scan
   ↓
Docker Build
   ↓
Docker Push
   ↓
Authenticate to GCP
   ↓
Update GKE Deployment
   ↓
Rollout Monitoring
