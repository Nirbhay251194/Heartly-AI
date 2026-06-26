# PROJECT_BOOTSTRAP.md

# Hartly AI Bootstrap Guide

Version: 1.0

Status: Build Ready

---

# PURPOSE

This document is the starting point for every AI coding agent.

The objective is to generate a complete production-ready Hartly AI application following every document inside `/docs`.

Do not redesign the architecture.

Do not invent features.

Build exactly what is documented.

---

# PROJECT INFORMATION

Project Name

Hartly AI

Type

AI Companion SaaS

Platform

* Web (Phase 1)
* Android (Phase 2)

Deployment

Vercel

Repository

GitHub

Architecture

Next.js App Router

---

# TECH STACK

Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* React
* Lucide Icons

Backend

* Next.js Route Handlers
* Supabase

Authentication

* Supabase Auth

Database

* PostgreSQL (Supabase)

AI Provider

* OpenRouter

Primary Model

google/gemma-4-31b-it:free

Fallback Model

nvidia/nemotron-3-super-120b-a12b:free

Deployment

Vercel

---

# INITIAL FOLDER STRUCTURE

Generate the following folders if they do not exist.

```text
app/
components/
features/
services/
lib/
hooks/
utils/
config/
constants/
types/
prompts/
public/
docs/
supabase/
```

---

# INITIAL FILE STRUCTURE

Create these core files.

```text
app/
layout.tsx
page.tsx
loading.tsx
error.tsx

app/chat/page.tsx

app/login/page.tsx

app/setup/page.tsx

app/pricing/page.tsx

app/profile/page.tsx

app/dashboard/page.tsx

app/api/chat/route.ts

components/

Chat/

Landing/

Companion/

UI/

Layout/

Auth/

features/

chat/

memory/

auth/

subscription/

companions/

services/

openrouter.ts

supabase.ts

chat.ts

memory.ts

types/

chat.ts

user.ts

companion.ts

subscription.ts

config/

companions.ts

models.ts

pricing.ts

prompts/

system.ts

companions.ts

memory.ts

languages.ts

.env.example

README.md
```

---

# REQUIRED ENVIRONMENT VARIABLES

Create:

.env.local

Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

OPENROUTER_API_KEY=

OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never hardcode secrets.

---

# INITIAL DEPENDENCIES

Install:

```bash
npm install @supabase/supabase-js

npm install lucide-react

npm install clsx

npm install class-variance-authority

npm install tailwind-merge

npm install zod

npm install react-hook-form

npm install date-fns

npm install uuid
```

Developer Dependencies

```bash
npm install -D prettier

npm install -D eslint

npm install -D @types/node
```

---

# BUILD ORDER

The coding agent must implement features in this order.

Step 1

Project Setup

↓

Step 2

Tailwind

↓

Step 3

Design System

↓

Step 4

Landing Page

↓

Step 5

Companion Selection

↓

Step 6

Anonymous Chat

↓

Step 7

OpenRouter Integration

↓

Step 8

Supabase Authentication

↓

Step 9

Conversation Storage

↓

Step 10

Memory Summary

↓

Step 11

Pricing

↓

Step 12

Subscription Logic

↓

Step 13

Admin Dashboard

↓

Step 14

Optimization

↓

Step 15

Deployment

---

# MVP FEATURES

Landing Page

Companion Selection

Language Selection

Anonymous Chat

Four Free Messages

Login

Ten Free Messages

Subscription Placeholder

Conversation History

Memory Summary

Dark Mode

Light Mode

Responsive Design

---

# PHASE 2 FEATURES

Voice Input

Voice Output

Streaming

Push To Talk

Continuous Voice Mode

Notifications

Android App

---

# PHASE 3 FEATURES

Multiple Companions

Custom Companion

Companion Memories

Image Sharing

Voice Cloning

International Languages

---

# DATABASE SETUP

Generate Supabase migrations.

Enable Row Level Security.

Create policies.

Never disable security.

Use UUID primary keys.

Use timestamps.

---

# AUTHENTICATION

Support:

Google Login

Email Login

Anonymous Users

Anonymous users lose chat history if they never register.

---

# AI IMPLEMENTATION

Use OpenRouter only.

Never call OpenRouter directly from React.

Always use backend APIs.

Prompt construction must use PROMPT_ENGINE.md.

---

# MEMORY

Store:

Conversation Summary

Relationship Stage

Preferences

Important Facts

Never send full history to the model.

---

# UI REQUIREMENTS

Follow:

UI_DESIGN_SYSTEM.md

Do not invent styles.

Do not use placeholder layouts.

The application should feel premium from the first screen.

---

# PERFORMANCE TARGETS

Landing

<2 seconds

Chat

<1 second

AI Response

<5 seconds

Bundle

Optimized

Images

Lazy Loaded

---

# TEST BEFORE COMPLETION

Every completed feature must satisfy:

✓ TypeScript passes

✓ ESLint passes

✓ Production build succeeds

✓ Mobile responsive

✓ Desktop responsive

✓ Dark mode

✓ Light mode

✓ Error handling

✓ Loading states

✓ API connected

---

# GIT STRATEGY

Never commit directly to main.

Use feature branches.

Commit after every completed feature.

Use semantic commit messages.

---

# FINAL EXECUTION RULES

The AI coding agent must:

Read every document in `/docs` before writing code.

Never regenerate the entire application.

Never overwrite working code.

Always make incremental improvements.

Preserve architecture.

Maintain backward compatibility.

Keep business logic modular.

Write production-quality code only.

---

# FIRST TASK TO EXECUTE

Immediately after reading this document, begin implementing the project in the following order:

1. Initialize the Next.js project structure.
2. Configure Tailwind CSS.
3. Configure Supabase client.
4. Configure OpenRouter service.
5. Build the design system foundation.
6. Build the landing page.
7. Build the companion selection flow.
8. Build the anonymous chat experience.
9. Connect AI responses.
10. Continue according to the Build Order.

Do not stop after scaffolding. Continue implementing features until the MVP is complete unless a required secret (such as an API key) or external configuration is missing.

END OF PROJECT_BOOTSTRAP.md
