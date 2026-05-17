pipeline {
    agent any

    options {
        // Prevents overlapping builds which can exhaust local laptop memory
        disableConcurrentBuilds()
        // Adds timestamps to logs for better readability and debugging
        timestamps()
    }

    environment {
        // Define standard environment variables
        APP_NAME = 'predictive-dash'
        DOCKER_IMAGE = 'predictive-dash:latest'
        NODE_ENV = 'production' // Updated to production for standalone Docker builds
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // IN A REAL CI/CD ENVIRONMENT:
                // This step would pull your source code from GitHub/GitLab using the `checkout scm` command.
                // It remains simulated here so you don't need to configure Jenkins credentials for this demo.
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                // IN A REAL CI/CD ENVIRONMENT:
                // sh 'npm ci'
                // This strictly installs dependencies based on package-lock.json.
            }
        }

        stage('Lint & Test') {
            steps {
                echo 'Running linter...'
                // IN A REAL CI/CD ENVIRONMENT:
                // sh 'npm run lint'
                // This validates code quality before allowing a build.
            }
        }

        stage('Build Next.js App') {
            steps {
                echo 'Building Next.js application...'
                // IN A REAL CI/CD ENVIRONMENT:
                // sh 'npm run build'
                // Compiles the Next.js standalone application.
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // IN A REAL CI/CD ENVIRONMENT:
                // sh "docker build -t ${DOCKER_IMAGE} ."
                // This is simulated because running Docker-in-Docker requires elevated privileges/socket mounting,
                // which is intentionally avoided to keep the local setup secure and beginner-friendly.
            }
        }

        stage('Deploy Simulation') {
            steps {
                echo 'Simulating deployment...'
                // IN A REAL CI/CD ENVIRONMENT:
                // sh 'docker compose up -d app' OR sh 'kubectl apply -f k8s/'
                // This would push the image to a registry and trigger a deployment update.
                echo 'Deployment simulation complete!'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
