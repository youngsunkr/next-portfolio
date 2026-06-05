---
name: backend-vibecoding
description: Generate comprehensive, production-ready backend code following Clean Architecture, C# 10+, .NET 9/10 Web API, and Dapper specifications.
version: 1.0.0
metadata:
  hermes:
    tags: [backend, csharp, dotnet, dapper, clean-architecture, vibecoding]
    requires_toolsets: [terminal, file-editor]
    config:
      - key: backend.base_namespace
        description: Root namespace for the .NET Solution
        default: "CoreApp"
        prompt: Enterprise root namespace
---

# Backend Architecture & Code Generation Protocol

## When to use
Use this skill whenever generating, refactoring, or reviewing backend source code, database interactions, or API endpoints. It ensures strict compliance with the project's technical stack constraints and prevents AI code truncation.

## Quick reference
- **Language/Framework**: C# 10.0+, .NET Core 9.0 / 10.0 Web API
- **Architecture**: Clean Architecture (Domain -> Application -> Infrastructure -> WebAPI)
- **Data Access**: Dapper (Asynchronous execution only) + PostgreSQL
- **Mapping & Utilities**: Mapster, System.Threading.Channels (Channel<T>)
- **Security**: JWT Authentication
- **Cross-Cutting**: Serilog, Global Exception Handling Middleware
- **Deployment**: Docker Containerization

## Implementation Procedure (Vibecoding Rules)

1. **Strict Context Identification**:
   - Every code snippet must clearly state its **Absolute File Path** and **Full Namespace** at the very top as a comment.
2. **Zero-Truncation Policy**:
   - **DO NOT** use placeholders like `// TODO`, `// ... existing code ...`, or `/* Rest of the code */`. 
   - You must output the **COMPLETE file content** from the first namespace declaration to the closing brace, ensuring it is immediately copy-pasteable and compilable.
3. **Layer Separation**:
   - **Domain**: Pure entities, Value Objects, Domain Exceptions. No external dependencies.
   - **Application**: Interfaces, DTOs, Mapster configurations, CQRS Handlers/Services, Channel<T> Producers/Consumers. Dependency Injection must be interface-driven.
   - **Infrastructure**: Dapper Repository implementations, PostgreSQL Connections, JWT Token Generators, External Services.
   - **WebAPI**: Controllers, Program.cs, Middleware, Dockerfile. Controllers must not catch exceptions directly; rely entirely on the Global Exception Middleware.
4. **CORS Handling**:
   - Implement backend(webapi) and frontend(next.js).
5. **EventSourcing**: 
   - Implement event store(postgresql), DDD Aggregate, Event Store, Snapshot, Projection, Outbox Pattern.
   
## Coding Patterns & Pitfalls

- **Asynchronous Execution**: Every database or I/O operation must be completely async (e.g., `await connection.QueryAsync<T>`, `await channel.Writer.WriteAsync`).
- **Dependency Injection**: 
  - Register services via appropriate lifetimes: Business Logic/Repositories as `Scoped`, Infrastructure/Channels/Singletons as `Singleton`.
- **Dapper Mapping**: Use Mapster for DTO-to-Entity conversions explicitly. Do not write manual loops for mapping unless highly specialized.

## Verification Checklist for AI
- Is the entire file printed without single-line omissions?
- Does it use modern C# features (Global Usings, File-Scoped Namespaces where applicable)?
- Is there any explicit `try-catch` block inside the Controller layer? (If yes, remove it and defer to Middleware).
- Are all PostgreSQL queries parameterized to prevent SQL Injection?