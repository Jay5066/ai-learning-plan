// Generates index.html: static markup (works without JS) + Tailwind CSS + Alpine.js for progress tracking.
// Usage: npm run build
import fs from "node:fs";
import { PLAN } from "./plan-data.mjs";

const LEVELS = [
  "No regular AI use.",
  "Uses chat LLMs well and understands tokens, context and hallucinations.",
  "Uses Copilot in VS Code daily (chat, inline, agent) and reviews diffs critically.",
  "Configures AI tooling (instructions, custom agents, skills).",
  "Drives agentic coding with Claude Code on real projects.",
  "Calls LLM APIs with structured output and tool calling.",
  "Builds RAG with embeddings and a vector database.",
  "Builds agents (LangChain/LangGraph) and MCP servers.",
  "Runs open and local models (Hugging Face) and always-on agents (OpenClaw).",
  "Tests, evaluates and secures AI features; uses spec-driven development.",
  "Ships and operates an AI feature in production and can teach others.",
];

// Class names must appear as full literals so Tailwind can detect them.
const PHASES = [
  { name: "Foundations and AI pair programming", months: [1, 2, 3],
    grad: "from-sky-500 to-indigo-600", text: "text-sky-700 dark:text-sky-300",
    soft: "bg-sky-50 dark:bg-sky-950/40", border: "border-sky-200 dark:border-sky-900",
    bar: "bg-sky-500", dot: "border-sky-400 text-sky-700 dark:text-sky-300",
    accent: "accent-sky-600", pill: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200" },
  { name: "Agentic coding and LLM APIs", months: [4, 5],
    grad: "from-emerald-500 to-teal-600", text: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-900",
    bar: "bg-emerald-500", dot: "border-emerald-400 text-emerald-700 dark:text-emerald-300",
    accent: "accent-emerald-600", pill: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200" },
  { name: "RAG, agents and MCP", months: [6, 7, 8],
    grad: "from-violet-500 to-fuchsia-600", text: "text-violet-700 dark:text-violet-300",
    soft: "bg-violet-50 dark:bg-violet-950/40", border: "border-violet-200 dark:border-violet-900",
    bar: "bg-violet-500", dot: "border-violet-400 text-violet-700 dark:text-violet-300",
    accent: "accent-violet-600", pill: "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200" },
  { name: "Open models and automation", months: [9, 10],
    grad: "from-amber-500 to-orange-600", text: "text-amber-700 dark:text-amber-300",
    soft: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-900",
    bar: "bg-amber-500", dot: "border-amber-400 text-amber-700 dark:text-amber-300",
    accent: "accent-amber-600", pill: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200" },
  { name: "Quality and shipping", months: [11, 12],
    grad: "from-rose-500 to-pink-600", text: "text-rose-700 dark:text-rose-300",
    soft: "bg-rose-50 dark:bg-rose-950/40", border: "border-rose-200 dark:border-rose-900",
    bar: "bg-rose-500", dot: "border-rose-400 text-rose-700 dark:text-rose-300",
    accent: "accent-rose-600", pill: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200" },
];
const phaseOf = (n) => PHASES.find((p) => p.months.includes(n));

const KINDS = {
  video: { label: "Video", icon: "▶", cls: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300" },
  course: { label: "Course", icon: "🎓", cls: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300" },
  doc: { label: "Doc", icon: "📄", cls: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function linkHtml(l) {
  const k = KINDS[l.kind];
  let badge = "";
  if (l.kind === "video") {
    badge = l.verified
      ? `<span class="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">✓ dated Oct 2026</span>`
      : `<span class="rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">confirm date</span>`;
  }
  return `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" class="group/link flex min-h-11 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-400">
        <span class="flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${k.cls}"><span aria-hidden="true">${k.icon}</span>${k.label}</span>
          <span class="font-medium text-slate-900 group-hover/link:text-indigo-600 dark:text-slate-100 dark:group-hover/link:text-indigo-300">${esc(l.text)}</span>
        </span>
        <span class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">${l.meta ? esc(l.meta) : ""}${badge}</span>
        <span class="break-all text-[11px] text-slate-400 dark:text-slate-500">${esc(l.url)}</span>
      </a>`;
}

function itemHtml(it, ph) {
  const practice = it.practice
    ? `<span class="mr-2 inline-block rounded-full bg-fuchsia-100 px-2 py-0.5 align-middle text-[11px] font-semibold text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-300">Practice</span>`
    : "";
  const links = (it.links || []).length
    ? `<div class="mt-3 grid gap-2 sm:ml-9">${it.links.map(linkHtml).join("\n")}</div>`
    : "";
  return `<li class="py-4" x-show="!(hide &amp;&amp; done['${it.id}'])">
      <div class="flex items-start gap-3">
        <input type="checkbox" id="cb-${it.id}" class="mt-0.5 size-6 shrink-0 cursor-pointer rounded ${ph.accent}" :checked="!!done['${it.id}']" @change="toggle('${it.id}')">
        <label for="cb-${it.id}" class="flex-1 cursor-pointer">
          <span class="block font-semibold leading-snug" :class="done['${it.id}'] &amp;&amp; 'text-slate-400 line-through dark:text-slate-500'">${practice}${esc(it.title)}</span>
          ${it.desc ? `<span class="mt-1 block text-sm text-slate-600 dark:text-slate-400">${esc(it.desc)}</span>` : ""}
        </label>
      </div>
      ${links}
    </li>`;
}

function monthHtml(m) {
  const ph = phaseOf(m.n);
  const total = m.items.length;
  return `<details id="month-${m.n}" data-month="${m.n}" open class="group scroll-mt-24 overflow-hidden rounded-2xl border ${ph.border} bg-white shadow-sm dark:bg-slate-900" x-init="$el.open = !closed[${m.n}]" @toggle="setClosed(${m.n}, !$el.open)">
    <summary class="flex cursor-pointer items-stretch gap-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-500">
      <span class="flex w-16 shrink-0 flex-col items-center justify-center bg-gradient-to-b ${ph.grad} py-4 text-white sm:w-20">
        <span class="text-[10px] font-semibold uppercase tracking-widest opacity-90">Month</span>
        <span class="text-2xl font-extrabold leading-none sm:text-3xl">${m.n}</span>
      </span>
      <span class="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <span class="flex flex-wrap items-center gap-2">
          <span class="text-base font-bold leading-snug sm:text-lg">${esc(m.title)}</span>
        </span>
        <span class="text-sm text-slate-600 dark:text-slate-400">${esc(m.goal)}</span>
        <span class="flex flex-wrap items-center gap-2">
          <span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ${ph.pill}">Level ${m.level}</span>
          <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300" x-text="count(${m.n}) + '/${total}'">0/${total}</span>
          <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" x-show="monthDone(${m.n})" x-cloak style="display:none">Complete 🎉</span>
        </span>
        <span class="block h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><span class="block h-full rounded-full ${ph.bar} transition-all duration-500" style="width:0%" :style="'width:' + pct(${m.n}) + '%'"></span></span>
      </span>
      <span class="flex items-center pr-4 text-slate-400 transition-transform group-open:rotate-90" aria-hidden="true">❯</span>
    </summary>
    <ul class="divide-y divide-dashed divide-slate-200 border-t ${ph.border} px-4 dark:divide-slate-700 sm:px-5">
      ${m.items.map((it) => itemHtml(it, ph)).join("\n")}
    </ul>
  </details>`;
}

function roadmapHtml() {
  return PLAN.map((m) => {
    const ph = phaseOf(m.n);
    return `<a href="#month-${m.n}" title="Month ${m.n}: ${esc(m.title)}" aria-label="Month ${m.n}: ${esc(m.title)}" class="flex size-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition hover:scale-110 data-[done=true]:border-transparent data-[done=true]:bg-emerald-500 data-[done=true]:text-white dark:bg-slate-900 ${ph.dot}" :data-done="monthDone(${m.n})"><span x-text="monthDone(${m.n}) ? '✓' : '${m.n}'">${m.n}</span></a>`;
  }).join("\n");
}

function legendHtml() {
  return LEVELS.map((t, i) => `<li class="flex items-start gap-3 py-1.5"><span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">${i}</span><span class="text-sm"><strong class="font-semibold">Level ${i}:</strong> ${esc(t)}</span></li>`).join("\n");
}

function allLinksHtml() {
  return PLAN.map((m) => {
    const rows = m.items.flatMap((it) => it.links || []);
    if (!rows.length) return "";
    return `<h3 class="mt-5 font-semibold">Month ${m.n}: ${esc(m.title)}</h3>
    <ol class="mt-1 list-decimal space-y-1 pl-6 text-sm">
      ${rows.map((l) => `<li><a class="text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800 dark:text-indigo-300" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.text)}</a><br><small class="break-all text-slate-500 dark:text-slate-400">${esc(l.url)}</small></li>`).join("\n")}
    </ol>`;
  }).join("\n");
}

const MONTHS = PLAN.map((m) => ({ n: m.n, level: m.level, ids: m.items.map((i) => i.id) }));
const totalItems = MONTHS.reduce((a, m) => a + m.ids.length, 0);
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

const css = fs.readFileSync("./dist/styles.css", "utf8");
const alpine = fs.readFileSync("./node_modules/alpinejs/dist/cdn.min.js", "utf8");
if (/<\/script/i.test(alpine)) throw new Error("Alpine bundle contains </script; cannot inline");

const component = `
const LEVELS = ${json(LEVELS)};
const MONTHS = ${json(MONTHS)};
const KEY = "ai-plan-v2", OLD_KEY = "ai-plan-v1";
document.addEventListener("alpine:init", () => {
  Alpine.data("plan", () => ({
    months: MONTHS, done: {}, closed: {}, hide: false,
    init() {
      try {
        const s = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY) || "{}");
        this.done = s.done || {}; this.closed = s.closed || {}; this.hide = !!s.hide;
      } catch (e) { /* ignore corrupt or unavailable storage */ }
    },
    save() { try { localStorage.setItem(KEY, JSON.stringify({ done: this.done, closed: this.closed, hide: this.hide })); } catch (e) { /* storage unavailable */ } },
    month(n) { return this.months.find((m) => m.n === n); },
    count(n) { return this.month(n).ids.filter((id) => this.done[id]).length; },
    pct(n) { const t = this.month(n).ids.length; return t ? Math.round(this.count(n) / t * 100) : 0; },
    monthDone(n) { return this.count(n) === this.month(n).ids.length; },
    get total() { return this.months.reduce((a, m) => a + m.ids.length, 0); },
    get doneCount() { return this.months.reduce((a, m) => a + this.count(m.n), 0); },
    get overall() { return this.total ? Math.round(this.doneCount / this.total * 100) : 0; },
    get level() { let lv = 0; for (const m of this.months) { if (this.monthDone(m.n)) lv = m.level; else break; } return lv; },
    get nextGoal() { return this.level >= 10 ? "You reached Level 10. Teach it to someone." : "Level " + (this.level + 1) + ": " + LEVELS[this.level + 1]; },
    toggle(id) { if (this.done[id]) delete this.done[id]; else this.done[id] = true; this.save(); },
    setClosed(n, c) { if (c) this.closed[n] = true; else delete this.closed[n]; this.save(); },
    setAll(open) {
      this.closed = {};
      if (!open) this.months.forEach((m) => { this.closed[m.n] = true; });
      document.querySelectorAll("details[data-month]").forEach((d) => { d.open = open; });
      this.save();
    },
    reset() { if (confirm("Clear all progress on this device?")) { this.done = {}; this.save(); } },
  }));
});
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#4f46e5">
<title>12-Month AI Skills Plan for Web Developers (Level 0 to 10)</title>
<style>${css}</style>
</head>
<body class="bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
<div x-data="plan">

  <div class="no-print sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
    <div class="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2.5">
      <span class="hidden text-sm font-bold sm:inline">AI Skills Plan</span>
      <div class="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-label="Overall progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" :aria-valuenow="overall">
        <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500" style="width:0%" :style="'width:' + overall + '%'"></div>
      </div>
      <span class="text-sm font-semibold tabular-nums" x-text="overall + '%'">0%</span>
      <span class="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-bold text-white" x-text="'Level ' + level">Level 0</span>
    </div>
  </div>

  <main class="mx-auto max-w-4xl px-4 pb-16">

    <header class="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-lg sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-white/80">12-month roadmap</p>
      <h1 class="mt-1 text-2xl font-extrabold leading-tight sm:text-4xl">AI Skills Plan for Web Developers</h1>
      <p class="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">From Level 0 to Level 10 with Copilot, Claude Code, RAG, LangChain, MCP, Hugging Face and OpenClaw. Built for a Drupal developer, applicable to any web stack. About 4 to 6 hours a week. Last link check: 2026-10-27.</p>
      <div class="mt-5 grid grid-cols-3 gap-3 text-center">
        <div class="rounded-2xl bg-white/15 p-3 backdrop-blur"><div class="text-2xl font-extrabold sm:text-3xl" x-text="level">0</div><div class="text-[11px] text-white/80 sm:text-xs">Level of 10</div></div>
        <div class="rounded-2xl bg-white/15 p-3 backdrop-blur"><div class="text-2xl font-extrabold sm:text-3xl" x-text="doneCount + '/' + total">0/${totalItems}</div><div class="text-[11px] text-white/80 sm:text-xs">Lessons done</div></div>
        <div class="rounded-2xl bg-white/15 p-3 backdrop-blur"><div class="text-2xl font-extrabold sm:text-3xl" x-text="overall + '%'">0%</div><div class="text-[11px] text-white/80 sm:text-xs">Overall</div></div>
      </div>
      <p class="mt-4 rounded-xl bg-black/15 px-3 py-2 text-sm"><span class="font-semibold">Next goal:</span> <span x-text="nextGoal">Level 1: ${esc(LEVELS[1])}</span></p>
    </header>

    <nav aria-label="Roadmap" class="mt-5 flex flex-wrap justify-center gap-2 sm:justify-between">
      ${roadmapHtml()}
    </nav>

    <div class="no-print mt-5 flex flex-wrap items-center gap-2">
      <button type="button" class="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium shadow-sm transition hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900" @click="setAll(true)">Expand all</button>
      <button type="button" class="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium shadow-sm transition hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900" @click="setAll(false)">Collapse all</button>
      <label class="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 text-sm"><input type="checkbox" class="size-5 accent-indigo-600" x-model="hide" @change="save()"> Hide completed</label>
      <button type="button" class="ml-auto min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-rose-600 shadow-sm transition hover:border-rose-400 dark:border-slate-700 dark:bg-slate-900 dark:text-rose-400" @click="reset()">Reset progress</button>
    </div>

    <details class="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <summary class="cursor-pointer font-semibold">Legend and level guide</summary>
      <div class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <p><span class="rounded-md bg-red-100 px-1.5 py-0.5 text-[11px] font-semibold text-red-700 dark:bg-red-950/60 dark:text-red-300">▶ VIDEO</span> YouTube &nbsp; <span class="rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">🎓 COURSE</span> structured video course &nbsp; <span class="rounded-md bg-slate-200 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">📄 DOC</span> official documentation</p>
        <p><span class="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">✓ dated Oct 2026</span> publish date confirmed from the channel feed. <span class="rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">confirm date</span> listed as a 2026 video in search results but the upload date was not machine-verified.</p>
        <p>A level counts as reached when every item in that month and all earlier months is checked.</p>
      </div>
      <ul class="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
        ${legendHtml()}
      </ul>
    </details>

    <div class="mt-6 space-y-6">
      ${PHASES.map((ph) => `<section aria-label="${esc(ph.name)}">
        <h2 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${ph.text}"><span class="inline-block h-2 w-8 rounded-full bg-gradient-to-r ${ph.grad}"></span>${esc(ph.name)}</h2>
        <div class="space-y-4">
          ${PLAN.filter((m) => ph.months.includes(m.n)).map(monthHtml).join("\n")}
        </div>
      </section>`).join("\n")}
    </div>

    <section id="allLinks" class="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 class="text-lg font-bold">All links (plain list)</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">Every link on this page, readable without scripts or styling.</p>
      ${allLinksHtml()}
    </section>

    <footer class="mt-8 text-sm text-slate-500 dark:text-slate-400">
      <p class="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-3 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">Tools such as OpenClaw can act with broad system access. Run them in an isolated VM or container with throwaway credentials, never with production secrets.</p>
      <p class="mt-3">Progress is saved in this browser only (localStorage).</p>
    </footer>
  </main>
</div>

<script>${component}</script>
<script>${alpine}</script>
</body>
</html>
`;

fs.writeFileSync("./index.html", html);
console.log(`Wrote index.html (${(html.length / 1024).toFixed(0)} KB): ${PLAN.length} months, ${totalItems} items, ${PLAN.reduce((a, m) => a + m.items.reduce((b, i) => b + (i.links || []).length, 0), 0)} links`);
