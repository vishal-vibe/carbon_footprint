# Google Cloud Platform (GCP) Deployment Guide

This guide explains how to deploy **EcoStep** to **Google Cloud Run**. Cloud Run is a fully managed, serverless platform that automatically scales containerized applications. It supports scaling down to zero instances, which means hosting this app will cost you virtually nothing when it is not actively being used.

---

## Prerequisites

Before deploying, ensure you have:
1. A **Google Cloud Platform (GCP) Account**.
2. The **Google Cloud CLI (gcloud)** installed on your machine.
3. Billing enabled on your GCP Project.

---

## Step-by-Step Deployment

### Step 1: Initialize the gcloud CLI
Authenticate your CLI and select your target GCP Project ID:
```bash
# Log in to your GCP account
gcloud auth login

# Set your active project ID
gcloud config set project YOUR_PROJECT_ID
```
*(Replace `YOUR_PROJECT_ID` with your actual GCP Project ID).*

### Step 2: Enable Required GCP APIs
Enable both **Cloud Build** (to compile the Docker container) and **Cloud Run** (to host the service):
```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Step 3: Deploy Directly from Source Code
GCP provides a unified command that uploads your source files, builds the Docker image in the cloud using Cloud Build (configured automatically via your local [Dockerfile](file:///c:/Users/User/carbon_footprint/Dockerfile)), registers it in Artifact Registry, and deploys it to Cloud Run:

```bash
gcloud run deploy ecostep-tracker \
    --source . \
    --region us-central1 \
    --allow-unauthenticated
```

During this command, you will be prompted:
1. **Source code location:** Press `Enter` to confirm the current directory (`.`).
2. **Service name:** Confirm `ecostep-tracker` by pressing `Enter`.
3. **Allow unauthenticated invocations:** Type `y` (Yes) to make the app publicly available over the internet.

### Step 4: Access Your App
Once the build and deployment complete (usually taking 1 to 2 minutes), the CLI output will print a secure live URL:
```text
Service [ecostep-tracker] revision [ecostep-tracker-00001-abc] has been deployed and is serving 100% of traffic.
Service URL: https://ecostep-tracker-abcde12345-uc.a.run.app
```
Open this URL in any web browser to access your live application!

---

## Alternative: Build and Push Docker Image Manually

If you prefer building and pushing container images yourself:

1. **Configure Docker authentication for Artifact Registry:**
   ```bash
   gcloud auth configure-docker us-central1-docker.pkg.dev
   ```

2. **Create a repository in Artifact Registry:**
   ```bash
   gcloud artifacts repositories create ecostep-repo \
       --repository-format=docker \
       --location=us-central1
   ```

3. **Build and Tag the Docker image locally:**
   ```bash
   docker build -t us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ecostep-repo/ecostep-tracker:latest .
   ```

4. **Push the image to GCP Artifact Registry:**
   ```bash
   docker push us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ecostep-repo/ecostep-tracker:latest
   ```

5. **Deploy the pushed image to Cloud Run:**
   ```bash
   gcloud run deploy ecostep-tracker \
       --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ecostep-repo/ecostep-tracker:latest \
       --region us-central1 \
       --allow-unauthenticated
   ```
