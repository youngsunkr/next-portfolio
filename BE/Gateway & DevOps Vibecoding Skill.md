---
name: gateway-devops-vibecoding
description: Orchestrate reverse proxy routing (YARP/Ocelot) and containerized deployment infrastructure via Docker.
version: 1.0.0
metadata:
  hermes:
    tags: [devops, gateway, yarp, ocelot, docker, postgresql]
    requires_toolsets: [terminal, file-editor]
---

# Gateway Integration & Docker Deployment Protocol

## When to use
Use this skill when configuring the API Gateway routing layers, managing service-to-service communication, setting up Docker networks, or configuring Postgres infrastructure.

## Quick reference
- **Gateway Options**: YARP (Yet Another Reverse Proxy) or Ocelot
- **Containerization**: Multi-stage Dockerfiles for .NET Web API & Next.js, Docker Compose for local orchestration.
- **Database**: PostgreSQL persistent data volumes.

## Implementation Procedure (Vibecoding Rules)

1. **Unified Configuration**:
   - Provide complete, un-truncated JSON/YAML configuration blocks (`appsettings.json`, `docker-compose.yml`) specifying exact routes, clusters, and environment keys.
2. **YARP / Ocelot Clean Implementation**:
   - When generating Gateway code, include the full `Program.cs` routing setup alongside configuration files. Ensure JWT token pass-through downstream is fully configured.
3. **Multi-Container Infrastructure**:
   - Write fully detailed Dockerfiles that leverage cache layering for .NET restore/build steps and Next.js standalone outputs.

## Common Pitfalls

- **CORS Issues**: Misconfiguring the Gateway-to-Frontend allowed origins. Always sync frontend ports with Gateway CORS policies.
- **Network Resolution**: Using `localhost` inside Docker containers breaks service discovery; always use named service hosts within the Docker bridge network.
- **Missing Envs**: Missing ConnectionStrings or JWT Secret Keys in runtime environments.

## Verification Checklist for AI
- Are all environment variables explicitly declared with fallback configurations or clear setup notes?
- Does the YARP/Ocelot config trace back accurately to the Web API endpoints?
- Are Docker volume mounts defined properly to avoid losing PostgreSQL data?