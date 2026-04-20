// Axis 3 — Radius of Concern (8 questions per user, with branching)
// The insight: people grow when they widen who they hold in mind.
// Questions surface scope of awareness through real decisions, not moral prompts.

const AXIS3 = {
  a3_q1: { id:"a3_q1", type:"question", axis:3, text:"You made a decision today that affected more than just you. In the moment you made it, whose face came to mind?", options:[
    {id:"A",text:"My own — how this would affect my workload, my standing",signal:"axis3_self"},
    {id:"B",text:"My team — specifically who would be helped or burdened by it",signal:"axis3_others"},
    {id:"C",text:"Someone downstream I've never met — a customer, a user, a patient",signal:"axis3_others"},
    {id:"D",text:"No one's face, honestly. I was thinking about the task, not the people",signal:"axis3_self"}
  ],next:"a3_q2"},

  a3_q2: { id:"a3_q2", type:"question", axis:3, text:"You and someone else saw a situation differently today. By the end of the conversation, could you state their position as well as they could?", options:[
    {id:"A",text:"Yes — I made a point to understand before I responded",signal:"axis3_others"},
    {id:"B",text:"Partially — I got the surface but probably missed what was underneath",signal:"axis3_others"},
    {id:"C",text:"No — I was focused on making my own point clear",signal:"axis3_self"},
    {id:"D",text:"I didn't try. I needed the outcome more than the understanding",signal:"axis3_self"}
  ],next:"dec_a3_1"},

  dec_a3_1: { id:"dec_a3_1", type:"decision", condition:{left:"axis3_others",op:">=",right:"axis3_self"}, true_next:"a3_q3_oth", false_next:"a3_q3_self"},

  a3_q3_oth: { id:"a3_q3_oth", type:"question", axis:3, text:"You've been holding other people in mind today. Is that a deliberate practice, or is it something else?", options:[
    {id:"A",text:"It's deliberate — I've trained myself to think past my own desk",signal:"axis3_others"},
    {id:"B",text:"It's mostly automatic — I just see how things connect to people",signal:"axis3_others"},
    {id:"C",text:"Honestly, it might be a way of avoiding my own stuff",signal:"axis3_self"},
    {id:"D",text:"Someone's situation today made it impossible not to think about them",signal:"axis3_others"}
  ],next:"a3_q4"},

  a3_q3_self: { id:"a3_q3_self", type:"question", axis:3, text:"Your focus has been close to home today. Try this: name one person who was affected by a choice you made today — someone you didn't think about at the time.", options:[
    {id:"A",text:"Actually, yes — someone comes to mind. I wasn't thinking of them",signal:"axis3_others"},
    {id:"B",text:"I'm sure someone was affected, but I genuinely don't know who",signal:"axis3_self"},
    {id:"C",text:"My immediate team, probably. I was too focused to check",signal:"axis3_others"},
    {id:"D",text:"I think my scope was the right scope today. Not everything needs to be wider",signal:"axis3_self"}
  ],next:"a3_q4"},

  a3_q4: { id:"a3_q4", type:"question", axis:3, text:"You ran into a problem today that you've seen before — same kind of issue, different day. What did you do with that pattern recognition?", options:[
    {id:"A",text:"Fixed the immediate instance and moved on",signal:"axis3_self"},
    {id:"B",text:"Mentioned it to someone who might be able to change the root cause",signal:"axis3_others"},
    {id:"C",text:"Started thinking about what would prevent this for everyone, not just me",signal:"axis3_others"},
    {id:"D",text:"Noticed the pattern but didn't have the energy to do anything with it",signal:"axis3_self"}
  ],next:"a3_q5"},

  a3_q5: { id:"a3_q5", type:"question", axis:3, text:"Something frustrated you today. In that frustrated moment, how much of the world could you see?", options:[
    {id:"A",text:"Just the thing in front of me. My field of vision narrowed",signal:"axis3_self"},
    {id:"B",text:"I was frustrated on behalf of my team, not just myself",signal:"axis3_others"},
    {id:"C",text:"I could see the systemic issue behind my frustration",signal:"axis3_others"},
    {id:"D",text:"Just me. I was the center of my own frustration",signal:"axis3_self"}
  ],next:"chk_a3"},

  chk_a3: { id:"chk_a3", type:"decision", condition:{left:"axis3_others",op:">=",right:"axis3_self"}, true_next:"ref_a3_oth", false_next:"ref_a3_self"},

  ref_a3_oth: { id:"ref_a3_oth", type:"reflection", axis:3, text:"You said '{a3_q2}' in a disagreement, and '{a3_q5}' when you were frustrated. Even under pressure, your awareness included other people. That's rare — and it's exhausting. Not everyone who sees widely has learned to rest within that seeing.", next:"a3_q6"},

  ref_a3_self: { id:"ref_a3_self", type:"reflection", axis:3, text:"You said '{a3_q2}' in a disagreement, and '{a3_q5}' when you were frustrated. Today your lens stayed close — tight focus on what's right in front of you. That's not a failure of empathy. Sometimes the radius contracts because the center needs tending.", next:"a3_q6"},

  a3_q6: { id:"a3_q6", type:"question", axis:3, text:"Think about the end product of your work — not your deliverable, but what it becomes when it reaches the person who actually uses it. How present was that person in your thinking today?", options:[
    {id:"A",text:"Very — I made at least one decision today with their experience in mind",signal:"axis3_others"},
    {id:"B",text:"They crossed my mind, but they didn't change what I did",signal:"axis3_self"},
    {id:"C",text:"Not at all. I was thinking about the people in the building, not outside it",signal:"axis3_self"},
    {id:"D",text:"I thought about them more than my immediate stakeholders, actually",signal:"axis3_others"}
  ],next:"a3_q7"},

  a3_q7: { id:"a3_q7", type:"question", axis:3, text:"Right now, in this moment — which of these feels most true about your work?", options:[
    {id:"A",text:"I have tasks. I complete them. That's the agreement",signal:"axis3_self"},
    {id:"B",text:"I'm part of something that extends well beyond my job description",signal:"axis3_others"},
    {id:"C",text:"My work creates ripples I can trace to real people",signal:"axis3_others"},
    {id:"D",text:"I do what's asked and I do it well. The bigger picture is someone else's job",signal:"axis3_self"}
  ],next:"dec_a3_2"},

  dec_a3_2: { id:"dec_a3_2", type:"decision", condition:{left:"axis3_others",op:">=",right:"axis3_self"}, true_next:"a3_q8_oth", false_next:"a3_q8_self"},

  a3_q8_oth: { id:"a3_q8_oth", type:"question", axis:3, text:"You've been holding a wide view today. Here's the question people with wide lenses tend to avoid: did you use that wider view to change something you did today, or did you just hold it and feel heavy?", options:[
    {id:"A",text:"I used it — it changed at least one decision I made",signal:"axis3_others"},
    {id:"B",text:"I held it. It felt important but I didn't act on it",signal:"axis3_self"},
    {id:"C",text:"Both — I acted on some of it and sat with the rest",signal:"axis3_others"},
    {id:"D",text:"Honestly, the wideness made it harder to act at all",signal:"axis3_self"}
  ],next:"bridge3"},

  a3_q8_self: { id:"a3_q8_self", type:"question", axis:3, text:"Last question. Tomorrow, when you sit down to work — is there one person outside your immediate scope whose experience you could hold in mind? Not help. Not fix anything for. Just notice they exist.", options:[
    {id:"A",text:"Yes. Someone came to mind just now",signal:"axis3_others"},
    {id:"B",text:"I'd like to, but I know I'll forget as soon as things get busy",signal:"axis3_self"},
    {id:"C",text:"I think so. It's a small shift but it might change something",signal:"axis3_others"},
    {id:"D",text:"I think I need to take care of myself before I expand outward",signal:"axis3_self"}
  ],next:"bridge3"}
};

// Bridges — signal-aware with variants
const BRIDGES = {
  bridge1: { id:"bridge1", type:"bridge", heading:"Shifting Focus",
    variants: { condition:{left:"axis1_internal",op:">=",right:"axis1_external"},
      true_text:"You've been noticing your own agency — how you author your responses, even under pressure.\n\nNow let's look at a different dimension: not what you control, but what you give.",
      false_text:"You've been noticing how the world presses in — how circumstances shape your experience.\n\nNow let's shift to a different question: not what happens to you, but what you offer."
    }, next:"a2_q1"},
  bridge2: { id:"bridge2", type:"bridge", heading:"Widening the Lens",
    variants: { condition:{left:"axis2_contribution",op:">=",right:"axis2_entitlement"},
      true_text:"You've been exploring your generosity — how you invest in others' success alongside your own.\n\nNow let's look at scope: how wide is the circle of people and systems you hold in mind?",
      false_text:"You've been exploring the balance between what you give and what you expect.\n\nNow let's look at who occupies your awareness — how wide or narrow is the lens you carry?"
    }, next:"a3_q1"},
  bridge3: { id:"bridge3", type:"bridge", heading:"Coming Together",
    variants: { condition:{left:"axis3_others",op:">=",right:"axis3_self"},
      true_text:"You've been holding a wide lens — aware of people and systems beyond your immediate scope.\n\nWhat follows isn't a score or a label. It's a reflection of the patterns you've described today.",
      false_text:"You've been focused inward — processing your own experience with attention and honesty.\n\nWhat follows isn't a judgment. It's a mirror made of the choices you've described."
    }, next:"summary"}
};

// Start, Summary, End
const BOOKENDS = {
  start: { id:"start", type:"start", heading:"The Daily Reflection Tree",
    text:"A quiet space to observe how you showed up today.\n\nNo scores. No judgments. Just honest noticing.",
    cta:"Begin Reflection", next:"a1_q1"},
  summary: { id:"summary", type:"summary", next:"end" },
  end: { id:"end", type:"end", heading:"Thank you for pausing.",
    text:"Reflection is a practice, not a destination.\n\nCome back tomorrow and see what's changed.", cta:"Start Again"}
};

// Merge all into TREE
const TREE = Object.assign({}, BOOKENDS, AXIS1, AXIS2, AXIS3, BRIDGES);
