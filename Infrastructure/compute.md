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

- 18-web-server-1-instance-summary.png
- 19-web-server-2-instance-summary.png