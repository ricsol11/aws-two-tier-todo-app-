## Web Application EC2 Instances

Purpose:
The web application EC2 instances will host the Node.js To-Do List application. Two instances are launched to provide high availability and prepare the architecture for load balancing through an Application Load Balancer.

---

### Instance 1

Name:
web-server-1

Instance Type:
t3.micro

AMI:
Amazon Linux 2023

VPC:
TodoAppVPC

Subnet:
TodoApp-Subnet-Public-A

Security Group:
Webserver-SG

Status:
Running

---

### Instance 2

Name:
web-server-2

Instance Type:
t3.micro

AMI:
Amazon Linux 2023

VPC:
TodoAppVPC

Subnet:
TodoApp-Subnet-Public-B

Security Group:
Webserver-SG

Status:
Running

---

### Screenshots

* 18-web-server-1-instance-summary.png
* 19-web-server-2-instance-summary.png

---

### Web Server Access and Dependency Installation

Both web application EC2 instances were accessed through SSH and configured with the required dependencies for running the Node.js application.

Dependencies installed:

* Git
* Node.js
* npm

Web Server 1:
SSH connection: Successful
Dependency installation: Successful

Web Server 2:
SSH connection: Successful
Dependency installation: Successful

Screenshots:

* 20-web-server-1-ssh-connection.png
* 21-web-server-1-dependencies-installed.png
* 22-web-server-2-ssh-connection.png
* 23-web-server-2-dependencies-installed.png

---

### Application Code Deployment

Repository:
https://github.com/Himanshu-Sangshetti/Todo-Two-Tier

Web Server 1:
Application repository cloned and .env file created successfully.

Web Server 2:
Application repository cloned and .env file created successfully.

Security Note:
The .env file contains database credentials and is not committed to GitHub.

Screenshots:

* 24-web-server-1-app-cloned-and-env-created.png
* 25-web-server-2-app-cloned-and-env-created.png
