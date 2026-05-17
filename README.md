# Predictive Dash - Global Food Price Analytics

A web-based analytics and ML prediction system for global food price analysis, converted into a cloud-native DevOps project for academic submission.

## Tech Stack
- **Frontend/Backend:** Next.js, React, TailwindCSS
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube ready)
- **CI/CD:** Jenkins
- **Monitoring:** Prometheus & Grafana
- **Infrastructure as Code (IaC):** Terraform

---

## 🚀 Running the Project Locally (Docker Compose)

The easiest way to run the entire stack locally is using Docker Compose.

1. Ensure Docker Desktop is installed and running.
2. Build and start the services:
   ```bash
   docker-compose up -d --build
   ```
3. Access the services:
   - **Predictive Dash App:** `http://localhost:3000`
   - **Grafana Dashboard:** `http://localhost:3001` (Login: `admin` / `admin`)
   - **Prometheus:** `http://localhost:9090`
   - **Jenkins:** `http://localhost:8080`

4. To stop the services:
   ```bash
   docker-compose down
   ```

---

## ☸️ Deploying to Kubernetes (Minikube)

For academic demonstration, this project includes Kubernetes manifests optimized for a local Minikube cluster (strictly 1 replica and free-tier safe resource limits).

1. Start Minikube:
   ```bash
   minikube start
   ```
2. Build the Docker image inside Minikube's Docker daemon (so K8s can find it):
   ```bash
   eval $(minikube docker-env)
   docker build -t predictive-dash:latest .
   ```
3. Apply the Kubernetes manifests:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```
4. Access the application:
   ```bash
   minikube service predictive-dash-service -n predictive-dash-ns
   ```

---

## 🔄 CI/CD Pipeline (Jenkins)

The project includes a `Jenkinsfile` for declarative pipeline automation.
To simulate this:
1. Ensure the Jenkins container is running via `docker-compose`.
2. Access Jenkins at `http://localhost:8080`.
3. Create a new "Pipeline" job and point it to this repository or directly copy the `Jenkinsfile` contents into the pipeline script section.

---

## ☁️ Cloud Deployment (Terraform) - Optional

This project includes educational Terraform scripts to deploy the application to a single AWS EC2 instance (t2.micro/t3.micro) to stay within the AWS Free Tier.

> **Warning:** Running Terraform will provision real AWS resources. Make sure to run `terraform destroy` when you are done to avoid any potential charges.

1. Navigate to the terraform directory:
   ```bash
   cd terraform
   ```
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Review the execution plan:
   ```bash
   terraform plan
   ```
4. Apply the configuration:
   ```bash
   terraform apply
   ```
5. SSH into the created instance (using the generated IP) and manually start the docker container, or modify the `user_data` script in `main.tf` to auto-start your specific image from Docker Hub.
