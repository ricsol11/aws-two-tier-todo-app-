# Load Balancer Configuration

## Application Load Balancer

Name:
TodoApp-ALB

Type:
Application Load Balancer

Scheme:
Internet-facing

VPC:
TodoAppVPC

Subnets:
- TodoApp-Subnet-Public-A
- TodoApp-Subnet-Public-B

Security Group:
ALB-SG

Listener:
HTTP / Port 80

Target Group:
TodoApp-TG

Target Type:
Instances

Target Protocol:
HTTP

Target Port:
80

Health Check:
HTTP / Path /

Registered Targets:
- web-server-1
- web-server-2

Target Health:
Healthy

Result:
The To-Do List application is accessible through the Application Load Balancer DNS name.

Screenshots:
- 32-alb-security-group-inbound.png
- 33-alb-security-group-outbound.png
- 34-target-group-created.png
- 35-target-group-health-check-settings.png
- 36-target-group-healthy-targets.png
- 37-application-load-balancer-created.png
- 38-alb-security-group-attached.png
- 39-alb-listener-rules.png
- 40-app-accessed-through-alb.png