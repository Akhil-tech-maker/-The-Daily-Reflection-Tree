// The Daily Reflection Tree — Engine v2
// Supports: decision nodes, branching, interpolation, conditional bridges

const Engine = (() => {
  let state = {
    currentNodeId: "start",
    history: [],
    answers: {},       // {nodeId: "selected option text"}
    signals: {
      axis1_internal:0, axis1_external:0,
      axis2_contribution:0, axis2_entitlement:0,
      axis3_others:0, axis3_self:0
    },
    answeredQuestions: 0
  };

  const totalQuestions = 30; // each user path sees 30

  // ── Condition evaluator ──
  function evalCondition(cond) {
    const left = state.signals[cond.left] || 0;
    const right = state.signals[cond.right] || 0;
    return cond.op === ">=" ? left >= right : left > right;
  }

  // ── Text interpolation ──
  function interpolate(text) {
    return text.replace(/\{(\w+)\}/g, (_, id) => {
      return state.answers[id] || "…";
    });
  }

  // ── Router ──
  function advance(selectedOptionId) {
    const node = TREE[state.currentNodeId];
    if (!node) return;
    state.history.push({ nodeId: node.id, selectedOptionId });

    if (node.type === "question" && selectedOptionId) {
      const opt = node.options.find(o => o.id === selectedOptionId);
      if (opt) {
        if (opt.signal) state.signals[opt.signal]++;
        state.answers[node.id] = opt.text;
        state.answeredQuestions++;
      }
    }

    navigateTo(node.next);
  }

  function navigateTo(nextId) {
    if (!nextId || !TREE[nextId]) return;
    state.currentNodeId = nextId;
    const node = TREE[nextId];

    // Decision nodes are invisible — auto-route
    if (node.type === "decision") {
      const result = evalCondition(node.condition);
      navigateTo(result ? node.true_next : node.false_next);
      return;
    }
    render();
  }

  function goBack() {
    if (state.history.length === 0) return;
    const last = state.history.pop();
    const prevNode = TREE[last.nodeId];
    if (prevNode && prevNode.type === "question" && last.selectedOptionId) {
      const opt = prevNode.options.find(o => o.id === last.selectedOptionId);
      if (opt && opt.signal) {
        state.signals[opt.signal] = Math.max(0, state.signals[opt.signal] - 1);
        state.answeredQuestions = Math.max(0, state.answeredQuestions - 1);
      }
      delete state.answers[prevNode.id];
    }
    state.currentNodeId = last.nodeId;
    render();
  }

  // ── Profile resolver ──
  function resolveProfile() {
    const s = state.signals;
    const a1 = s.axis1_internal >= s.axis1_external ? "internal" : "external";
    const a2 = s.axis2_contribution >= s.axis2_entitlement ? "contribution" : "entitlement";
    const a3 = s.axis3_others >= s.axis3_self ? "others" : "self";
    return PROFILES[`${a1}_${a2}_${a3}`];
  }

  function pct(n, total) { return total === 0 ? 50 : Math.round((n / total) * 100); }

  // ── Renderer ──
  function render() {
    const node = TREE[state.currentNodeId];
    if (!node) return;
    const app = document.getElementById("app");
    app.classList.remove("visible");
    setTimeout(() => {
      app.innerHTML = buildHTML(node);
      bindEvents(node);
      const bar = document.getElementById("progress-fill");
      if (bar) bar.style.width = `${(state.answeredQuestions / totalQuestions) * 100}%`;
      requestAnimationFrame(() => app.classList.add("visible"));
    }, 280);
  }

  function buildHTML(node) {
    switch(node.type) {
      case "start": return screenStart(node);
      case "question": return screenQuestion(node);
      case "bridge": return screenBridge(node);
      case "reflection": return screenReflection(node);
      case "summary": return screenSummary();
      case "end": return screenEnd(node);
      default: return "";
    }
  }

  function screenStart(n) {
    return `<div class="screen screen--start"><div class="screen__inner">
      <div class="emblem">🌿</div>
      <h1 class="screen__heading">${n.heading}</h1>
      <p class="screen__body">${fmt(n.text)}</p>
      <button class="btn btn--primary" id="cta-btn">${n.cta}</button>
      <p class="screen__note">~10 minutes · Private · No data stored</p>
    </div></div>`;
  }

  function screenQuestion(n) {
    const labels = ["","Locus of Control","Contribution","Radius of Concern"];
    const opts = n.options.map(o => `<button class="option-btn" data-option="${o.id}" id="opt-${o.id}">
      <span class="option-letter">${o.id}</span><span class="option-text">${o.text}</span></button>`).join("");
    return `<div class="screen screen--question">
      <div class="back-btn" id="back-btn" title="Go back">&#8592;</div>
      <div class="axis-label">Axis ${n.axis} · ${labels[n.axis]}</div>
      <div class="screen__inner"><h2 class="question-text">${n.text}</h2>
      <div class="options-list">${opts}</div></div></div>`;
  }

  function screenBridge(n) {
    let text = n.text || "";
    if (n.variants) {
      text = evalCondition(n.variants.condition) ? n.variants.true_text : n.variants.false_text;
    }
    return `<div class="screen screen--bridge">
      <div class="back-btn" id="back-btn" title="Go back">&#8592;</div>
      <div class="screen__inner"><div class="bridge-breath"></div>
      <h2 class="screen__heading">${n.heading}</h2>
      <p class="screen__body">${fmt(text)}</p>
      <button class="btn btn--ghost" id="cta-btn">Continue</button></div></div>`;
  }

  function screenReflection(n) {
    return `<div class="screen screen--reflection">
      <div class="back-btn" id="back-btn" title="Go back">&#8592;</div>
      <div class="screen__inner"><div class="reflection-icon">◦</div>
      <p class="reflection-text">${interpolate(n.text)}</p>
      <button class="btn btn--ghost" id="cta-btn">Continue</button></div></div>`;
  }

  function screenSummary() {
    const p = resolveProfile();
    const s = state.signals;
    const a1 = pct(s.axis1_internal, s.axis1_internal + s.axis1_external);
    const a2 = pct(s.axis2_contribution, s.axis2_contribution + s.axis2_entitlement);
    const a3 = pct(s.axis3_others, s.axis3_others + s.axis3_self);
    return `<div class="screen screen--summary"><div class="screen__inner">
      <p class="summary-eyebrow">Today's Reflection</p>
      <h2 class="summary-profile-label">${p.label}</h2>
      <p class="summary-profile-text">${p.text}</p>
      <div class="summary-tension"><em>${p.tension}</em></div>
      <div class="axes-display">
        ${axisBar("Locus of Control","Victor","Victim",a1)}
        ${axisBar("Orientation","Contribution","Entitlement",a2)}
        ${axisBar("Radius of Concern","Others","Self",a3)}
      </div>
      <div class="summary-question"><p>${p.question}</p></div>
      <p class="summary-note">These observations are drawn from your answers today.<br>Return tomorrow for a fresh reflection.</p>
      <button class="btn btn--primary" id="cta-btn">Close Reflection</button>
    </div></div>`;
  }

  function axisBar(label, left, right, pctVal) {
    return `<div class="axis-bar-wrap"><div class="axis-bar-label">${label}</div>
      <div class="axis-bar-row"><span class="axis-bar-end">${left}</span>
      <div class="axis-bar-track"><div class="axis-bar-fill" style="width:${pctVal}%"></div>
      <div class="axis-bar-thumb" style="left:${pctVal}%"></div></div>
      <span class="axis-bar-end">${right}</span></div></div>`;
  }

  function screenEnd(n) {
    return `<div class="screen screen--end"><div class="screen__inner">
      <div class="emblem">🌿</div>
      <h2 class="screen__heading">${n.heading}</h2>
      <p class="screen__body">${fmt(n.text)}</p>
      <button class="btn btn--ghost" id="cta-btn">${n.cta}</button>
    </div></div>`;
  }

  // ── Events ──
  function bindEvents(node) {
    const back = document.getElementById("back-btn");
    if (back) back.addEventListener("click", goBack);

    const cta = document.getElementById("cta-btn");
    if (cta) cta.addEventListener("click", () => {
      if (node.type === "end") { reset(); render(); }
      else advance(null);
    });

    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.dataset.option;
        document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        e.currentTarget.classList.add("selected");
        setTimeout(() => advance(id), 380);
      });
    });
  }

  function fmt(t) { return t.replace(/\n/g, "<br>"); }

  function reset() {
    state = { currentNodeId:"start", history:[], answers:{}, signals:{
      axis1_internal:0, axis1_external:0,
      axis2_contribution:0, axis2_entitlement:0,
      axis3_others:0, axis3_self:0
    }, answeredQuestions:0 };
  }

  return { start() { render(); } };
})();
