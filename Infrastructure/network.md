# Network Configuration

## VPC

Name: 
TodoAppVPC

CIDR:
10.0.0.0/16

Region:
us-east-1

---

## Public Subnets

Public Subnet A:
TodoApp-Subnet-Public-A
Availability Zone: us-east-1a
CIDR: 10.0.1.0/24

Public Subnet B:
TodoApp-Subnet-Public-B
Availability Zone: us-east-1b
CIDR: 10.0.3.0/24

---

## Private Subnets

Private Subnet A:
TodoApp-Subnet-Private-A
Availability Zone: us-east-1a 
CIDR: 10.0.2.0/24

Private Subnet B:
TodoApp-Subnet-Private-B
Availability Zone: us-east-1b
CIDR: 10.0.4.0/24

---

## Internet Gateway

Name:
TodoApp-IGW

Status:
Created and attached

Attached to:
TodoAppVPC

Purpose:
Allows resources in public subnets to communicate with the internet when the route table sends traffic to the Internet Gateway.

## Route Tables

### Public Route Table

Name:
TodoApp-Public-Route-Table

Associated subnets:
- TodoApp-Subnet-Public-A
- TodoApp-Subnet-Public-B

Routes:
- 10.0.0.0/16 → local
- 0.0.0.0/0 → Internet Gateway

Purpose:
Allows public subnet resources to reach the internet.

---

### Private Route Table

Name:
TodoApp-Private-Route-Table

Associated subnets:
- TodoApp-Subnet-Private-A
- TodoApp-Subnet-Private-B

Routes:
- 10.0.0.0/16 → local

Purpose:
Keeps private subnet resources isolated from direct internet access.