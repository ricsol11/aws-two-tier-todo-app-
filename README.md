# AWS Two-Tier To-Do List Application

This project deploys a Node.js To-Do List web application using a two-tier architecture on AWS. The application layer runs on two EC2 instances behind an Application Load Balancer, while the database layer uses Amazon RDS MySQL deployed in private subnets.

The goal of this project was to practice AWS networking, compute, database deployment, security groups, load balancing, and application deployment in a realistic cloud architecture.

---

## Architecture Overview

The application is built using the following architecture:

```
User
  |
  v
Application Load Balancer
  |
  v
Two EC2 Web Servers
  |
  v
Amazon RDS MySQL Database
```

The web application is deployed on two EC2 instances across different public subnets. Nginx is configured as a reverse proxy, forwarding traffic from port 80 to the Node.js application running on port 3000. PM2 is used to keep the Node.js application running.

The MySQL database is hosted on Amazon RDS in private subnets. A bastion host is used to connect securely to the database for administration and verification.

---

## AWS Services Used

* Amazon VPC
* Public and private subnets
* Internet Gateway
* Route tables
* Security Groups
* Amazon EC2
* Amazon RDS MySQL
* Application Load Balancer
* Target Group
* Nginx
* PM2
* Git and GitHub

---

## Infrastructure Components

### Networking

A custom VPC was created with public and private subnets across two Availability Zones.

* Public subnets host the bastion host, web servers, and Application Load Balancer.
* Private subnets host the RDS MySQL database.
* An Internet Gateway provides internet access for public resources.
* Route tables separate public and private network traffic.

### Compute

The compute layer includes:

* One bastion host for administrative access.
* Two EC2 web servers running the Node.js application.
* PM2 to keep the application process running.
* Nginx configured as a reverse proxy.

### Database

Amazon RDS MySQL is used as the database layer.

* The RDS instance is deployed in private subnets.
* The database is not publicly accessible.
* The application connects to the database using environment variables stored on the EC2 instances.
* The `Tasks` table stores the To-Do List application data.

### Load Balancing

An Application Load Balancer distributes HTTP traffic across the two EC2 web servers.

* Listener: HTTP port 80
* Target group: EC2 instances
* Health check path: `/`
* Both targets were verified as healthy.

---

## Application Deployment

The Node.js application was cloned onto both EC2 web servers. Each server was configured with:

* Git
* Node.js
* npm
* PM2
* Nginx

Environment variables were created locally on each EC2 instance using a `.env` file. The `.env` file contains database connection details and is not committed to GitHub.

Application code was based on the tutorial repository:

```text
https://github.com/Himanshu-Sangshetti/Todo-Two-Tier
```

The AWS infrastructure, deployment process, database setup, networking configuration, troubleshooting, and documentation were completed as part of this project.

---

## Final Result

The application was successfully accessed through the Application Load Balancer DNS name.

Tasks were added through the web interface and verified inside the RDS MySQL database, confirming the full end-to-end flow:

```text
Browser → Application Load Balancer → EC2 Web Server → RDS MySQL
```

---

## Documentation

Detailed project documentation is available in the `Infrastructure/` folder:

* `network.md`
* `security.md`
* `database.md`
* `compute.md`
* `load-balancer.md`

Screenshots are available in the `Screenshots/` folder and document each major step of the deployment.

---

## What I Learned

Through this project, I practiced and reinforced the following AWS concepts:

* Designing a custom VPC with public and private subnets.
* Configuring route tables and an Internet Gateway.
* Using security groups to control traffic between AWS resources.
* Deploying EC2 instances across multiple Availability Zones.
* Installing and configuring a Node.js application on EC2.
* Using PM2 to manage a Node.js process.
* Configuring Nginx as a reverse proxy.
* Creating an RDS MySQL database in private subnets.
* Connecting to RDS through a bastion host.
* Creating an Application Load Balancer and target group.
* Troubleshooting target group health checks and application connectivity.
* Verifying that application data is stored in the database.

---

## Security Notes

No database passwords, private keys, or `.env` files are committed to this repository.

For a production environment, the following improvements would be recommended:

* Use AWS Secrets Manager or SSM Parameter Store for database credentials.
* Restrict SSH access to a trusted IP address only.
* Restrict web server HTTP access to the ALB security group.
* Use HTTPS with an ACM certificate and an HTTPS listener on the ALB.
* Place application servers in private subnets and use NAT or deployment automation.
* Add CloudWatch monitoring and alarms.
* Automate infrastructure creation with Terraform, CloudFormation, or AWS CDK.

---

## Project Status

Completed.

The two-tier architecture was successfully deployed, tested through the Application Load Balancer, and verified with data stored in Amazon RDS MySQL.
