# CONTINUE MASTER_BUILD_CONTEXT.md

# PART 8 — VOICE ENGINE, REAL-TIME CONVERSATION & MULTIMODAL ARCHITECTURE

---

# SECTION 124 — VISION

Hartly AI is designed as a text-first emotional companion platform.

However, the complete backend architecture must be built so that voice conversations can be enabled without changing business logic.

Text and Voice are simply two different input/output methods for the same Conversation Engine.

There must never be separate AI logic for text and voice.

Both should use the same:

• Companion Personality

• Memory Engine

• Prompt Engine

• Conversation Context

• Relationship State

• User Profile

---

# SECTION 125 — PHASE ROADMAP

Version 1

✓ Text Chat

✓ OpenRouter

✓ Companion Memory

✓ Multiple Companions

✓ Authentication

Version 2

✓ Voice Input

✓ Speech Recognition

✓ AI Text Response

✓ Voice Output

✓ Push-to-Talk

Version 3

✓ Continuous Voice Conversation

✓ Streaming Audio

✓ Interrupt AI

✓ Voice Emotion

✓ Real-time Conversation

---

# SECTION 126 — VOICE ARCHITECTURE

Voice Pipeline

User Speaks

↓

Microphone

↓

Speech-To-Text

↓

Conversation Engine

↓

OpenRouter

↓

AI Response

↓

Text-To-Speech

↓

Speaker Output

Conversation Memory remains exactly the same.

---

# SECTION 127 — SPEECH TO TEXT

Architecture

```text
Voice Provider Interface

↓

Google Speech

↓

Deepgram

↓

Whisper

↓

Future Providers
```

The frontend never directly depends on one provider.

Everything goes through the Voice Service Layer.

---

# SECTION 128 — TEXT TO SPEECH

Architecture

```text
Voice Output Interface

↓

ElevenLabs

↓

Azure Voice

↓

Google Voice

↓

OpenAI Voice

↓

Future Providers
```

Changing providers should only require updating configuration.

No frontend modification.

---

# SECTION 129 — USER INPUT TYPES

Every chat message can originate from:

Text Input

Voice Input

Future

Image

Document

Video

The backend stores all messages using the same schema.

Only the input type changes.

---

# SECTION 130 — MESSAGE TYPES

Supported Types

TEXT

VOICE

IMAGE

SYSTEM

SUMMARY

MEMORY

Future

VIDEO

FILE

Each message includes:

id

conversationId

sender

type

content

createdAt

language

metadata

---

# SECTION 131 — AUDIO RECORDING

Launch

Push-To-Talk

User presses microphone.

Recording begins.

User releases.

Recording uploads.

Future

Continuous Recording

Voice Activity Detection

Auto Pause

Interruptions

Streaming

---

# SECTION 132 — LANGUAGE ENGINE

Supported

English

Hindi

Hinglish

Future

Gujarati

Punjabi

Bengali

Tamil

Telugu

Kannada

Malayalam

Marathi

The selected language controls:

Speech Recognition

AI Prompt

AI Response

Voice Output

---

# SECTION 133 — LANGUAGE DETECTION

Modes

Manual

Automatic

Launch

Manual

Future

Automatic Language Detection

Confidence Score

Fallback Language

---

# SECTION 134 — VOICE PERSONALITY

Each companion eventually receives an exclusive voice.

Example

Ananya

Young

Energetic

Cute

Fast Speaking

Kavya

Soft

Calm

Elegant

Naina

Confident

Slow

Warm

Kabir

Deep

Mature

Relaxed

Voice characteristics should match personality while remaining clearly synthetic and not modeled on a real identifiable person.

---

# SECTION 135 — AUDIO STREAMING

Future Architecture

Microphone

↓

Streaming Upload

↓

Streaming STT

↓

Streaming Prompt

↓

Streaming OpenRouter

↓

Streaming TTS

↓

Audio Playback

↓

Continue Listening

No backend redesign required.

---

# SECTION 136 — INTERRUPTION ENGINE

If User Speaks

↓

Immediately Stop Voice Playback

↓

Cancel Remaining Audio

↓

Continue Listening

↓

Generate New Reply

This should feel like a natural human conversation.

---

# SECTION 137 — VOICE SETTINGS

Each user profile stores

Voice Enabled

Voice Provider

Playback Speed

Playback Volume

Voice Type

Push-To-Talk

Continuous Mode

Auto Play

Microphone Permission

Preferred Language

---

# SECTION 138 — LATENCY TARGET

Speech Recognition

<2 Seconds

AI Generation

<2 Seconds

Speech Generation

<1 Second

Playback

Immediate

Target Total

<5 Seconds

---

# SECTION 139 — VOICE SESSION

Every voice conversation contains

Session ID

Conversation ID

Language

Current Companion

Current Prompt

Memory Summary

Voice Provider

TTS Provider

Transcript

Audio Metadata

---

# SECTION 140 — TRANSCRIPT ENGINE

Every voice message

↓

Speech Recognition

↓

Transcript Generated

↓

Stored as Normal Chat

↓

Memory Updated

↓

Summary Updated

Voice conversations become searchable.

---

# SECTION 141 — ERROR HANDLING

Possible Errors

Microphone Denied

Recognition Failed

Network Lost

Voice Generation Failed

Playback Failed

Fallback

Display Error

Switch To Text

Continue Conversation

Conversation never stops.

---

# SECTION 142 — PRIVACY

Audio recordings are temporary.

Permanent storage requires explicit user consent.

Default behavior:

Store transcript.

Discard raw audio after processing unless retention is enabled.

Users can delete transcripts and associated conversation history.

---

# SECTION 143 — MOBILE EXPERIENCE

Large Microphone Button

Thumb Friendly

Minimal UI

Haptic Feedback

Noise Indicator

Recording Animation

Waveform Animation

Auto Scroll

---

# SECTION 144 — DESKTOP EXPERIENCE

Keyboard Shortcut

Space To Talk

Push-To-Talk

Waveform

Conversation Panel

Transcript Panel

Audio Settings

---

# SECTION 145 — ACCESSIBILITY

Captions

Transcript

Keyboard Support

Screen Reader Labels

Microphone Instructions

High Contrast

Adjustable Font

---

# SECTION 146 — FUTURE AI FEATURES

Emotion Recognition

Voice Mood

Conversation Energy

Pause Detection

Laugh Detection

Breathing Detection

Speaking Speed

Silence Detection

These should enhance the experience only if implemented responsibly and with user transparency.

---

# SECTION 147 — FUTURE VOICE MODES

Romantic Mode

Supportive Mode

Motivational Mode

Sleep Mode

Meditation Mode

Story Mode

Podcast Mode

Daily Journal

These modes reuse the same Conversation Engine.

---

# SECTION 148 — VOICE COST OPTIMIZATION

Use cached voices where appropriate.

Avoid regenerating identical greetings.

Compress audio before upload.

Batch transcription when practical.

Monitor provider usage.

Track cost per minute.

---

# SECTION 149 — ANALYTICS

Track

Voice Sessions

Minutes Used

Recognition Accuracy

Playback Time

Average Conversation Length

Drop Rate

Provider Errors

Average Response Time

Daily Active Voice Users

---

# SECTION 150 — VOICE ENGINE SUMMARY

The Voice Engine is a modular extension of the Conversation Engine.

Voice should never introduce separate memory, separate prompts, or separate personalities.

The architecture must allow providers to be swapped with configuration changes while preserving the same user experience.

---

# END OF PART 8
