// Axis 1 — Locus of Control (12 questions per user, with branching)
// Every question is a specific workplace moment, not an abstract category.
// Signal mapping is non-obvious — no option should feel like the "right" answer.

const AXIS1 = {
  a1_q1: { id:"a1_q1", type:"question", axis:1, text:"You're walking back to your desk after a meeting that didn't go the way you expected. What's running through your head?", options:[
    {id:"A",text:"I'm replaying what I said — I think I lost them at the second point",signal:"axis1_internal"},
    {id:"B",text:"The decision was already made before I walked in",signal:"axis1_external"},
    {id:"C",text:"I need to rethink my approach for the follow-up",signal:"axis1_internal"},
    {id:"D",text:"No one in that room was actually listening",signal:"axis1_external"}
  ], next:"a1_q2"},

  a1_q2: { id:"a1_q2", type:"question", axis:1, text:"It's late afternoon and you realize you won't finish what you promised by end of day. What do you find yourself thinking?", options:[
    {id:"A",text:"I should have scoped this differently from the start",signal:"axis1_internal"},
    {id:"B",text:"Three things that weren't mine to handle ate my morning",signal:"axis1_external"},
    {id:"C",text:"I'll rework the plan and deliver the most important piece tonight",signal:"axis1_internal"},
    {id:"D",text:"The timeline was unrealistic — no one could have made this work",signal:"axis1_external"}
  ], next:"a1_q3"},

  a1_q3: { id:"a1_q3", type:"question", axis:1, text:"Your manager sends a brief, slightly critical message. You can't tell how serious it is. What happens in your body over the next ten minutes?", options:[
    {id:"A",text:"I start drafting what I'll say — facts, context, what I'd do differently",signal:"axis1_internal"},
    {id:"B",text:"A knot forms. This will go badly no matter what I do",signal:"axis1_external"},
    {id:"C",text:"I set it aside until I have more information to respond to",signal:"axis1_internal"},
    {id:"D",text:"I start wondering what else is going wrong that I haven't been told about",signal:"axis1_external"}
  ], next:"dec_a1_1"},

  dec_a1_1: { id:"dec_a1_1", type:"decision", condition:{left:"axis1_internal",op:">=",right:"axis1_external"}, true_next:"a1_q4_int", false_next:"a1_q4_ext"},

  a1_q4_int: { id:"a1_q4_int", type:"question", axis:1, text:"You've been reaching for the wheel all day. Think about the last thing that frustrated you — did you also feel a flicker of 'this is my fault, even though it probably isn't'?", options:[
    {id:"A",text:"Yes — I default to blame-myself-first. It's automatic",signal:"axis1_internal"},
    {id:"B",text:"Not fault exactly, but I keep thinking about what I could have done",signal:"axis1_internal"},
    {id:"C",text:"No — I was frustrated because someone else genuinely dropped the ball",signal:"axis1_external"},
    {id:"D",text:"I felt responsible for fixing it, even though I didn't cause it",signal:"axis1_internal"}
  ], next:"a1_q5"},

  a1_q4_ext: { id:"a1_q4_ext", type:"question", axis:1, text:"Think about one thing that went wrong today. Not the biggest thing — a small one. Is there a version of events where one different choice by you would have changed the outcome?", options:[
    {id:"A",text:"Honestly, maybe. I could have spoken up earlier",signal:"axis1_internal"},
    {id:"B",text:"I've thought about it and no — the pieces weren't in my hands",signal:"axis1_external"},
    {id:"C",text:"There was a moment, but I didn't have enough information to act on it",signal:"axis1_external"},
    {id:"D",text:"Yes. I saw it coming and I didn't move",signal:"axis1_internal"}
  ], next:"a1_q5"},

  a1_q5: { id:"a1_q5", type:"question", axis:1, text:"Someone gave you feedback today that felt off. Not cruel — just like they weren't seeing the full picture. What did you sit with afterward?", options:[
    {id:"A",text:"What part of it might be true, even if it stung",signal:"axis1_internal"},
    {id:"B",text:"They don't know what I was dealing with when I made that choice",signal:"axis1_external"},
    {id:"C",text:"Whether I should have made my reasoning more visible earlier",signal:"axis1_internal"},
    {id:"D",text:"The gap between how hard I tried and how it was received",signal:"axis1_external"}
  ], next:"a1_q6"},

  a1_q6: { id:"a1_q6", type:"question", axis:1, text:"There was a point today where the pressure was real. Not dramatic — just the low hum of too much to do. What did you actually do in that moment?", options:[
    {id:"A",text:"Picked the one thing I could finish and did it",signal:"axis1_internal"},
    {id:"B",text:"Sat with it, feeling stuck, not sure where to start",signal:"axis1_external"},
    {id:"C",text:"Vented to someone — I needed to say it out loud",signal:"axis1_external"},
    {id:"D",text:"Reorganized my list and cut what wasn't essential",signal:"axis1_internal"}
  ], next:"chk_a1"},

  chk_a1: { id:"chk_a1", type:"decision", condition:{left:"axis1_internal",op:">=",right:"axis1_external"}, true_next:"ref_a1_int", false_next:"ref_a1_ext"},

  ref_a1_int: { id:"ref_a1_int", type:"reflection", axis:1, text:"You said '{a1_q1}' after a meeting went sideways. And when pressure built, you '{a1_q6}'. There's a steady hand reaching for the wheel today. The question isn't whether you're driving — you are. The question is whether you let anyone else navigate.", next:"a1_q7"},

  ref_a1_ext: { id:"ref_a1_ext", type:"reflection", axis:1, text:"You said '{a1_q1}' after a meeting went sideways. And when pressure built, you '{a1_q6}'. Today has felt like weather — something happening around you, not through you. But notice: even describing it this way is a choice. That noticing is already agency.", next:"a1_q7"},

  a1_q7: { id:"a1_q7", type:"question", axis:1, text:"Think of one moment today that went well. Not a big win — just a moment where things clicked. What made it work?", options:[
    {id:"A",text:"I made a specific choice that set it up",signal:"axis1_internal"},
    {id:"B",text:"The right people happened to be in the room",signal:"axis1_external"},
    {id:"C",text:"I'd been thinking about it for a while and the preparation showed",signal:"axis1_internal"},
    {id:"D",text:"Honestly, I got lucky — the timing worked out",signal:"axis1_external"}
  ], next:"a1_q8"},

  a1_q8: { id:"a1_q8", type:"question", axis:1, text:"A process or system made your work harder today. Something that shouldn't be this complicated, but is. What did you do with that friction?", options:[
    {id:"A",text:"Started thinking about how to change it, even a little",signal:"axis1_internal"},
    {id:"B",text:"Pushed through it, but it wore me down",signal:"axis1_external"},
    {id:"C",text:"Found a workaround and moved on",signal:"axis1_internal"},
    {id:"D",text:"Added it to the list of things that never get fixed around here",signal:"axis1_external"}
  ], next:"a1_q9"},

  a1_q9: { id:"a1_q9", type:"question", axis:1, text:"Someone pushed back on your work today. Not your effort — your actual output. The thing you made or decided. What happened inside you?", options:[
    {id:"A",text:"Curiosity first — what are they seeing that I'm not?",signal:"axis1_internal"},
    {id:"B",text:"A flash of 'you don't understand what went into this'",signal:"axis1_external"},
    {id:"C",text:"I went quiet and started rethinking my approach",signal:"axis1_internal"},
    {id:"D",text:"Frustration — the goalposts moved and no one told me",signal:"axis1_external"}
  ], next:"dec_a1_2"},

  dec_a1_2: { id:"dec_a1_2", type:"decision", condition:{left:"axis1_internal",op:">=",right:"axis1_external"}, true_next:"a1_q10_int", false_next:"a1_q10_ext"},

  a1_q10_int: { id:"a1_q10_int", type:"question", axis:1, text:"You keep reaching for the wheel. Here's the hard question: was there anything today that genuinely wasn't yours to carry — and you carried it anyway?", options:[
    {id:"A",text:"Yes. I took on something that wasn't mine because no one else would",signal:"axis1_internal"},
    {id:"B",text:"I'm not sure where my responsibility ends and theirs begins anymore",signal:"axis1_internal"},
    {id:"C",text:"Actually, yes — and I'm tired of it",signal:"axis1_external"},
    {id:"D",text:"Probably, but if I don't carry it, it falls",signal:"axis1_internal"}
  ], next:"a1_q11"},

  a1_q10_ext: { id:"a1_q10_ext", type:"question", axis:1, text:"You've described a day that pushed you around. But think small. Was there one moment — even sixty seconds — where you chose how to respond instead of just reacting?", options:[
    {id:"A",text:"There was. I paused before replying to something that annoyed me",signal:"axis1_internal"},
    {id:"B",text:"I chose to let something go instead of fighting it",signal:"axis1_internal"},
    {id:"C",text:"I can't think of one — I was in reaction mode all day",signal:"axis1_external"},
    {id:"D",text:"Maybe, but it felt so small it doesn't count",signal:"axis1_external"}
  ], next:"a1_q11"},

  a1_q11: { id:"a1_q11", type:"question", axis:1, text:"Think of one thing today that was genuinely out of your control. A rule, a decision, a reality you couldn't change. What did you do inside that constraint?", options:[
    {id:"A",text:"Found the one degree of freedom I still had and used it",signal:"axis1_internal"},
    {id:"B",text:"Accepted it, but it cost me something to accept",signal:"axis1_external"},
    {id:"C",text:"Pushed back, even knowing it probably wouldn't change",signal:"axis1_internal"},
    {id:"D",text:"Let it define the rest of my afternoon",signal:"axis1_external"}
  ], next:"a1_q12"},

  a1_q12: { id:"a1_q12", type:"question", axis:1, text:"Last question on this thread. Complete this sentence honestly: 'Today, I mostly…'", options:[
    {id:"A",text:"…chose how I showed up, even when the situation was hard",signal:"axis1_internal"},
    {id:"B",text:"…responded to what came at me, as best I could",signal:"axis1_external"},
    {id:"C",text:"…shaped at least one thing that mattered to me",signal:"axis1_internal"},
    {id:"D",text:"…got through it",signal:"axis1_external"}
  ], next:"bridge1"}
};
