// Summary profiles — one per 2³ combination of axis poles.
// Each has: label, text (observation), tension (the shadow), question (the one that stays with you).

const PROFILES = {
  "internal_contribution_others": {
    label: "The Grounded Steward",
    text: "You took responsibility for your day, gave more than was asked, and held people in mind who weren't in the room. That's a rare combination — agency, generosity, and breadth in the same person on the same day.",
    tension: "Here's what stewards don't say out loud: the weight is real. You carry things that aren't yours because you can see them and no one else is picking them up. That's not sustainability. That's a slow leak.",
    question: "What would it look like to hold your standards — without holding everything?"
  },
  "internal_contribution_self": {
    label: "The Focused Builder",
    text: "You own your outcomes and you build with care. When things broke, you fixed them. When no one was watching, you did the work right anyway. Your focus was tight and productive today — energy pointed at the craft, not the crowd.",
    tension: "The edge of focused building is tunnel vision. You build well — but the person standing just outside your frame might have needed something from you today that you didn't see.",
    question: "Whose experience was quietly shaped by what you built today — and did you notice?"
  },
  "internal_entitlement_others": {
    label: "The Aware Contractor",
    text: "You see the system clearly — who does what, who gets what, where the gaps are. You take ownership of your own work and you genuinely notice other people. But today, you were tracking the fairness of it all more than the giving.",
    tension: "Awareness without generosity becomes surveillance. You see everything — but today you may have been keeping score more than keeping faith.",
    question: "What would change if you gave one thing today without tracking whether it came back?"
  },
  "internal_entitlement_self": {
    label: "The Independent Driver",
    text: "You trust yourself to deliver, and you did. You took ownership, set your own direction, and focused on what matters to you. The lens was on your work and your trajectory today.",
    tension: "Self-reliance is a strength until it becomes a wall. Owning everything sounds like agency, but it can quietly close the door to receiving — help, perspective, or the kind of feedback that only lands when you're not armored.",
    question: "Where might loosening your grip actually strengthen your position?"
  },
  "external_contribution_others": {
    label: "The Generous Adapter",
    text: "You gave readily today — to your team, to the work, to people who needed something. You also felt the day pressing in, the circumstances shaping you more than you shaped them. Generous, but from a reactive posture.",
    tension: "Generosity without agency can become self-erasure. You gave — but were you choosing to give, or just responding to whoever asked loudest?",
    question: "What's one thing you gave today that you also chose — not just responded to?"
  },
  "external_contribution_self": {
    label: "The Dutiful Worker",
    text: "You showed up and did your part. The conditions felt constraining, the scope felt predetermined, and your focus stayed on what was right in front of you. Your contribution was real, even if the conditions made it feel small.",
    tension: "Duty without authorship is sustainable — but rarely fulfilling. The work gets done, the worker fades. Today felt more like keeping a promise to someone else's plan than building your own.",
    question: "Where could you author one thing in your environment tomorrow — instead of just responding to it?"
  },
  "external_entitlement_others": {
    label: "The Frustrated Idealist",
    text: "You see what should be different — for the team, for the customer, for the system. The gap between what you observed and what arrived was real today. You care about fairness and you care about others. What you're short on is the lever.",
    tension: "Idealism without agency becomes resentment. You see the gap clearly — but watching it widens it. The frustration is evidence of caring. The question is what you do with it.",
    question: "What's the smallest action within reach that would close one gap you noticed today?"
  },
  "external_entitlement_self": {
    label: "The Depleted Observer",
    text: "Today happened to you more than through you. Energy was low, the environment felt immovable, and the lens narrowed to what was immediately in front of you. That's not a character flaw. That's what depletion looks like from the inside.",
    tension: "Depletion narrows everything — the lens, the agency, the generosity. When you're running on empty, even small choices become invisible. The danger isn't today. It's when today becomes every day.",
    question: "What's the smallest possible thing tomorrow that would feel like authorship — not productivity, just authorship?"
  }
};
