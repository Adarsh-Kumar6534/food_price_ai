variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type (MUST be free-tier eligible)"
  type        = string
  default     = "t2.micro" # OR "t3.micro" depending on the region's free tier
}

variable "ami_id" {
  description = "AMI ID for Ubuntu Server 22.04 LTS (us-east-1 example)"
  type        = string
  default     = "ami-0c7217cdde317cfec" # Update this to the latest Ubuntu AMI in your region
}

variable "key_name" {
  description = "Name of an existing EC2 KeyPair to enable SSH access"
  type        = string
  default     = "my-aws-key" # Change this before running!
}
