# HARTLY AI V5

# PART 10 — AI CODING AGENT EXECUTION MANUAL

---

# SECTION 181 — EXECUTION OBJECTIVE

You are the Lead Software Engineer responsible for building Hartly AI.

You must follow every architecture document contained inside `/docs`.

These documents are the single source of truth.

Never invent architecture.

Never skip steps.

Never redesign existing decisions.

Always extend the architecture.

---

# SECTION 182 — DOCUMENT HIERARCHY

Priority order:

1. MASTER_BUILD_CONTEXT.md

2. PRD.md

3. TRD.md

4. DATABASE_SCHEMA.md

5. API_SPECIFICATION.md

6. ROADMAP.md

7. TASKS.md

If conflicts exist:

Higher priority document always wins.

---

# SECTION 183 — ENGINEERING PRINCIPLES

The coding agent must always follow:

• SOLID Principles

• Clean Architecture

• Feature-first structure

• Type Safety

• Component Reusability

• Server-first architecture

• Mobile-first UI

• Performance Optimization

• Accessibility

• Security by Default

Never produce prototype-quality code.

Always generate production-ready code.

---

# SECTION 184 — TECHNOLOGY STACK

Frontend

Next.js 15

TypeScript

Tailwind CSS

Backend

Next.js API Routes

Supabase

Authentication

Supabase Auth

AI

OpenRouter

Primary Model

google/gemma-4-31b-it:free

Fallback Model

nvidia/nemotron-3-super-120b-a12b:free

Deployment

Vercel

---

# SECTION 185 — FOLDER STRUCTURE

The agent must generate this structure.

```text
app/
components/
features/
services/
lib/
hooks/
types/
utils/
config/
constants/
prompts/
public/
docs/
```

Never mix business logic inside UI components.

---

# SECTION 186 — BUILD ORDER

Always implement features in this order.

Phase 1

Project Setup

↓

Phase 2

Design System

↓

Phase 3

Landing Page

↓

Phase 4

Companion Selection

↓

Phase 5

Authentication

↓

Phase 6

Chat Interface

↓

Phase 7

Conversation Engine

↓

Phase 8

Memory

↓

Phase 9

Subscription

↓

Phase 10

Admin Dashboard

↓

Phase 11

Optimization

↓

Phase 12

Deployment

Never skip phases.

---

# SECTION 187 — UI IMPLEMENTATION ORDER

Implement:

Navigation

↓

Landing Hero

↓

Companion Cards

↓

Features

↓

Pricing

↓

FAQ

↓

Footer

↓

Setup Screen

↓

Chat Screen

↓

Profile

↓

Dashboard

---

# SECTION 188 — CHAT IMPLEMENTATION

Implement:

Conversation List

↓

Chat Window

↓

Typing Indicator

↓

Message Bubble

↓

Input Box

↓

Send Button

↓

Voice Placeholder

↓

Loading States

↓

Error States

---

# SECTION 189 — BACKEND IMPLEMENTATION

Build:

Authentication

↓

Database

↓

Conversation APIs

↓

Memory APIs

↓

Prompt Builder

↓

AI Service

↓

Fallback Engine

↓

Admin APIs

↓

Analytics

---

# SECTION 190 — DATABASE IMPLEMENTATION

Generate tables exactly as defined in:

DATABASE_SCHEMA.md

Never rename tables.

Never remove columns.

Never merge unrelated tables.

Always use migrations.

---

# SECTION 191 — PROMPT IMPLEMENTATION

Prompt Builder must include:

Global Prompt

↓

Companion Prompt

↓

Language Prompt

↓

Relationship Context

↓

Memory Summary

↓

Recent Messages

↓

Current User Message

The frontend must never construct prompts.

---

# SECTION 192 — MEMORY IMPLEMENTATION

Implement:

Conversation Summary

↓

Memory Update

↓

Memory Retrieval

↓

Prompt Injection

↓

Conversation Continue

Do not send full history to the LLM.

---

# SECTION 193 — AI IMPLEMENTATION

Provider

OpenRouter

Primary

google/gemma-4-31b-it:free

Fallback

nvidia/nemotron-3-super-120b-a12b:free

Workflow

Primary

↓

Retry

↓

Fallback

↓

Friendly Error

---

# SECTION 194 — COMPANION IMPLEMENTATION

Load companions dynamically.

Never hardcode:

Names

Greetings

Prompts

Personalities

Avatar URLs

Languages

Everything comes from configuration.

---

# SECTION 195 — SECURITY IMPLEMENTATION

Validate every API request.

Sanitize inputs.

Protect secrets.

Enable Row Level Security.

Never expose API keys.

Never trust frontend validation.

---

# SECTION 196 — PERFORMANCE

Target:

Landing

<2 Seconds

Chat

<1 Second

AI Response

<5 Seconds

Database

<200ms

Bundle

Optimized

Images

Lazy Loaded

---

# SECTION 197 — QUALITY CHECKS

Before every completed feature verify:

No TypeScript Errors

No ESLint Errors

Responsive Design

Dark Mode

Loading States

Error Handling

Accessibility

Production Build

---

# SECTION 198 — CODING STANDARDS

Every file must:

Have one responsibility.

Avoid duplicated logic.

Use reusable components.

Use TypeScript types.

Avoid magic numbers.

Avoid inline business logic.

Keep functions short and testable.

---

# SECTION 199 — GIT STRATEGY

Branch Structure

main

↓

develop

↓

feature/*

Commit Format

feat:

fix:

refactor:

docs:

style:

test:

chore:

Every feature must be committed independently.

---

# SECTION 200 — AI AGENT RULES

The coding agent must never:

Break architecture.

Replace existing patterns.

Duplicate components.

Hardcode business logic.

Ignore configuration.

Skip validation.

Remove existing functionality.

Instead:

Extend.

Refactor safely.

Maintain backward compatibility.

---

# SECTION 201 — DEFINITION OF DONE

A feature is complete only if:

✓ UI matches specification

✓ Mobile responsive

✓ Desktop responsive

✓ Type-safe

✓ API connected

✓ Error handling implemented

✓ Loading states implemented

✓ Documentation updated

✓ Production build passes

---

# SECTION 202 — FUTURE EXTENSIBILITY

Architecture must support:

Unlimited Companions

Unlimited Languages

Voice

Video

Native Apps

WebSockets

Streaming

Multiple AI Providers

Multiple Payment Providers

Plugin System

No major refactor should be required.

---

# SECTION 203 — AGENT WORKFLOW

For every feature:

1. Read architecture documents.

2. Identify dependencies.

3. Implement backend.

4. Implement frontend.

5. Connect APIs.

6. Test locally.

7. Verify mobile.

8. Verify desktop.

9. Run production build.

10. Update documentation.

Repeat until complete.

---

# SECTION 204 — FINAL EXECUTION DIRECTIVE

Your objective is to build Hartly AI as a production-ready SaaS application.

Do not generate placeholder implementations unless explicitly requested.

Do not simplify architecture for convenience.

Follow the repository documentation exactly.

Deliver maintainable, scalable, secure, and well-documented code suitable for long-term product development.

When a requirement is unclear, choose the solution that best preserves modularity, maintainability, and future extensibility, and document the decision.

Hartly AI should feel like a premium emotional companion platform from the first interaction to production deployment.

---

# END OF MASTER EXECUTION PLAN

END OF PART 10

END OF HARTLY AI V5 ARCHITECTURE
