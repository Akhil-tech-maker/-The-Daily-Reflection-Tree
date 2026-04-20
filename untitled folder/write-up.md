# The Daily Reflection Tree — Design Rationale

## 1. Problem & Motivation

Most workplace self-reflection tools are either unstructured journaling (low consistency, high effort) or AI-powered sentiment analysis (unpredictable, privacy-invasive, non-deterministic). Neither provides what behavioral psychologists recommend: **structured, repeatable self-observation without judgment**.

The Daily Reflection Tree fills this gap. It is a deterministic decision tree that guides employees through three psychological axes using behavioral multiple-choice questions. No AI runs at any point. Every possible path is prewritten. Same inputs always produce the same output.

## 2. Psychological Model: Three Axes

The tree measures three orthogonal behavioral dimensions, grounded in established psychological research:

**Axis 1 — Locus of Control** (Rotter, 1966)
Measures whether the user attributes outcomes to internal agency (Victor) or external circumstances (Victim). Questions probe real behavioral moments: how they responded to setbacks, feedback, stress, and success.

**Axis 2 — Contribution vs. Entitlement** (Organ's OCB framework)
Measures whether the user invested energy in others' success (Contribution) or focused on fairness and personal recognition (Entitlement). Questions target observable behaviors: helping colleagues, invisible work, shared goals.

**Axis 3 — Radius of Concern** (Batson's perspective-taking research)
Measures how wide the user's awareness extended — from self only (Self) to team, customer, and systemic impact (Others). Questions probe decision-making scope and frustration awareness.

These three axes produce 2³ = **8 archetypal profiles** (e.g., "The Grounded Steward," "The Depleted Observer"), each with a prewritten description, tension statement, and reflective question.

## 3. Tree Architecture

The tree contains **58 nodes** across 6 types:

| Type | Count | Purpose |
|------|-------|---------|
| Question | 36 | Behavioral MCQ (3–4 options, each emitting a signal) |
| Decision | 9 | Invisible routing — compares signal counts to branch |
| Reflection | 6 | Mid-flow interpolated insight referencing user's answers |
| Bridge | 3 | Axis transitions with signal-aware variant text |
| Bookend | 3 | Start, Summary, End |
| **Total** | **57+** | |

**Key design decisions:**

1. **True branching, not linear**: After every 2–3 questions, an invisible decision node evaluates accumulated signals and routes users to different follow-up questions. A user leaning "internal" on Axis 1 sees Q4-INT ("What drives that instinct?") while an "external" leaner sees Q4-EXT ("Was there a moment where you had more influence?"). This creates meaningfully different experiences without AI.

2. **Answer interpolation**: Reflections reference the user's actual selected text using `{nodeId}` placeholders (e.g., *"You described '{a1_q1}' when things went wrong"*). This creates the feeling of being heard without any NLP.

3. **Signal-aware bridges**: The transition text between axes adapts based on accumulated signals. Someone leaning "internal" sees *"You've been noticing your own agency"* while someone leaning "external" sees *"You've been noticing how the world presses in."* Same structural node, different experiential text.

4. **Non-judgmental tone**: Every option is written as a valid behavioral observation. The tree never labels answers as good or bad. Even the most "negative" profile ("The Depleted Observer") is framed with empathy: *"That's not selfish. Sometimes the radius narrows because there's a lot to process inside it."*

## 4. Technical Implementation

- **Zero dependencies**: Vanilla HTML/CSS/JS. No frameworks, no build tools, no npm.
- **No AI at runtime**: Everything is prewritten. The engine is a simple state machine that reads the tree data structure, evaluates conditions by comparing integer counters, and renders HTML.
- **Full determinism**: The `evalCondition()` function compares two signal counters with `>=`. Same answer sequence always produces the same routing, reflections, bridges, and profile.
- **Offline-capable**: Opens directly from filesystem. No server required.
- **Privacy-first**: No data is stored, no analytics, no network calls. The reflection is ephemeral by design.

## 5. Design Philosophy

The interface follows a "calm technology" aesthetic: dark mode with warm amber accents, glassmorphism cards, Playfair Display serif headings, and Inter sans-serif body text. Micro-animations (gentle float, breathing circles, fade transitions) create a meditative pace without being distracting.

The goal is not to produce a score or a diagnosis. It is to hold up a structured mirror — so the user can notice patterns they might otherwise miss, and sit with one honest question at the end.
