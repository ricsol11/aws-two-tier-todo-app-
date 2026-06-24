# Security Configuration

## ALB Security Group

Inbound:
(To fill later)

Outbound:
(To fill later)

---

# Security Configuration

## Web Server Security Group

Name:
Webserver-SG

VPC:
TodoAppVPC

Purpose:
Controls access to the EC2 instances running the web application.

Inbound Rules:
- Web access / HTTP / Port 80 / Source: 0.0.0.0/0
- SSH / Port 22 / Source: My IP
- Database connection / MySQL/Aurora / Port 3306 / Source: Database-SG

Outbound Rules:
- All traffic / Destination: 0.0.0.0/0

---

## Database Security Group

Name:
Database-SG

VPC:
TodoAppVPC

Purpose:
Controls access to the MySQL database layer.

Inbound Rules:
- MySQL/Aurora / Port 3306 / Source: WebServer-SG

Outbound Rules:
- All traffic / Destination: 0.0.0.0/0