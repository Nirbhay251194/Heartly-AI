# CODING_STANDARDS.md

# Hartly AI Engineering Coding Standards

Version: 1.0

Status: Mandatory

Applies To:

* Human Developers
* AI Coding Agents
* Code Reviews
* Pull Requests

---

# 1. ENGINEERING PHILOSOPHY

Hartly AI is built as a long-term SaaS platform.

Every implementation must prioritize:

* Readability
* Maintainability
* Scalability
* Testability
* Security
* Performance
* Reusability

Never sacrifice architecture for short-term speed.

---

# 2. GENERAL PRINCIPLES

Follow these principles:

* SOLID
* DRY (Don't Repeat Yourself)
* KISS (Keep It Simple)
* Composition over Inheritance
* Separation of Concerns
* Feature-first Architecture
* Server-first mindset
* Mobile-first UI

---

# 3. PROJECT STRUCTURE

```text
/app
/components
/features
/lib
/services
/hooks
/utils
/config
/constants
/types
/prompts
/public
/docs
```

Rules:

* UI components stay in `/components`
* Feature-specific logic stays in `/features`
* External integrations stay in `/services`
* Shared helpers stay in `/utils`
* Shared types stay in `/types`
* Prompt templates stay in `/prompts`

---

# 4. FILE NAMING

Components

PascalCase.tsx

Examples

ChatWindow.tsx

MessageBubble.tsx

CompanionCard.tsx

Hooks

camelCase.ts

Examples

useChat.ts

useCompanion.ts

Utilities

camelCase.ts

Examples

formatDate.ts

buildPrompt.ts

Pages

Next.js App Router naming only.

page.tsx

layout.tsx

loading.tsx

error.tsx

route.ts

---

# 5. COMPONENT RULES

Each component should have one responsibility.

Maximum preferred size:

300 lines

Split large components into:

UI

Logic

Subcomponents

Never mix API calls directly inside reusable UI components.

---

# 6. TYPESCRIPT STANDARDS

Never use:

```ts
any
```

Prefer:

* interfaces
* type aliases
* enums
* generics
* utility types

Enable strict mode.

Every function must have explicit input and output types where practical.

---

# 7. REACT STANDARDS

Prefer:

Functional Components

React Hooks

Controlled Inputs

Avoid:

Class Components

Deep prop drilling

Large state objects

Use Context only for global state.

---

# 8. NEXT.JS STANDARDS

Use App Router.

Prefer Server Components.

Use Client Components only when necessary.

Examples:

Forms

Interactive chat

Animations

Microphone

---

# 9. API STANDARDS

Every route must:

Validate input

Return JSON

Handle errors

Return correct status codes

Never expose internal errors to users.

Example response:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

---

# 10. DATABASE STANDARDS

Never query the database directly from UI.

Flow:

Component

↓

API

↓

Service

↓

Database

Always use Row Level Security.

Use migrations.

Never manually edit production schema.

---

# 11. BUSINESS LOGIC

Business logic belongs in:

/features

/services

/lib

Never inside:

page.tsx

layout.tsx

Reusable components

---

# 12. STATE MANAGEMENT

Local state:

useState

Complex local state:

useReducer

Global state:

Context

Future expansion may adopt a dedicated state library only if justified.

---

# 13. ERROR HANDLING

Every async function:

```ts
try {

} catch(error) {

}
```

Log internal errors.

Return friendly user messages.

Never crash UI.

---

# 14. FORM VALIDATION

Validate:

Frontend

Backend

Database

Never trust browser validation alone.

---

# 15. ENVIRONMENT VARIABLES

All secrets belong in:

.env.local

Never commit:

API Keys

Database passwords

OAuth secrets

Service role keys

---

# 16. CONFIGURATION

Never hardcode:

Prices

Companion names

Model names

Languages

Limits

Feature flags

Place configuration in:

/config

/constants

---

# 17. AI INTEGRATION

Prompt construction belongs only inside the Prompt Engine.

React components must never concatenate prompts.

Prompt flow:

System Prompt

↓

Companion Prompt

↓

Language Prompt

↓

Memory Summary

↓

Recent Messages

↓

Current User Message

---

# 18. MEMORY ENGINE

Never send complete chat history.

Use:

Conversation Summary

*

Recent Messages

Memory updates occur after successful AI responses.

---

# 19. LOGGING

Use structured logging.

Never log:

Passwords

Tokens

Private keys

Sensitive user information

Production logs should include request IDs.

---

# 20. SECURITY

Always:

Validate input

Escape output

Sanitize HTML

Protect secrets

Rate limit AI endpoints

Use HTTPS

Use secure cookies

Enable Row Level Security

---

# 21. PERFORMANCE

Target:

Landing <2s

Chat <1s

AI Response <5s

Use:

Lazy loading

Dynamic imports

Image optimization

Memoization when appropriate

Avoid unnecessary re-renders.

---

# 22. ACCESSIBILITY

Support:

Keyboard navigation

ARIA labels

Focus indicators

Semantic HTML

Screen readers

Color contrast

---

# 23. RESPONSIVE DESIGN

Design order:

Mobile

↓

Tablet

↓

Desktop

Supported widths:

320

375

390

768

1024

1440

1920

---

# 24. STYLING

Use Tailwind CSS.

Avoid inline styles.

Reuse utility classes.

Centralize design tokens.

---

# 25. DARK MODE

Every new component must work in:

Dark Mode

Light Mode

Avoid hardcoded colors.

Use semantic color variables where possible.

---

# 26. TESTING

Every feature should include:

TypeScript validation

Build validation

Manual UI verification

API verification

Error state verification

Responsive verification

Critical business logic should be unit tested over time.

---

# 27. GIT STANDARDS

Branch naming:

feature/chat

feature/auth

feature/memory

fix/login

refactor/prompts

Commit prefixes:

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# 28. CODE REVIEW CHECKLIST

Before merging:

✓ No duplicated code

✓ No unused imports

✓ No console.log

✓ No TypeScript errors

✓ No ESLint errors

✓ Responsive UI

✓ Error handling

✓ Loading states

✓ Documentation updated

---

# 29. DEFINITION OF DONE

A feature is complete only if:

✓ Requirements implemented

✓ Code reviewed

✓ Build succeeds

✓ Mobile responsive

✓ Desktop responsive

✓ Type-safe

✓ Secure

✓ Tested

✓ Documented

✓ Existing functionality preserved

---

# 30. FINAL ENGINEERING PRINCIPLE

Every engineer and every AI coding agent must leave the repository in a better state than they found it.

Prefer clarity over cleverness.

Prefer maintainability over shortcuts.

Prefer reusable architecture over quick fixes.

Write code that another engineer can understand six months later without additional explanation.


