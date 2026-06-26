# UI_DESIGN_SYSTEM.md

# Hartly AI Design System

Version: 1.0

Status: Production Ready

Applies To:

* Landing Page
* Chat Interface
* Authentication
* Dashboard
* Mobile
* Desktop
* Future Android App

---

# 1. DESIGN PHILOSOPHY

Hartly AI should feel like:

* Warm
* Premium
* Calm
* Romantic
* Trustworthy
* Modern
* Human
* Minimal

Users should feel emotionally safe and comfortable within seconds of opening the application.

The interface should never feel cluttered.

Whitespace is a design element.

---

# 2. BRAND PERSONALITY

Keywords

Warm

Elegant

Minimal

Soft

Premium

Friendly

Comforting

Emotionally Intelligent

Never use aggressive colors or heavy enterprise styling.

---

# 3. COLOR SYSTEM

## Primary

Heart Pink

```
#EC4899
```

Hover

```
#DB2777
```

Light

```
#F9A8D4
```

---

## Secondary

Purple

```
#8B5CF6
```

---

## Accent

Blue

```
#3B82F6
```

Success

```
#22C55E
```

Warning

```
#F59E0B
```

Danger

```
#EF4444
```

---

# 4. LIGHT THEME

Background

White

Surface

Gray 50

Cards

White

Border

Gray 200

Text

Gray 900

Secondary Text

Gray 500

---

# 5. DARK THEME

Background

Slate 950

Surface

Slate 900

Cards

Slate 800

Border

Slate 700

Primary Text

White

Secondary Text

Slate 400

Primary Accent

Pink 500

---

# 6. TYPOGRAPHY

Primary Font

Inter

Fallback

system-ui

Font Scale

Hero

56px

H1

40px

H2

32px

H3

24px

Body Large

18px

Body

16px

Caption

14px

Tiny

12px

Use font weights:

400

500

600

700

Never use ultra-light fonts.

---

# 7. SPACING SCALE

Base Unit

4px

Spacing Tokens

4

8

12

16

20

24

32

40

48

64

96

Always use spacing tokens.

Never use arbitrary spacing.

---

# 8. BORDER RADIUS

Small

8px

Medium

12px

Large

16px

Card

20px

Modal

24px

Chat Bubble

22px

Avatar

999px

---

# 9. SHADOW SYSTEM

Small

Subtle elevation

Medium

Cards

Large

Modal

Extra Large

Floating elements

Never use heavy shadows.

---

# 10. ICON SYSTEM

Library

Lucide React

Style

Outlined

Rounded

Minimal

24px default

---

# 11. BUTTON SYSTEM

Primary

Pink background

White text

Rounded Full

Height 48px

Secondary

Transparent

Border

Ghost

Text only

Danger

Red

Disabled

Reduced opacity

No interaction

---

# 12. INPUT SYSTEM

Rounded

16px radius

Height

48px

Padding

16px

Focus Ring

Pink

Placeholder

Gray

Support:

Text

Password

Search

Textarea

Voice

---

# 13. CARD SYSTEM

Rounded

20px

Padding

24px

Soft shadow

Border

Hover lift animation

Cards include:

Companion

Pricing

Feature

Analytics

---

# 14. AVATAR SYSTEM

Circle

64px

Chat

40px

Profile

96px

Dashboard

48px

Avatar images should be optimized and lazy loaded.

---

# 15. CHAT DESIGN

Chat Background

Very subtle gradient

Bubble Radius

22px

User Bubble

Pink

White text

AI Bubble

Slate

White text

Timestamp

Small

Muted

Auto scroll enabled.

---

# 16. MESSAGE INPUT

Rounded Full

Voice Button

Emoji Placeholder

Attachment Placeholder

Send Button

Floating

Sticky bottom on mobile.

---

# 17. CHAT HEADER

Avatar

Companion Name

Online Indicator

Language Badge

Back Button

Menu Button

Always fixed at top.

---

# 18. COMPANION CARD

Large portrait

Name

Age

Personality Tags

Short description

Start Chat button

Hover animation

Glow effect

Never overcrowd the card.

---

# 19. LANDING PAGE

Sections:

Hero

Companion Showcase

Features

How It Works

Testimonials (Future)

Pricing

FAQ

Footer

Every section occupies the full viewport width.

---

# 20. HERO SECTION

Headline

Large emotional message

Subheadline

Short supporting copy

Primary CTA

Start Chatting

Secondary CTA

Learn More

Hero illustration

AI companion artwork

---

# 21. COMPANION SHOWCASE

Grid layout

Desktop

5 cards

Tablet

2-3 cards

Mobile

Horizontal carousel

Display:

Image

Name

Age

Traits

Language support

---

# 22. PRICING PAGE

Three cards

Free

Premium Monthly

Premium Yearly

Highlight recommended plan.

Show feature comparison.

---

# 23. AUTHENTICATION

Minimal layout

Centered card

Google Login

Email Login

Terms

Privacy

No distractions.

---

# 24. DASHBOARD

Sidebar

Top Navigation

Analytics Cards

Conversation Table

User Stats

AI Cost

Subscription Status

Responsive collapse on mobile.

---

# 25. MODALS

Blur background

24px radius

Maximum width

480px

Escape closes modal.

Accessible focus management.

---

# 26. ANIMATIONS

Duration

150–300ms

Use:

Fade

Slide

Scale

Hover Lift

Button Ripple (optional)

Typing Indicator

Avoid excessive animations.

---

# 27. LOADING STATES

Skeleton screens

Spinner

Typing dots

Progress bars

Never show blank pages.

---

# 28. EMPTY STATES

Illustration

Friendly message

Primary action

Examples:

No conversations

No companions

No subscriptions

---

# 29. ERROR STATES

Friendly copy

Retry button

Support link

Never expose stack traces.

---

# 30. MOBILE DESIGN

Navigation

Bottom-first

Thumb friendly

Large tap targets

Sticky input

Responsive typography

Safe-area support

---

# 31. DESKTOP DESIGN

Centered content

Maximum width

1280px

Comfortable whitespace

Keyboard shortcuts (future)

---

# 32. ACCESSIBILITY

WCAG AA target

Keyboard navigation

Screen reader support

Focus rings

Contrast compliance

Reduced motion support

---

# 33. IMAGE GUIDELINES

Use realistic AI-generated portraits.

Indian-focused appearance.

Natural lighting.

Consistent framing.

Portrait orientation.

No watermarks.

---

# 34. BRANDING

Logo

Heart icon

Minimal

Rounded

App Name

Hartly AI

Tagline

"Someone to Talk To, Anytime."

---

# 35. RESPONSIVE BREAKPOINTS

Mobile

320–767px

Tablet

768–1023px

Laptop

1024–1439px

Desktop

1440px+

Ultra Wide

1920px+

---

# 36. FUTURE VOICE UI

Microphone button

Waveform animation

Recording indicator

Voice transcript

Playback controls

Integrated into existing chat layout.

---

# 37. DESIGN TOKENS

All colors

Spacing

Typography

Radius

Shadows

Animations

Must be centralized.

Never hardcode design values across components.

---

# 38. FINAL DESIGN PRINCIPLE

Every screen should communicate warmth, simplicity, and trust.

The interface should disappear behind the conversation.

Users should focus on their companion—not the UI.

Every interaction should feel intentional, emotionally supportive, and effortless.

END OF UI_DESIGN_SYSTEM.md
