// Message board (orbit / list) + "Create a letter" dialog.
// Data comes from js/data.js for now; replace with fetch() calls later.

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeColor = (c) => (/^#[0-9a-f]{6}$/i.test(c) ? c : "#ffffff");
const inkFor = (h) => { const n = parseInt(h.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150 ? "#1d1a33" : "#ffffff"; };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const unlocked = () => FORCE_UNLOCK || isRevealed();

const stage = $("#stage"), crumbs = $("#crumbs"), search = $("#searchInput");
const state = { view: "orbit", subject: null, teacher: null };
let busy = false;

const items = () => (state.subject ? state.subject.teachers : SUBJECTS);

function render() {
  renderCrumbs();
  if (state.teacher) renderLetters();
  else if (state.view === "orbit") renderOrbit(items(), !!state.subject);
  else renderGrid(items(), !!state.subject);
  applySearch();
}

function renderCrumbs() {
  const parts = [["All subjects", () => { state.subject = state.teacher = null; }]];
  if (state.subject) parts.push([state.subject.name, () => { state.teacher = null; }]);
  if (state.teacher) parts.push([state.teacher.name, null]);
  crumbs._parts = parts;
  crumbs.innerHTML = parts.map(([n], i) => `<button type="button" data-c="${i}" ${i === parts.length - 1 ? 'aria-current="page"' : ""}>${esc(n)}</button>`).join('<span aria-hidden="true">›</span>');
}

function renderOrbit(list, moon) {
  stage.className = "stage stage--orbit";
  let html = moon
    ? `<div class="core" style="--c1:${state.subject.c1};--c2:${state.subject.c2}"><span class="core-name">${esc(state.subject.name)}</span></div>`
    : '<div class="sun" aria-hidden="true"></div>';
  const per = moon ? 5 : 1;
  list.forEach((it, i) => {
    const ring = Math.floor(i / per), inRing = Math.min(per, list.length - ring * per), k = i % per;
    const c = moon ? state.subject : it;
    const d = moon ? 0.58 + ring * 0.3 : 0.34 + i * (0.6 / Math.max(list.length - 1, 1));
    const phase = (moon ? k / inRing + ring * 0.12 : (i * 0.382) % 1).toFixed(3);
    const dur = moon ? 26 + ring * 12 : 30 + i * 14;
    html += `<div class="orbit" style="--d:${d};--dur:${dur}s;--phase:${phase}"><button type="button" class="body ${moon ? "moon" : "planet"}" data-i="${i}" data-name="${esc(it.name.toLowerCase())}" style="--c1:${c.c1};--c2:${c.c2}"><span class="orb-name">${esc(it.name)}</span></button></div>`;
  });
  stage.innerHTML = html;
}

function renderGrid(list, moon) {
  stage.className = "stage stage--flow";
  stage.innerHTML = `<div class="grid">${list.map((it, i) => {
    const c = moon ? state.subject : it;
    const sub = moon ? (unlocked() ? `${(LETTERS[it.id] || []).length} letters` : "Sealed until reveal") : `${it.teachers.length} teachers`;
    return `<button type="button" class="card glass" data-i="${i}" data-name="${esc(it.name.toLowerCase())}" style="--c1:${c.c1};--c2:${c.c2}"><span class="dot"></span><strong>${esc(it.name)}</strong><small>${sub}</small></button>`;
  }).join("")}</div>`;
}

function renderLetters() {
  stage.className = "stage stage--flow";
  const t = state.teacher;
  let body;
  if (!unlocked()) {
    body = '<div class="lock glass"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><strong>Letters are still sealed</strong><span>They unlock when the countdown ends.</span></div>';
  } else {
    const ls = LETTERS[t.id] || [];
    body = ls.length
      ? `<div class="letters">${ls.map((l) => { const bg = safeColor(l.bg); return `<article class="letter" data-name="${esc((l.text + " " + l.from).toLowerCase())}" style="--bg:${bg};--ink:${inkFor(bg)}"><p>${esc(l.text)}</p><footer>— ${esc(l.from)}</footer></article>`; }).join("")}</div>`
      : `<p class="empty">No public letters for ${esc(t.name)} yet.</p>`;
  }
  stage.innerHTML = `<h2 class="panel-title">${esc(t.name)}</h2>${body}`;
}

function applySearch() {
  const q = search.value.trim().toLowerCase();
  stage.querySelectorAll("[data-name]").forEach((el) => el.classList.toggle("is-dim", !!q && !el.dataset.name.includes(q)));
}

// zoom into the clicked body, swap the level, zoom back in
function go(change, origin) {
  if (busy) return;
  const run = () => { change(); render(); };
  if (reduce) return run();
  busy = true;
  if (origin) {
    const s = stage.getBoundingClientRect(), r = origin.getBoundingClientRect();
    stage.style.transformOrigin = `${r.left + r.width / 2 - s.left}px ${r.top + r.height / 2 - s.top}px`;
  } else stage.style.transformOrigin = "50% 50%";
  stage.classList.add("zoom-out");
  setTimeout(() => {
    run();
    stage.classList.add("zoom-in");
    setTimeout(() => { stage.classList.remove("zoom-in"); busy = false; }, 450);
  }, 380);
}

stage.addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]");
  if (!b) return;
  const it = items()[b.dataset.i];
  go(() => { if (state.subject) state.teacher = it; else state.subject = it; }, b);
});
crumbs.addEventListener("click", (e) => {
  const b = e.target.closest("[data-c]");
  if (b && !b.hasAttribute("aria-current")) go(crumbs._parts[b.dataset.c][1]);
});
document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
  state.view = b.dataset.view;
  document.querySelectorAll("[data-view]").forEach((x) => x.setAttribute("aria-pressed", x === b));
  render();
}));
search.addEventListener("input", applySearch);

// ---------- create-a-letter dialog ----------
const PALETTE = ["#ffffff", "#f1f0f7", "#c9c6d6", "#7d7a8c", "#2b2740", "#000000", "#ffd6e0", "#ffc8a8",
  "#fff1a8", "#d8f5a2", "#b8f0d8", "#b5e8ff", "#c9d6ff", "#e2c9ff", "#ff5c8a", "#ff7a45",
  "#f2b705", "#7ed957", "#2ec4b6", "#3ea6ff", "#5b6cff", "#8b6fe8", "#c04df0", "#8a1c3a"];
const DEFAULT_BG = "#fff1a8";
const dlg = $("#letterDialog"), form = $("#letterForm"), sel = $("#toSelect"), paper = $("#letterText"), status = $("#formStatus");

sel.innerHTML = SUBJECTS.map((s) => `<optgroup label="${esc(s.name)}">${s.teachers.map((t) => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join("")}</optgroup>`).join("");
$("#palette").innerHTML = PALETTE.map((c, i) => `<input type="radio" name="bg" id="sw${i}" value="${c}" ${c === DEFAULT_BG ? "checked" : ""}><label for="sw${i}" style="--sw:${c}" title="${c}"></label>`).join("");

function paint() {
  const c = form.bg.value;
  paper.style.setProperty("--paper", c);
  paper.style.setProperty("--ink", inkFor(c));
}
$("#palette").addEventListener("change", paint);
$("#createLetterBtn").addEventListener("click", () => {
  if (state.teacher) sel.value = state.teacher.id;
  status.textContent = "";
  paint();
  dlg.showModal();
});
$("#cancelLetter").addEventListener("click", () => dlg.close());
form.anon.addEventListener("change", () => { form.from.disabled = form.anon.checked; });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = { to: sel.value, text: paper.value.trim(), from: form.anon.checked ? null : form.from.value.trim() || null, isPublic: form.pub.checked, bg: form.bg.value };
  if (!payload.text) { status.textContent = "Write something first."; return; }
  console.log("TODO: send to backend", payload); // replace with fetch() to PythonAnywhere
  status.textContent = "Sent! (demo only — not saved yet)";
  form.reset();
  form.from.disabled = false;
  paint();
  setTimeout(() => dlg.close(), 900);
});

render();
