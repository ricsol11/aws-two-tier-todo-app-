# Database Configuration

## Amazon RDS Instance

DB Identifier:
todo-dbinstance

Engine:
MySQL

Status:
Available

VPC:
TodoAppVPC

DB Subnet Group:
todoapp-db-subnet-group

Subnets:
- TodoApp-Subnet-Private-A
- TodoApp-Subnet-Private-B

Public Access:
No

Port:
3306

Security Group:
Database-SG

Purpose:
Stores the application data for the To-Do List web application using a managed MySQL database in the private subnet layer.