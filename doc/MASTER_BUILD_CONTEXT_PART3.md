# CONTINUE MASTER_BUILD_CONTEXT.md

# PART 3 — ENGINEERING ARCHITECTURE

---

# SECTION 21 — SYSTEM ARCHITECTURE

## Overview

Hartly AI follows a modern SaaS architecture designed to be scalable, modular, and maintainable.

```
Browser
        │
        ▼
Next.js Frontend
        │
        ▼
Next.js API Routes
        │
 ┌──────┴────────┐
 ▼               ▼
OpenRouter    Supabase
   │             │
   ▼             ▼
 AI         PostgreSQL
```

### Responsibilities

Frontend

* UI
* Navigation
* Client State
* Authentication State
* Chat Interface

Backend API

* Authentication
* AI Communication
* Memory
* Rate Limiting
* Prompt Construction
* Database Operations

Supabase

* Database
* Authentication
* Storage
* Row Level Security

OpenRouter

* AI Model Routing
* Model Switching
* Fallback Handling

---

# SECTION 22 — PROJECT FOLDER STRUCTURE

```
app/
    page.tsx
    layout.tsx

    chat/
        page.tsx

    setup/
        page.tsx

    pricing/
        page.tsx

    profile/
        page.tsx

    admin/
        page.tsx

    api/

        chat/

        auth/

        companions/

        memory/

        payment/

        admin/

components/

    ui/

    landing/

    chat/

    setup/

    pricing/

    profile/

    admin/

lib/

    ai/

    auth/

    database/

    prompts/

    memory/

    utils/

hooks/

types/

constants/

config/

public/

docs/
```

Rules

Never place business logic inside UI components.

Never call AI directly from React.

Never expose secrets.

---

# SECTION 23 — ENVIRONMENT VARIABLES

Required Variables

```
OPENROUTER_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

ADMIN_EMAIL=

UPI_ID=

NEXT_PUBLIC_SITE_URL=
```

Rules

Never expose secret keys.

Never hardcode credentials.

Use .env.local only.

---

# SECTION 24 — OPENROUTER ARCHITECTURE

Provider

OpenRouter

Primary Model

google/gemma-4-31b-it:free

Fallback

nvidia/nemotron-3-super-120b-a12b:free

Every request follows:

User Message

↓

Prompt Builder

↓

Memory Builder

↓

Language Builder

↓

Companion Builder

↓

OpenRouter

↓

AI Response

↓

Conversation Storage

↓

Return Response

---

Retry Logic

Primary Model fails

↓

Retry once

↓

Fallback Model

↓

Return Response

If both fail

↓

Return Friendly Error

Never expose raw API errors to users.

---

# SECTION 25 — PROMPT ENGINE

Every AI response is generated from a layered prompt.

Prompt Layers

Layer 1

Global System Prompt

Layer 2

Companion Personality

Layer 3

Language Rules

Layer 4

Relationship State

Layer 5

Conversation Summary

Layer 6

Current User Message

Final Prompt

↓

AI

The prompt must never be manually concatenated inside UI components.

Prompt generation belongs inside lib/prompts.

---

# SECTION 26 — CONVERSATION ENGINE

Every message follows this lifecycle.

User Sends Message

↓

Validate

↓

Authenticate User

↓

Fetch Companion

↓

Fetch Memory Summary

↓

Build Prompt

↓

Call OpenRouter

↓

Receive Response

↓

Save Conversation

↓

Update Summary

↓

Return Response

---

# SECTION 27 — MEMORY ARCHITECTURE

Anonymous Users

No permanent memory.

Temporary conversation only.

Registered Users

Conversation history stored.

Premium Users

Conversation history

*

Conversation summary

*

Relationship state

Conversation summaries should reduce token usage.

Do not send the full chat history every request.

Instead send:

Relationship Summary

*

Recent Messages

---

# SECTION 28 — AUTHENTICATION

Authentication Provider

Supabase

Methods

Google

Email

Password

Anonymous users

No authentication required.

Authentication begins only after anonymous limit.

Premium access must always verify the authenticated user.

---

# SECTION 29 — DATABASE TABLES

Required Tables

profiles

companions

conversations

messages

memory_summary

subscriptions

payments

analytics

admin_settings

feature_flags

Future Tables

voice_sessions

notifications

custom_companions

image_assets

---

# SECTION 30 — DATABASE RELATIONSHIPS

profiles

↓

conversations

↓

messages

profiles

↓

subscriptions

companions

↓

conversations

conversations

↓

memory_summary

payments

↓

subscriptions

Every foreign key must enforce referential integrity.

Use UUIDs for all primary keys.

---

# SECTION 31 — CHAT API

POST

/api/chat

Responsibilities

Validate Request

Authenticate

Check Limits

Build Prompt

Call AI

Save Conversation

Update Memory

Return Response

Never return OpenRouter response directly.

Always sanitize output.

---

# SECTION 32 — ERROR HANDLING

Possible Errors

Invalid Request

Unauthorized

Rate Limited

AI Timeout

Database Error

Unknown Error

Every error returns

```
success

message

code
```

Never expose stack traces.

Always log internally.

---

# SECTION 33 — LOGGING

Log

Authentication

Payments

AI Errors

Database Errors

Rate Limits

Conversation Errors

Never log

Passwords

API Keys

Sensitive User Information

---

# SECTION 34 — SECURITY

HTTPS Only

Environment Variables

Row Level Security

Server-side AI Calls

Input Validation

Output Sanitization

Rate Limiting

CSRF Protection

Future

Bot Detection

DDoS Protection

Abuse Monitoring

---

# SECTION 35 — PERFORMANCE

Target

Landing

< 2 seconds

Chat Response

2–5 seconds

Database Query

< 300ms

Bundle Size

Optimized

Use lazy loading where appropriate.

Cache companion configurations.

Reuse prompt templates.

---

# END OF PART 3
