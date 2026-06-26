# CONTINUE MASTER_BUILD_CONTEXT.md

# PART 9 — DEPLOYMENT, DEVOPS, SECURITY & PRODUCTION ARCHITECTURE

---

# SECTION 151 — DEPLOYMENT PHILOSOPHY

Hartly AI must be designed as a production-grade SaaS platform from day one.

The initial launch will support hundreds of users, but the architecture should scale to tens of thousands without major rewrites.

The application must remain:

• Modular

• Secure

• Observable

• Cloud-native

• Provider-independent

---

# SECTION 152 — TECHNOLOGY STACK

Frontend

Next.js 15 (App Router)

TypeScript

Tailwind CSS

React

Backend

Next.js API Routes

TypeScript

Database

Supabase PostgreSQL

Authentication

Supabase Auth

Google OAuth

Email Authentication

AI

OpenRouter

Primary

google/gemma-4-31b-it:free

Fallback

nvidia/nemotron-3-super-120b-a12b:free

Hosting

Vercel

Storage

Supabase Storage

Images

Next.js Image Optimization

Analytics

PostHog (Future)

Google Analytics

Monitoring

Sentry

Vercel Analytics

---

# SECTION 153 — PROJECT STRUCTURE

```text
/app
    /(marketing)
    /(auth)
    /(dashboard)
    /chat
    /api
/components
/features
/lib
/hooks
/services
/prompts
/config
/constants
/types
/utils
/public
/docs
```

Business logic must never be placed inside UI components.

---

# SECTION 154 — CONFIGURATION MANAGEMENT

All configuration values must come from environment variables.

Examples:

OPENROUTER_API_KEY

SUPABASE_URL

SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

NEXT_PUBLIC_APP_NAME

NEXT_PUBLIC_BASE_URL

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

Never hardcode secrets.

---

# SECTION 155 — ENVIRONMENT STRATEGY

Development

Local machine

↓

Staging

Testing deployment

↓

Production

Public deployment

Each environment has separate environment variables.

Separate databases for staging and production.

---

# SECTION 156 — AUTHENTICATION FLOW

Anonymous User

↓

Temporary Session

↓

4 Free Messages

↓

Login Required

↓

Authenticated User

↓

10 Free Messages

↓

Subscription Prompt

↓

Premium Access

Session tokens should be securely managed.

---

# SECTION 157 — AUTHORIZATION

User

Access own conversations.

Admin

Access dashboard.

Moderator (Future)

Manage companions and reports.

Role-based authorization must be enforced server-side.

---

# SECTION 158 — API DESIGN PRINCIPLES

RESTful API structure.

Examples:

POST /api/chat

POST /api/auth/login

POST /api/payment/request

GET /api/profile

GET /api/conversations

POST /api/memory/update

DELETE /api/account

Every endpoint validates input and returns structured JSON.

---

# SECTION 159 — RATE LIMITING

Anonymous

20 requests/hour

Authenticated

Higher limits

Premium

Highest limits

Protect AI endpoints from abuse.

---

# SECTION 160 — SECURITY

HTTPS only.

CSRF protection.

Input validation.

Output sanitization.

Secure cookies.

Environment secrets.

Row Level Security in Supabase.

Prepared database queries.

No sensitive data in logs.

---

# SECTION 161 — DATABASE BACKUP

Automatic daily backups.

Point-in-time recovery where available.

Backup retention policy.

Periodic restore testing.

---

# SECTION 162 — LOGGING

Application logs

API logs

Authentication logs

AI provider logs

Payment logs

Admin actions

Logs must exclude user secrets and private message content unless explicitly required for debugging with appropriate safeguards.

---

# SECTION 163 — ERROR HANDLING

Errors should include:

Timestamp

Request ID

Error Type

Component

Severity

User-friendly messages on the frontend.

Detailed logs on the backend.

---

# SECTION 164 — MONITORING

Track:

API latency

Database latency

AI latency

Memory usage

Error rate

Login success

Conversation count

Fallback usage

Active users

Dashboard updates in near real time where feasible.

---

# SECTION 165 — ANALYTICS

Business Metrics

Daily Active Users

Monthly Active Users

Retention

Conversation Length

Messages Per User

Companion Popularity

Subscription Conversion

AI Cost

Average Session Duration

---

# SECTION 166 — COST MONITORING

Track:

Tokens per request

Tokens per user

Cost per user

Cost per companion

Fallback usage

Monthly AI spending

Database usage

Storage usage

Set alerts when thresholds are exceeded.

---

# SECTION 167 — PERFORMANCE TARGETS

Landing Page

<2 seconds

Chat Load

<1 second

AI Response

<5 seconds

Database Query

<200ms

API Response

<500ms (excluding AI generation)

---

# SECTION 168 — IMAGE STRATEGY

Use optimized formats.

Responsive sizes.

Lazy loading.

CDN delivery.

Avatar caching.

Avoid oversized assets.

---

# SECTION 169 — CACHING

Cache:

Companion list

Configuration

Prompt templates

Static assets

Marketing pages

Do not cache:

Private conversations

Authentication tokens

Sensitive profile information

---

# SECTION 170 — CI/CD

GitHub

↓

Pull Request

↓

Automated Checks

↓

Build

↓

Preview Deployment

↓

Approval

↓

Production Deployment

Deployments should be repeatable and automated.

---

# SECTION 171 — TESTING

Unit Tests

Component Tests

API Tests

Authentication Tests

Database Tests

Conversation Flow Tests

Regression Tests

Manual Acceptance Testing

Critical paths must be tested before release.

---

# SECTION 172 — RECOVERY

Deployment rollback.

Database recovery.

Environment restoration.

Incident documentation.

Status page (future).

---

# SECTION 173 — ADMIN DASHBOARD

Dashboard sections:

Overview

Users

Conversations

Companions

Subscriptions

Payment Requests

Analytics

AI Models

Prompt Versions

System Settings

Logs

Health Status

---

# SECTION 174 — PAYMENT OPERATIONS

Phase 1

Manual UPI Payments

User uploads transaction details.

Admin verifies.

Subscription activated manually.

Phase 2

Razorpay

Stripe

Webhook automation

Subscription lifecycle management.

---

# SECTION 175 — COMPLIANCE

Privacy Policy

Terms of Service

Cookie Notice

Data Deletion

Account Deletion

User Consent

Export User Data (Future)

Comply with applicable privacy regulations for the target markets.

---

# SECTION 176 — SCALABILITY ROADMAP

Stage 1

100 Users

↓

Stage 2

1,000 Users

↓

Stage 3

10,000 Users

↓

Stage 4

100,000 Users

↓

Stage 5

1,000,000 Users

Architecture should scale horizontally where appropriate.

---

# SECTION 177 — DISASTER RECOVERY

Recovery Objectives:

Rapid rollback.

Database restore.

Configuration restore.

Secret rotation.

Service failover planning.

Document recovery procedures.

---

# SECTION 178 — FUTURE ARCHITECTURE

Native Android

Native iOS

Desktop App

Voice Streaming

Video Companion

Wearables

Smart Speakers

Multilingual Expansion

The core Conversation Engine remains unchanged.

---

# SECTION 179 — PRODUCTION READINESS CHECKLIST

✓ Secure Authentication

✓ Database Security

✓ AI Fallback

✓ Monitoring

✓ Logging

✓ Error Tracking

✓ Analytics

✓ Backups

✓ CI/CD

✓ Environment Management

✓ Admin Dashboard

✓ Subscription Management

✓ Performance Optimization

---

# SECTION 180 — DEPLOYMENT SUMMARY

Hartly AI is designed as a cloud-native, modular, scalable SaaS platform.

Every subsystem is isolated through clear interfaces, enabling future enhancements without major architectural changes.

The production architecture emphasizes:

• Reliability

• Security

• Scalability

• Maintainability

• Cost Awareness

• Excellent User Experience

---

# END OF PART 9
