terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Create a security group to allow SSH, HTTP, and App ports
resource "aws_security_group" "app_sg" {
  name        = "predictive-dash-sg"
  description = "Allow inbound traffic for Predictive Dash"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Next.js App"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "PredictiveDashSG"
  }
}

# Free-tier safe EC2 Instance (t2.micro / t3.micro)
resource "aws_instance" "app_server" {
  ami           = var.ami_id # Ubuntu AMI
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # User data script to install Docker and start the app
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io docker-compose git
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              
              # Pull image and run
              # In a real scenario, this would pull from Docker Hub or a registry
              # docker run -d -p 3000:3000 my-dockerhub-user/predictive-dash:latest
              EOF

  tags = {
    Name = "PredictiveDash-Demo-Server"
  }
}
