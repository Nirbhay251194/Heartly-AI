# CONTINUE MASTER_BUILD_CONTEXT.md

# PART 4 — DATABASE, BUSINESS LOGIC & SUBSCRIPTION ARCHITECTURE

---

# SECTION 36 — DATABASE DESIGN PRINCIPLES

Hartly AI uses **Supabase PostgreSQL** as the primary database.

### Rules

* Every table uses UUID as the primary key.
* Every table includes `created_at` and `updated_at`.
* Never duplicate user data across tables.
* Use foreign keys to maintain relationships.
* Enable Row Level Security (RLS) on every user-facing table.
* Keep companion definitions configurable.

---

# SECTION 37 — TABLE: profiles

Stores authenticated user information.

### Columns

```text
id (UUID, Primary Key)
email (TEXT, Unique)
display_name (TEXT)
avatar_url (TEXT)
auth_provider (TEXT)
preferred_language (TEXT)
current_companion_id (UUID)
subscription_status (TEXT)
subscription_expiry (TIMESTAMP)
daily_free_messages_used (INTEGER)
total_messages (INTEGER)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

Relationship

```text
profiles
    │
    ├── conversations
    ├── subscriptions
    ├── payments
    └── analytics
```

---

# SECTION 38 — TABLE: companions

Stores predefined companion profiles.

### Columns

```text
id
name
gender
age
avatar_url
personality
relationship_style
conversation_style
emoji_style
love_language
humor_style
interests
greeting_prompt
system_prompt
is_active
display_order
created_at
updated_at
```

Rules

* Do not hardcode companion profiles.
* Load dynamically.
* Future versions should allow adding companions without changing code.

---

# SECTION 39 — TABLE: conversations

One active conversation per companion per user.

### Columns

```text
id
profile_id
companion_id
title
status
last_message_at
created_at
updated_at
```

Rules

* One continuous conversation by default.
* Future versions may support multiple conversations.

---

# SECTION 40 — TABLE: messages

Stores every message.

### Columns

```text
id
conversation_id
sender
message
language
token_count
created_at
```

Sender values

```text
user

assistant

system
```

Messages should never be deleted automatically.

---

# SECTION 41 — TABLE: memory_summary

Purpose

Reduce AI token usage.

Instead of sending the complete conversation history, periodically summarize the conversation.

### Columns

```text
id
conversation_id
summary
relationship_stage
last_updated_message
created_at
updated_at
```

Summary should include

* Important events
* Preferences
* Goals
* Emotional context
* Running relationship summary

---

# SECTION 42 — TABLE: subscriptions

### Columns

```text
id
profile_id
plan
status
start_date
end_date
approved_by
created_at
updated_at
```

Plans

```text
FREE

MONTHLY

YEARLY
```

Status

```text
ACTIVE

PENDING

EXPIRED

CANCELLED
```

---

# SECTION 43 — TABLE: payments

Stores manual UPI payment submissions.

### Columns

```text
id
profile_id
amount
plan
upi_transaction_id
payment_screenshot_url
payment_status
admin_notes
created_at
updated_at
```

Payment Status

```text
Pending

Approved

Rejected
```

---

# SECTION 44 — TABLE: analytics

Track product usage.

### Columns

```text
id
profile_id
event_name
metadata
created_at
```

Track events

* User Signup
* Start Chat
* Login
* Subscription Click
* Payment Submitted
* Premium Activated
* Message Sent
* Companion Changed

---

# SECTION 45 — ANONYMOUS USER RULES

Anonymous users may

* Open website
* Select companion
* Select language
* Enter name
* Chat

Restrictions

Maximum

4 user messages

After limit

Display Login Screen

Conversation is temporary.

No permanent memory.

---

# SECTION 46 — REGISTERED USER RULES

After login

User receives

10 free messages.

Counter resets daily.

After limit

Show Subscription Page.

Conversation history is saved.

---

# SECTION 47 — PREMIUM USER RULES

Premium unlocks

Unlimited messages

Conversation summaries

Relationship progression

Priority AI model routing

Long-term memory

Future voice support

Premium users should never see message limits.

---

# SECTION 48 — SUBSCRIPTION FLOW

Guest

↓

Chat

↓

4 Messages

↓

Login

↓

10 Messages

↓

Subscription Screen

↓

Select Plan

↓

Display UPI QR

↓

User Pays

↓

Upload Screenshot

↓

Submit Transaction ID

↓

Admin Review

↓

Approve

↓

Premium Activated

---

# SECTION 49 — MANUAL PAYMENT SYSTEM

No Razorpay in MVP.

Accepted payment

UPI

Required

* Transaction ID
* Screenshot
* Selected Plan

Admin verifies manually.

Only admin can activate premium.

---

# SECTION 50 — ADMIN DASHBOARD

Admin authentication required.

Modules

Dashboard

Users

Companions

Payments

Subscriptions

Analytics

AI Settings

Feature Flags

Logs

---

Dashboard Metrics

Daily Active Users

New Users

Anonymous Users

Registered Users

Premium Users

Average Conversation Length

AI Requests

Fallback Model Usage

Estimated AI Cost

---

# SECTION 51 — COMPANION MANAGEMENT

Admin can

Enable companion

Disable companion

Edit personality

Edit prompt

Upload avatar

Change greeting

Reorder display

Future

Create custom companions

---

# SECTION 52 — FEATURE FLAGS

Feature flags stored in database.

Examples

```text
voice_enabled

memory_enabled

subscription_enabled

analytics_enabled

maintenance_mode
```

No feature should require code deployment to enable or disable.

---

# SECTION 53 — ANALYTICS STRATEGY

Track

Retention

Conversation duration

Messages per session

Popular companions

Language preference

Subscription conversion

Average AI response time

Fallback model usage

Token consumption

Use analytics to improve product decisions.

---

# SECTION 54 — MEMORY UPDATE STRATEGY

Conversation summaries should update intelligently.

Recommended logic

* After every 20–30 messages, or
* When the conversation reaches a meaningful milestone (for example, the user shares a long-term goal or preference).

The summary should preserve context while reducing token usage.

Never send the entire conversation history to the AI model unless explicitly required.

---

# END OF PART 4
