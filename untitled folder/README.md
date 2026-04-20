# The Daily Reflection Tree

A deterministic, non-AI self-reflection decision tree that guides employees through structured behavioral observation across three psychological axes.

**No AI. No scores. No judgment. Just honest noticing.**

---

## Repository Structure

```
/tree/
  reflection-tree.json        ← Complete tree data as JSON (58 nodes + 8 profiles)
  tree-diagram.md             ← Visual Mermaid diagram of the full tree
/agent/
  index.html                  ← Runnable web app (open directly in browser)
  css/styles.css              ← Design system
  js/axis1.js                 ← Axis 1: Locus of Control nodes
  js/axis2.js                 ← Axis 2: Contribution vs Entitlement nodes
  js/axis3.js                 ← Axis 3: Radius of Concern nodes + bridges + bookends
  js/profiles.js              ← 8 archetypal summary profiles
  js/engine.js                ← Core engine: state, router, renderer
  js/app.js                   ← Bootstrap
/transcripts/
  persona-1-transcript.md     ← Sample run: "The Grounded Steward" (all-internal path)
  persona-2-transcript.md     ← Sample run: "The Depleted Observer" (all-external path)
write-up.md                   ← Design rationale (2 pages)
README.md                     ← This file
```

---

## How to Read the Tree

### JSON Format (`tree/reflection-tree.json`)

The JSON file contains:
- **`metadata`** — name, axes, node type descriptions, counts
- **`tree`** — all 58 nodes, keyed by node ID
- **`profiles`** — 8 archetypal profiles (one per 2³ combination)

Each **question node** has:
```json
{
  "id": "a1_q1",
  "type": "question",
  "axis": 1,
  "text": "When something didn't go as planned today, what did you do first?",
  "options": [
    { "id": "A", "text": "Tried to understand what I could have done differently", "signal": "axis1_internal" },
    { "id": "B", "text": "Figured out who or what caused the problem", "signal": "axis1_external" }
  ],
  "next": "a1_q2"
}
```

Each **decision node** has:
```json
{
  "id": "dec_a1_1",
  "type": "decision",
  "condition": { "left": "axis1_internal", "op": ">=", "right": "axis1_external" },
  "true_next": "a1_q4_int",
  "false_next": "a1_q4_ext"
}
```

Decision nodes are invisible to the user — they silently compare accumulated signal counts and route to the appropriate branch.

### Visual Diagram (`tree/tree-diagram.md`)

Open the Mermaid diagram in any Mermaid-compatible viewer (GitHub renders it natively). Color coding:
- 🟠 Orange = Question nodes
- 🟣 Purple = Decision/routing nodes
- 🟢 Green = Reflection nodes
- ⬛ Dark = Bridge transitions
- 🟤 Brown = Start/Summary/End

---

## How to Run the Agent

### Option 1: Direct file open (no server needed)
```bash
open agent/index.html
```
Or double-click `agent/index.html` in Finder.

### Option 2: Local server
```bash
cd agent
python3 -m http.server 8080
# Then open http://localhost:8080
```

### What to expect
1. **Start screen** — tap "Begin Reflection"
2. **30 questions** across 3 axes, with branching based on your answers
3. **3 bridge screens** between axes (with breathing animation)
4. **3 mid-flow reflections** that reference your actual answers
5. **Summary** — your archetypal profile, tension, axis bars, and a reflective question
6. **~10 minutes** to complete

---

## Key Design Principles

| Principle | Implementation |
|-----------|----------------|
| **No AI at runtime** | Every node, option, and reflection is prewritten. The engine is a state machine comparing integer counters. |
| **Full determinism** | Same answer sequence → same path → same output. Always. |
| **True branching** | 6 decision nodes create genuinely different paths (not just different final scores). |
| **Non-judgmental** | No option is "wrong." Even the most challenging profiles are framed with empathy. |
| **Privacy-first** | Zero data storage, zero network calls, zero analytics. |
| **Zero dependencies** | Vanilla HTML/CSS/JS. No npm, no build step, no frameworks. |

---

## Three Psychological Axes

| Axis | Poles | Source |
|------|-------|--------|
| 1. Locus of Control | Internal (Victor) ↔ External (Victim) | Rotter, 1966 |
| 2. Orientation | Contribution ↔ Entitlement | Organ's OCB framework |
| 3. Radius of Concern | Others ↔ Self | Batson's perspective-taking |

These produce **8 profiles**: The Grounded Steward, The Focused Builder, The Aware Contractor, The Independent Driver, The Generous Adapter, The Dutiful Worker, The Frustrated Idealist, The Depleted Observer.

---

## Transcripts

Two sample runs demonstrate the branching behavior:

- **Persona 1** ("The Grounded Steward") — consistently selects internal/contribution/others options. All 6 decision nodes route to TRUE branch. Sees agency-affirming reflections and receives a caution about over-responsibility.

- **Persona 2** ("The Depleted Observer") — consistently selects external/entitlement/self options. All 6 decision nodes route to FALSE branch. Sees empathetic outward-attention reflections and receives a prompt about finding the smallest act of authorship.

These two transcripts represent opposite extremes of the 8-profile space, demonstrating maximum path divergence.
