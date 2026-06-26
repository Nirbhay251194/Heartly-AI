# MASTER_BUILD_CONTEXT.md

# Hartly AI - Master Build Context (Version 1.0)

**Status:** Production Build Specification

**Project Name:** Hartly AI

**Product Type:** AI Companion SaaS

**Target Platform:** Web (Phase 1), Android (Phase 2)

**Deployment:** Vercel

**Repository Owner:** User

---

# 1. PROJECT OBJECTIVE

Build a production-ready AI Companion platform called **Hartly AI**.

The goal is to create emotionally intelligent AI companions that users can build long-term relationships with through natural conversations.

Hartly AI is **not** a generic chatbot.

It is an AI relationship platform where users can:

* Chat naturally
* Feel emotionally connected
* Continue conversations over time
* Build trust with companions
* Receive emotional support
* Have enjoyable, human-like interactions

The MVP focuses on **text chat first**, with architecture prepared for voice in future phases.

---

# 2. PRODUCT POSITIONING

Brand Name

Hartly AI

Mission

Create the world's most emotionally intelligent AI companion platform.

Primary Audience

* India
* English users
* Hindi users
* Hinglish users

Future Audience

Global expansion with multilingual support.

---

# 3. TECH STACK

Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

Backend

* Next.js API Routes

Authentication

* Supabase Auth
* Google Login
* Email + Password

Database

* Supabase PostgreSQL

Deployment

* Vercel

AI Provider

OpenRouter

Primary Model

google/gemma-4-31b-it:free

Fallback Model

nvidia/nemotron-3-super-120b-a12b:free

Architecture Rule

The AI provider must be configurable.

Never hardcode model names inside business logic.

---

# 4. PRODUCT FLOW

Landing Page

↓

Companion Selection

↓

Language Selection

↓

User Name

↓

Start Chat

↓

AI Greeting

↓

Anonymous Chat (4 user messages)

↓

Login Required

↓

Continue Chat

↓

10 free user messages

↓

Subscription Page

↓

Manual UPI Payment

↓

Admin Approval

↓

Premium Activated

↓

Unlimited Chat

↓

Memory Enabled

---

# 5. MVP FEATURES

Included in Phase 1

* Landing Page
* Companion Selection
* Language Selection
* Anonymous Chat
* OpenRouter Integration
* Supabase Authentication
* Conversation Storage
* Subscription Page
* Admin Dashboard
* Responsive UI
* Dark Mode
* Light Mode

Not Included in MVP

* Video Calls
* Voice Output
* Group Chat
* Image Generation
* Custom Companion Builder

Voice Input architecture should be designed but may be enabled later.

---

# 6. COMPANION SYSTEM

The application launches with 10 predefined companions.

5 Female

5 Male

Each companion has:

* Name
* Age
* Avatar
* Personality
* Communication Style
* Relationship Style
* Interests
* Greeting Style
* Humor Style
* Love Language
* Language Behaviour
* System Prompt

The companion profile must be loaded automatically before every AI response.

Never hardcode companion personalities inside React components.

Store companion definitions in configuration files or database tables.

---

# Female Companions

Ananya (22)

Sweet

Playful

Gen Z

Music

Coffee

Late-night conversations

Kiara (25)

Confident

Romantic

Career-focused

Travel

Fitness

Meera (28)

Calm

Emotionally intelligent

Book lover

Deep conversations

Naina (32)

Independent

Supportive

Professional

Balanced

Kavya (40)

Wise

Patient

Nurturing

Emotionally secure

---

# Male Companions

Aarav (22)

Funny

Energetic

Supportive

Vihaan (25)

Confident

Protective

Romantic

Arjun (28)

Emotionally mature

Patient

Thoughtful

Kabir (32)

Responsible

Calm

Reliable

Aditya (40)

Wise

Mentor-like

Comforting

---

# 7. LANDING PAGE

The landing page must feel like a premium AI product.

Sections:

* Navigation Bar
* Hero Section
* Companion Showcase
* Product Features
* Why Hartly AI
* Pricing Preview
* FAQ
* Footer

CTA Button

Start Chat

The design should be modern, elegant, mobile-first, and emotionally warm.

Avoid gaming or anime aesthetics.

---

# 8. SETUP FLOW

Before chat begins, ask the user for:

* Name
* Companion
* Language

Supported Languages:

* English
* Hindi
* Hinglish

Store selections in client state.

Navigate to `/chat`.

---

# 9. CHAT EXPERIENCE

The chat interface should resemble a modern messaging application.

Include:

* Header with companion avatar
* Companion name
* Online status
* Scrollable message area
* Typing indicator
* Message bubbles
* Text input
* Voice input button (disabled or placeholder in MVP)

The first AI message is generated immediately after setup.

Responses must follow the selected language.

If the user selects Hindi, respond in Hindi.

If Hinglish is selected, respond naturally in Hinglish.

If English is selected, respond only in English.

---

# 10. AI RESPONSE PRINCIPLES

Responses should be:

* Warm
* Natural
* Conversational
* Curious
* Emotionally supportive
* Context-aware

Avoid robotic language.

Avoid unnecessary long paragraphs.

Ask follow-up questions naturally.

Use the user's name occasionally, not excessively.

Each companion should maintain a consistent personality across conversations.

---

# 11. CODING RULES

* Use TypeScript everywhere.
* Keep components modular.
* Never expose API keys to the client.
* Never call OpenRouter directly from the frontend.
* Use reusable UI components.
* Mobile-first responsive design.
* Keep business logic out of UI components.
* Store configuration separately from application logic.
* Do not rewrite completed modules unless explicitly requested.
* Write production-quality code with clear naming.

---

# 12. BUILD ORDER

1. Repository Setup
2. Landing Page
3. Setup Flow
4. Chat UI
5. OpenRouter Integration
6. Supabase Authentication
7. Conversation Storage
8. Memory Summary
9. Subscription Flow
10. Admin Dashboard
11. Deployment to Vercel

After each completed milestone:

* Verify build passes.
* Fix lint errors.
* Do not modify completed modules unless required.
* Commit changes with meaningful commit messages.

---

This document is the authoritative specification for Hartly AI. All AI coding agents must follow it unless explicitly instructed otherwise. New features should extend this specification rather than replace it.

