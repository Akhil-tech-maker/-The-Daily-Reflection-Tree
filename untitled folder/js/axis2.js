// Axis 2 — Contribution vs Entitlement (10 questions per user, with branching)
// The insight: people grow when they shift from "what am I getting?" to "what am I giving?"
// Questions surface this through real moments, not moralizing.

const AXIS2 = {
  a2_q1: { id:"a2_q1", type:"question", axis:2, text:"A colleague you don't know well seemed off today — quieter than usual, maybe struggling with something. You noticed. What did you do with that noticing?", options:[
    {id:"A",text:"Went over and asked if they were okay",signal:"axis2_contribution"},
    {id:"B",text:"Thought about it for a second, then got back to my own work",signal:"axis2_entitlement"},
    {id:"C",text:"Sent a brief message — nothing big, just an acknowledgment",signal:"axis2_contribution"},
    {id:"D",text:"Figured it wasn't my place. They'd ask if they needed something",signal:"axis2_entitlement"}
  ],next:"a2_q2"},

  a2_q2: { id:"a2_q2", type:"question", axis:2, text:"You contributed meaningfully to something today, but when the story was retold, your name wasn't in it. What did that actually feel like?", options:[
    {id:"A",text:"Fine. The outcome mattered more than the attribution",signal:"axis2_contribution"},
    {id:"B",text:"A small sting, even though I know it shouldn't matter",signal:"axis2_entitlement"},
    {id:"C",text:"I made a mental note. I didn't say anything, but I noticed",signal:"axis2_entitlement"},
    {id:"D",text:"I made a point to mention someone else's contribution instead",signal:"axis2_contribution"}
  ],next:"a2_q3"},

  a2_q3: { id:"a2_q3", type:"question", axis:2, text:"Something tedious needed doing today — the kind of task that no one volunteers for. Be honest about what happened.", options:[
    {id:"A",text:"I did it before anyone had to ask",signal:"axis2_contribution"},
    {id:"B",text:"I waited to see if someone else would pick it up first",signal:"axis2_entitlement"},
    {id:"C",text:"I did it, but I resented that it always seems to fall to me",signal:"axis2_entitlement"},
    {id:"D",text:"I did it and genuinely didn't mind",signal:"axis2_contribution"}
  ],next:"dec_a2_1"},

  dec_a2_1: { id:"dec_a2_1", type:"decision", condition:{left:"axis2_contribution",op:">=",right:"axis2_entitlement"}, true_next:"a2_q4_con", false_next:"a2_q4_ent"},

  a2_q4_con: { id:"a2_q4_con", type:"question", axis:2, text:"You've been giving freely today. Here's the uncomfortable question: when you helped someone, was any part of it because you'd feel guilty if you didn't?", options:[
    {id:"A",text:"Probably yes. I don't like the feeling of not helping when I could",signal:"axis2_contribution"},
    {id:"B",text:"No — I wanted to. It wasn't obligation",signal:"axis2_contribution"},
    {id:"C",text:"A little. I worry about what people think if I don't step up",signal:"axis2_entitlement"},
    {id:"D",text:"I don't analyze it — I just do what needs doing",signal:"axis2_contribution"}
  ],next:"a2_q5"},

  a2_q4_ent: { id:"a2_q4_ent", type:"question", axis:2, text:"Think about today — not the big moments, the tiny ones. Did you hold a door, explain something twice, stay on a call an extra minute for someone else's sake?", options:[
    {id:"A",text:"Actually yes. I did something small I hadn't thought about until now",signal:"axis2_contribution"},
    {id:"B",text:"Not really — I was heads down on my own priorities",signal:"axis2_entitlement"},
    {id:"C",text:"I think so, but it didn't feel like 'helping' — it was just normal",signal:"axis2_contribution"},
    {id:"D",text:"I was too stretched to give anything extra today",signal:"axis2_entitlement"}
  ],next:"a2_q5"},

  a2_q5: { id:"a2_q5", type:"question", axis:2, text:"There was a moment today when you could have cut a corner and no one would have noticed. What happened?", options:[
    {id:"A",text:"I did it the right way anyway — it matters to me",signal:"axis2_contribution"},
    {id:"B",text:"I cut the corner. I needed the time more than the quality",signal:"axis2_entitlement"},
    {id:"C",text:"I did it right, but I was aware that no one would notice or care",signal:"axis2_entitlement"},
    {id:"D",text:"I didn't even think about cutting the corner",signal:"axis2_contribution"}
  ],next:"a2_q6"},

  a2_q6: { id:"a2_q6", type:"question", axis:2, text:"A team goal and a personal goal competed for your attention today. Only one could get your best energy. Which one got it?", options:[
    {id:"A",text:"The team goal — my personal stuff can wait",signal:"axis2_contribution"},
    {id:"B",text:"My personal goal — I need to protect my own trajectory",signal:"axis2_entitlement"},
    {id:"C",text:"I tried to split it and neither got my best",signal:"axis2_entitlement"},
    {id:"D",text:"The team goal, because their success pulls me forward too",signal:"axis2_contribution"}
  ],next:"chk_a2"},

  chk_a2: { id:"chk_a2", type:"decision", condition:{left:"axis2_contribution",op:">=",right:"axis2_entitlement"}, true_next:"ref_a2_con", false_next:"ref_a2_ent"},

  ref_a2_con: { id:"ref_a2_con", type:"reflection", axis:2, text:"You said '{a2_q1}' when someone seemed off. And when no one was watching, '{a2_q5}'. You've been investing in things that don't pay you back directly today. That's not common. The question worth sitting with: is this generosity, or is it a habit you can't stop?", next:"a2_q7"},

  ref_a2_ent: { id:"ref_a2_ent", type:"reflection", axis:2, text:"You said '{a2_q1}' when someone seemed off. And when no one was watching, '{a2_q5}'. You've been keeping close accounts today — tracking what's fair, what's yours, what's owed. That's not selfishness. It might be self-preservation. But notice the ledger.", next:"a2_q7"},

  a2_q7: { id:"a2_q7", type:"question", axis:2, text:"Be honest about what you wanted from work today. Not what you should want — what you actually wanted when you sat down this morning.", options:[
    {id:"A",text:"To make something better than I found it",signal:"axis2_contribution"},
    {id:"B",text:"To get through my list and go home",signal:"axis2_entitlement"},
    {id:"C",text:"To feel like my effort was seen and valued",signal:"axis2_entitlement"},
    {id:"D",text:"To do something that mattered to someone other than me",signal:"axis2_contribution"}
  ],next:"a2_q8"},

  a2_q8: { id:"a2_q8", type:"question", axis:2, text:"Think of the most invisible thing you did today — something that kept the work moving but will never show up in a dashboard or a review. How do you feel about it?", options:[
    {id:"A",text:"Good. The work itself was the point",signal:"axis2_contribution"},
    {id:"B",text:"A little resentful, honestly. Invisible work doesn't get promoted",signal:"axis2_entitlement"},
    {id:"C",text:"I didn't do anything invisible today — I focused on what's measurable",signal:"axis2_entitlement"},
    {id:"D",text:"Satisfied, but I notice I wish someone knew",signal:"axis2_contribution"}
  ],next:"dec_a2_2"},

  dec_a2_2: { id:"dec_a2_2", type:"decision", condition:{left:"axis2_contribution",op:">=",right:"axis2_entitlement"}, true_next:"a2_q9_con", false_next:"a2_q9_ent"},

  a2_q9_con: { id:"a2_q9_con", type:"question", axis:2, text:"You give more than most people around you. You probably know this. What's the part of that you don't say out loud?", options:[
    {id:"A",text:"Sometimes I give because I don't know how to stop",signal:"axis2_contribution"},
    {id:"B",text:"I do keep a quiet tally, even though I don't act on it",signal:"axis2_entitlement"},
    {id:"C",text:"I'm afraid that if I stop giving, I stop mattering",signal:"axis2_entitlement"},
    {id:"D",text:"I've made peace with it. This is who I choose to be",signal:"axis2_contribution"}
  ],next:"a2_q10"},

  a2_q9_ent: { id:"a2_q9_ent", type:"question", axis:2, text:"Forget the big gestures. Did you do one small thing today purely because it would make someone else's day slightly easier — with zero benefit to you?", options:[
    {id:"A",text:"Yes, and I'd forgotten about it until just now",signal:"axis2_contribution"},
    {id:"B",text:"I'm struggling to think of one",signal:"axis2_entitlement"},
    {id:"C",text:"I did something, but it was partly self-serving too",signal:"axis2_entitlement"},
    {id:"D",text:"Yes — and it was actually the best moment of my day",signal:"axis2_contribution"}
  ],next:"a2_q10"},

  a2_q10: { id:"a2_q10", type:"question", axis:2, text:"Someone you work closely with gets recognized for something you also shaped. In the thirty seconds after you hear the news — before you compose yourself — what's the first thing you feel?", options:[
    {id:"A",text:"Genuine happiness for them. They earned it",signal:"axis2_contribution"},
    {id:"B",text:"Happy for them, but a quiet voice asking 'what about me?'",signal:"axis2_entitlement"},
    {id:"C",text:"I'm already thinking about what I need to do differently to be next",signal:"axis2_entitlement"},
    {id:"D",text:"Proud — because I helped build what they were recognized for",signal:"axis2_contribution"}
  ],next:"bridge2"}
};
