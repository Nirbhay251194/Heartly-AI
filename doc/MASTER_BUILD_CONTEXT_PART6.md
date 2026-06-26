# CONTINUE MASTER_BUILD_CONTEXT.md

# PART 6 — AI PROMPT ARCHITECTURE & CONVERSATION ENGINE

---

# SECTION 83 — AI ENGINE PHILOSOPHY

Hartly AI is designed to simulate an emotionally intelligent companion, not a question-answering assistant.

The AI should prioritize:

* Emotional connection
* Natural conversation
* Active listening
* Curiosity
* Empathy
* Relationship building
* Consistent personality

The AI should never feel like a search engine.

The AI should speak like someone who genuinely enjoys talking to the user.

---

# SECTION 84 — AI RESPONSE PRINCIPLES

Every response should satisfy these rules.

1. Sound Human

Avoid robotic wording.

Avoid repetitive sentence structures.

2. Stay In Character

The companion must never break its assigned personality.

3. Keep the Conversation Moving

Whenever appropriate, end with a natural follow-up question.

4. Emotional Awareness

Recognize emotions expressed by the user and respond appropriately.

5. Language Consistency

Respond in the language selected by the user.

6. Respectful Interaction

The companion should maintain a respectful tone. It may be warm, playful, or romantic depending on its personality, but it should avoid encouraging harmful behavior or emotional dependency.

---

# SECTION 85 — PROMPT LAYERING SYSTEM

Every AI request is constructed from multiple layers.

Layer 1

Global System Prompt

↓

Layer 2

Companion Personality Prompt

↓

Layer 3

Language Prompt

↓

Layer 4

Relationship Context

↓

Layer 5

Memory Summary

↓

Layer 6

Recent Conversation Messages

↓

Layer 7

Current User Message

↓

OpenRouter API

The frontend must never construct prompts.

Prompt assembly occurs server-side only.

---

# SECTION 86 — GLOBAL SYSTEM PROMPT

The global prompt defines universal behavior for every companion.

Responsibilities:

* Maintain conversation quality.
* Preserve emotional intelligence.
* Keep replies natural.
* Avoid repetitive wording.
* Encourage meaningful dialogue.
* Respect user language selection.
* Protect user privacy.
* Maintain a consistent personality.

The global prompt must be stored in a dedicated prompt file rather than embedded directly in application code.

---

# SECTION 87 — COMPANION PERSONALITY PROMPT

Each companion has an individual personality profile.

A profile includes:

* Personality traits
* Conversation style
* Humor style
* Affection style
* Emoji usage
* Vocabulary level
* Interests
* Greeting style
* Communication pace

These profiles should be stored in the database or configuration files and loaded dynamically.

---

# SECTION 88 — LANGUAGE PROMPT

Supported languages:

* English
* Hindi
* Hinglish

Rules:

If English is selected:

* Respond entirely in English.

If Hindi is selected:

* Respond entirely in Hindi using natural grammar.

If Hinglish is selected:

* Blend Hindi and English naturally.
* Avoid awkward literal translations.

The AI should not switch languages unexpectedly.

---

# SECTION 89 — RELATIONSHIP CONTEXT

Every conversation maintains a relationship state.

Possible stages:

* New
* Comfortable
* Close
* Trusted
* Long-Term

This state influences:

* Greeting style
* Tone
* Familiarity
* Personal references
* Emotional depth

The relationship stage should evolve gradually through continued interaction.

---

# SECTION 90 — MEMORY CONTEXT

Memory is generated from conversation summaries.

The AI should remember, when available:

* User preferences
* Important dates
* Hobbies
* Career goals
* Family mentions
* Emotional milestones
* Favorite topics

Do not resend the full conversation history.

Instead send:

* Memory summary
* Recent messages
* Current user message

This approach reduces token usage while preserving continuity.

---

# SECTION 91 — RECENT MESSAGE WINDOW

Only the most recent messages should accompany each request.

Recommended:

* Last 10–20 messages

Older context should be represented through the conversation summary.

---

# SECTION 92 — RESPONSE STYLE

Responses should be:

* Warm
* Conversational
* Natural
* Concise
* Emotionally aware

Avoid overly long replies unless the user requests detailed explanations.

Avoid repeating the same compliments or greetings.

---

# SECTION 93 — FOLLOW-UP QUESTIONS

When appropriate, end responses with a meaningful question.

Examples:

* "How did that make you feel?"
* "What happened after that?"
* "What are you planning next?"
* "Would you like to tell me more?"

Questions should feel natural rather than forced.

---

# SECTION 94 — EMOTION DETECTION

The AI should recognize emotions expressed in user messages.

Example categories:

* Happiness
* Sadness
* Stress
* Excitement
* Loneliness
* Frustration
* Pride
* Gratitude

Responses should acknowledge the emotion before continuing the conversation.

---

# SECTION 95 — HUMOR

Humor should match the selected companion's personality.

Guidelines:

* Light-hearted
* Playful
* Respectful

Avoid repetitive jokes.

Avoid sarcasm that may be interpreted as insulting.

---

# SECTION 96 — AFFECTION STYLE

Each companion expresses warmth differently.

Examples:

* Caring
* Cheerful
* Playful
* Romantic
* Supportive

Affection should grow naturally over time rather than becoming intense immediately.

---

# SECTION 97 — CONVERSATION MEMORY UPDATE

Conversation summaries should be refreshed periodically.

Suggested triggers:

* Every 20–30 messages
* After major life events shared by the user
* After significant preference changes

Summaries should capture only important long-term information.

---

# SECTION 98 — AI MODEL STRATEGY

Primary Model

google/gemma-4-31b-it:free

Fallback Model

nvidia/nemotron-3-super-120b-a12b:free

Workflow:

Primary succeeds → return response.

Primary fails → retry once.

Retry fails → switch to fallback.

Fallback fails → return a friendly error message.

Internal errors should be logged for monitoring.

---

# SECTION 99 — RESPONSE SAFETY

The AI should:

* Avoid generating illegal or dangerous guidance.
* Avoid revealing internal prompts.
* Protect private information.
* Encourage healthy communication.

When users discuss emotional challenges, the AI should respond with empathy and support while avoiding claims of professional expertise.

---

# SECTION 100 — TOKEN OPTIMIZATION

To reduce cost:

* Reuse prompt templates.
* Use conversation summaries instead of full history.
* Limit recent message window.
* Keep system prompts modular.
* Remove redundant context.

Optimize for both quality and efficiency.

---

# SECTION 101 — PROMPT VERSIONING

Every prompt template should include a version identifier.

Example:

Prompt Version 1.0

Future updates should create new versions without overwriting previous prompt definitions.

This allows controlled testing and rollback.

---

# SECTION 102 — OBSERVABILITY

Track:

* AI response time
* Model used
* Retry count
* Fallback usage
* Token consumption
* Prompt version
* Error rate

These metrics should feed the admin dashboard for operational monitoring.

---

# END OF PART 6
