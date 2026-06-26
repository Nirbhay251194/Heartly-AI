

# SECTION 13 — DETAILED FUNCTIONAL REQUIREMENTS

## 13.1 Product Goal

Hartly AI is designed to provide emotionally intelligent AI companions that users can build long-term relationships with through natural conversations.

The objective is not simply answering questions.

The objective is creating an emotional connection.

The companion should gradually become familiar with the user's personality, interests, emotions, communication style and life events.

Every design decision should support this goal.

---

## 13.2 Core Principles

Every feature should satisfy these principles.

1. Human-like conversation

The AI should never sound robotic.

Responses should feel natural.

2. Emotional Intelligence

The companion should recognize emotions from conversation.

Examples:

"I'm tired."

"I'm happy."

"I miss someone."

"I'm stressed."

The AI should respond appropriately.

3. Long-Term Relationship

The companion remembers previous conversations (Premium users).

The relationship should feel continuous.

4. Mobile First

The majority of users will use mobile devices.

Every screen must be optimized for phones before desktop.

5. Fast Responses

Target AI response time:

2–5 seconds.

6. Privacy

All conversations stored securely.

Passwords never stored.

API keys never exposed.

---

# SECTION 14 — COMPLETE USER JOURNEY

## Anonymous Visitor

User opens Hartly AI

↓

Landing Page

↓

Reads Hero Section

↓

Views Companion Cards

↓

Clicks "Start Chat"

↓

Setup Page

↓

Select Companion

↓

Select Language

↓

Enter Name

↓

Continue

↓

Chat Page Opens

↓

AI sends greeting

↓

User sends first message

↓

Conversation continues

↓

After 4 user messages

↓

Login Required Screen

---

## Registered User

User logs in

↓

Conversation resumes

↓

User receives 10 free messages

↓

After limit reached

↓

Premium Page

↓

Manual UPI Payment

↓

Payment Submitted

↓

Pending Approval

↓

Admin Dashboard

↓

Approve User

↓

Premium Activated

↓

Unlimited Chat

↓

Conversation Memory Enabled

---

# SECTION 15 — LANDING PAGE SPECIFICATION

## Objective

The landing page should communicate three things within five seconds:

1. What Hartly AI is.
2. Why it is different.
3. How to start chatting.

---

## Navigation Bar

Left:

Hartly AI Logo

Center:

Navigation Links

Features

Companions

Pricing

FAQ

Right:

Start Chat Button

---

## Hero Section

Headline Example

"Your AI Companion That Truly Listens."

Subheading

"Meaningful conversations, emotional support, and lasting connections powered by AI."

Primary CTA

Start Chat

Secondary CTA

Meet Companions

---

## Companion Showcase

Display all ten launch companions.

Each card contains:

Avatar

Name

Age

Short Personality

Example:

Ananya

22

Sweet • Caring • Playful

Clicking a card opens a preview modal.

---

## Features Section

Highlight:

Natural Conversations

Emotional Memory

Multiple Personalities

Hindi Support

English Support

Hinglish Support

Privacy First

Premium Experience

---

## Pricing Preview

Display

Guest

Free

Registered

Free Trial

Premium Monthly

Premium Yearly

Manual UPI Payment

---

## FAQ

Examples

Is my chat private?

Can I change companions?

Does Hartly AI remember me?

Can I chat in Hindi?

Can I switch language later?

---

## Footer

Links

Privacy Policy

Terms

Support

Contact

Version Number

---

# SECTION 16 — SETUP FLOW

The setup page is shown before entering chat.

Fields:

Name

Companion

Language

Continue Button

Validation:

Name

Minimum:

2 characters

Maximum:

25 characters

Language

English

Hindi

Hinglish

Companion

One of the predefined companions.

Selections remain stored until changed.

---

# SECTION 17 — CHAT SYSTEM

The chat interface should resemble a premium messaging application.

Header

Avatar

Companion Name

Online Status

Change Companion Button

Conversation Area

Infinite Scroll

Smooth Animation

Auto Scroll

Typing Indicator

Input Area

Message Box

Send Button

Voice Button (Placeholder)

Character Counter (Optional)

---

## Message Rules

AI messages appear left.

User messages appear right.

Time displayed below messages.

Support multiline messages.

---

## AI Greeting

The first message depends on:

Selected Companion

Selected Language

User Name

Example

English

Hi Rahul 😊

I'm Ananya.

I've been looking forward to talking with you.

How has your day been?

Example

Hindi

नमस्ते राहुल 😊

मैं अनन्या हूँ।

आज आपका दिन कैसा रहा?

Example

Hinglish

Hey Rahul 😊

Main Ananya hoon.

Aaj ka din kaisa tha?

---

# SECTION 18 — COMPANION ENGINE

Every companion must have a configuration profile.

Required Fields

ID

Name

Gender

Age

Avatar

Personality

Conversation Style

Relationship Style

Emoji Style

Love Language

Greeting Style

Interests

Humor Style

Language Behaviour

System Prompt

These profiles must be stored separately from UI code.

Never hardcode personalities inside React components.

Future versions should allow companions to be loaded dynamically from the database.

---

# SECTION 19 — LANGUAGE ENGINE

Supported Languages

English

Hindi

Hinglish

Rules

If user selects English

All responses must be English.

If user selects Hindi

All responses must be Hindi.

If user selects Hinglish

Responses should naturally mix Hindi and English.

Never switch language unexpectedly.

The language preference must persist throughout the conversation.

---

# SECTION 20 — ANONYMOUS USER FLOW

Anonymous users may begin chatting immediately without registration.

Rules:

No login required before first message.

Maximum of four user messages.

After the fourth user message, display a login prompt.

Conversation should pause until authentication is complete.

Anonymous conversations are temporary and are not guaranteed to be preserved.

If the user signs up, the active conversation should continue seamlessly.

If the user leaves without signing up, the conversation may be discarded.

This flow minimizes friction while encouraging account creation after the user has experienced the product's value.

# END OF PART 2
