# STAR — MCP Ecosystem: YouTrack MCP Server & Open-Source Contributions

> **Company:** Personal / Open Source
> **Period:** 2025 – Present
> **Role:** Creator (YouTrack MCP) / Contributor (Umbraco MCP)
> **Evidence:** 18 commits (`Ougha.MCP.YouTrack`) + 1 commit (`umbraco-mcp` open-source contribution)

---

## Situation

The **Model Context Protocol (MCP)** was emerging as a new standard for connecting AI assistants (Claude, Gemini, etc.) to external tools and data sources. While MCP servers existed for common services (GitHub, Slack), there was **no MCP server for JetBrains YouTrack** — my primary project management tool. This meant AI assistants couldn't help with issue creation, sprint planning, work item tracking, or project management workflows. Additionally, the Umbraco CMS ecosystem lacked MCP tooling for content management automation.

## Task

Build a **production-quality MCP server** for YouTrack that:

- Exposes YouTrack's complex API (issues, subtasks, story points, Gantt charts, work items) as AI-consumable tools
- Handles YouTrack's **per-project custom fields** — each project has different field schemas
- Implements proper rate limiting, retry logic, and error handling for API stability
- Follows the MCP specification for tool registration, parameter validation, and response formatting
- Is practical enough to use in my own **daily development workflow**

---

## Action

### YouTrack MCP Server — Core Architecture (18 commits)

#### Initial Implementation
- Built the **initial MCP server** with YouTrack integration *(commit: `6f2d94f` — "Initial commit: Ougha.MCP.YouTrack v1.0.0")*
- Added `shortName` support for project-aware issue creation *(commit: `bbc149a`)*

#### YouTrack API Client
- Implemented comprehensive **YouTrack API client** with built-in authentication, rate limiting, and error handling *(commit: `763990e`)*
- Client covers: projects, users, issues, work items, links, and Gantt charts *(commit: `30eede7`)*
- Rate limiting prevents API throttling during bulk operations *(commit: `6f22f58`)*
- Iterated on client implementation across 4 versions for stability *(commits: `1c1cb33`, `4f73f5f`, `f288689`, `ad9a0bc`, `dc5d4bb`)*

#### Dynamic Zod Schema Generation
- Built **dynamic Zod schema generation** that introspects YouTrack's per-project custom fields and generates typed tool schemas **at runtime** *(commits: `be68880`, `62b8f84`, `3d6c1af`)*
- This is the key technical innovation — each YouTrack project can have completely different custom fields (priority, sprint, components, etc.), so the MCP server **dynamically discovers** these fields and creates Zod validation schemas
- Custom field mapping with subtask management *(commit: `c282704`)*
- Schema generation for issue CRUD operations *(commit: `5d6df5d`)*

#### Comprehensive Tool Registration
- Registered a **full suite of YouTrack tools** with the MCP server *(commit: `25157dc`)*:
  - **Issue CRUD**: Create, read, update, delete issues
  - **Subtask management**: Create and manage subtasks with parent relationships
  - **Story points**: Set and track estimation points
  - **Gantt charts**: Read and manage project timelines
  - **Work items**: Log time and track effort
  - **Custom fields**: Dynamic field support per project
- Issue management tools with dynamic schema generation *(commits: `452c6bb`, `0301e62`)*

### Umbraco MCP — Open-Source Contribution

- Contributed **template management tools** (CRUD operations + query functionality) to the community `umbraco-mcp` project *(commit: `1f11bd6`)*
- Project has 97 total commits from 7 contributors — I added template management capability
- The project provides MCP tools for Umbraco CMS content management automation

### Technical Design Decisions

#### Rate Limiting & Retry Logic
- Every API call goes through **built-in rate limiting** to prevent YouTrack API throttling
- Implemented **retry logic with exponential backoff** for transient failures
- Comprehensive error handling wraps all API responses for consistent MCP error formatting

#### Dynamic Schema Pattern
- The **dynamic schema generation pattern** is the most reusable architectural decision:
  1. At startup, the server calls YouTrack's custom fields API
  2. For each project, it discovers field names, types, and allowed values
  3. It generates **Zod schemas** with proper type constraints (string enums, numbers, dates)
  4. These schemas are registered as MCP tool parameters
  5. When an AI calls a tool, the input is validated against the dynamic schema
- This pattern is reusable for **any API with configurable/custom fields** (Jira, Linear, etc.)

#### Daily Workflow Integration
- I use this server **daily** with AI assistants for:
  - Creating issues with proper custom fields from natural language
  - Breaking down features into subtasks
  - Logging work items and tracking time
  - Planning sprints with story point estimation
  - Managing project timelines via Gantt chart tools

## Result

- **Published YouTrack MCP server** actively used in daily development workflow
- **18 commits** delivering a comprehensive issue management toolset
- **Dynamic Zod schema generation** handles any YouTrack project's custom field configuration at runtime
- Built-in **rate limiting + retry logic** ensures production stability
- Comprehensive toolset: issue CRUD, subtasks, story points, Gantt charts, work items
- **1 contribution** to the open-source `umbraco-mcp` project (template management tools)
- The dynamic schema generation pattern is **reusable for any API with configurable fields**
- Demonstrates hands-on experience with the **MCP protocol** — a rapidly growing AI integration standard

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about working with new protocols/standards" | MCP is the emerging standard for AI tooling — built a server from scratch |
| "How do you integrate AI tooling?" | MCP server gives AI assistants structured access to project management |
| "Tell me about an open-source contribution" | YouTrack MCP (creator) + Umbraco MCP (contributor) |
| "How do you handle dynamic schemas?" | Zod schema generation from API introspection at runtime |
| "How do you design for API reliability?" | Rate limiting, retry with backoff, comprehensive error wrapping |
| "Tell me about a tool you built for yourself" | Daily driver for AI-assisted project management |

---

## Key Technologies

`TypeScript` · `Node.js` · `Model Context Protocol (MCP)` · `Zod` · `JetBrains YouTrack API` · `REST API` · `Rate Limiting` · `Retry Logic` · `Dynamic Schema Generation` · `C#` · `Umbraco CMS`
