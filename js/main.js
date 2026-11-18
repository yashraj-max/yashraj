/* =====================================================================
   PLAYER ONE — Engine
   Renders everything from js/data.js. You don't need to edit this file.
   ===================================================================== */
(() => {
  "use strict";

  const D = window.PORTFOLIO || {};
  const S = D.settings || {};
  const P = D.player || {};
  const SEC = D.sections || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("p1_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("p1_" + k, JSON.stringify(v)); } catch {} }
  };
  const isUrl = (s) => typeof s === "string" && /^(https?:|data:|\.{0,2}\/|assets\/|images\/)/.test(s);

  /* Fallback image (used if a placeholder URL fails to load) */
  const fallbackImg = (label = "IMAGE") => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ff2bd6'/><stop offset='1' stop-color='#22e7ff'/></linearGradient></defs><rect width='800' height='500' fill='#140e38'/><rect width='800' height='500' fill='url(#g)' opacity='.25'/><text x='50%' y='50%' fill='#fff' font-family='monospace' font-size='34' text-anchor='middle' dominant-baseline='middle'>${String(label).replace(/[<&'"]/g, "").slice(0, 28)}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
  const img = (src, alt, cls = "") => `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-fallback="${esc(alt)}" />`;
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t.tagName === "IMG" && !t.dataset.failed) {
      t.dataset.failed = "1";
      if (t.closest(".skill-ico, .inv-slot")) {
        const span = document.createElement("span");
        span.className = "em"; span.style.fontFamily = "var(--f-pixel)"; span.style.fontSize = "14px";
        span.textContent = (t.alt || "?").slice(0, 2).toUpperCase();
        t.replaceWith(span);
      } else t.src = fallbackImg(t.dataset.fallback || t.alt);
    }
  }, true);

  /* Social icons */
  const ICONS = {
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>',
    linkedin: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/>',
    x: '<path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16z"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/>',
    leetcode: '<path d="M13.5 0a1.4 1.4 0 0 0-1 .4L7 6.3l-2.8 3a5.3 5.3 0 0 0-1.3 2.1 5.5 5.5 0 0 0 .1 3.6 5.3 5.3 0 0 0 1.2 1.9l4.4 4.5c1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.3-.7 4.5-1.8l2.7-2.6a1.4 1.4 0 0 0-1.9-2l-2.7 2.6a3.6 3.6 0 0 1-5.2-.1L6.3 15a2.7 2.7 0 0 1 0-3.8L10.5 7l.1-.1L14.5 2.4A1.4 1.4 0 0 0 13.5 0zm-2.8 13.4a1.4 1.4 0 0 0 0 2.8h9.9a1.4 1.4 0 0 0 0-2.8z"/>',
    codechef: '<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 13H8v-2h3v-4H9v-2h4v6h3v2z"/>',
    hackerrank: '<path d="M12 0 1.6 6v12L12 24l10.4-6V6L12 0zm2.9 17.8h-1.6v-4.7h-2.6v4.7H9.1V6.2h1.6v5.2h2.6V6.2h1.6v11.6z"/>',
    codeforces: '<path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5z"/>',
    youtube: '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>',
    medium: '<path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4S14.1 15.5 14.1 12s1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4zM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.6-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12z"/>',
    mail: '<path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm10 7.2L2.7 6h18.6L12 11.2zM2 8v10h20V8l-10 5.6L2 8z"/>',
    web: '<path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm7.9 7h-3.4a18 18 0 0 0-1.6-4.4A9.6 9.6 0 0 1 19.9 7zM12 2.4c1 1.4 1.8 3 2.3 4.6H9.7c.5-1.6 1.3-3.2 2.3-4.6zM2.7 14.4a9.7 9.7 0 0 1 0-4.8h3.9a20 20 0 0 0 0 4.8H2.7zm1.4 2.6h3.4c.4 1.6 1 3 1.7 4.4A9.6 9.6 0 0 1 4.1 17zM7.5 7H4.1a9.6 9.6 0 0 1 5.1-4.4C8.5 4 7.9 5.4 7.5 7zM12 21.6c-1-1.4-1.8-3-2.3-4.6h4.6c-.5 1.6-1.3 3.2-2.3 4.6zm2.8-7.2H9.2a17.6 17.6 0 0 1 0-4.8h5.6a17.6 17.6 0 0 1 0 4.8zm.3 7a18 18 0 0 0 1.6-4.4h3.4a9.6 9.6 0 0 1-5 4.4zm2.3-7a20 20 0 0 0 0-4.8h3.9a9.7 9.7 0 0 1 0 4.8h-3.9z"/>'
  };
  const socialHTML = (list) => (list || []).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}" title="${esc(s.name)}" data-sfx><svg viewBox="0 0 24 24">${ICONS[s.icon] || ICONS.web}</svg></a>`).join("");

  /* ---------------- SOUND (WebAudio, no files) ---------------- */
  let soundOn = store.get("sound", !!S.soundDefault);
  let actx = null;
  const beep = (freq = 660, dur = 0.06, type = "square", vol = 0.04, when = 0) => {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = freq;
      const t = actx.currentTime + when;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch {}
  };
  const sfx = {
    hover: () => beep(1200, 0.025, "square", 0.015),
    click: () => beep(520, 0.07, "square", 0.04),
    coin: () => { beep(988, 0.08); beep(1319, 0.25, "square", 0.04, 0.08); },
    level: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.12, "square", 0.035, i * 0.09)),
    error: () => beep(160, 0.2, "sawtooth", 0.04)
  };

  /* ---------------- META + THEME ---------------- */
  document.title = S.siteTitle || P.name || document.title;
  const md = $('meta[name="description"]'); if (md && S.siteDescription) md.content = S.siteDescription;
  const THEMES = ["synthwave", "matrix", "sunset", "ocean"];
  let theme = store.get("theme", S.theme || "synthwave");
  if (!THEMES.includes(theme)) theme = "synthwave";
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; store.set("theme", t); };
  applyTheme(theme);

  /* SVG gradient for skill rings */
  document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--a1)"/><stop offset="1" stop-color="var(--a2)"/></linearGradient></defs></svg>`);

  /* ---------------- SECTION HEADS + NAV ---------------- */
  const order = ["profile", "skills", "loadout", "quests", "journey", "achievements", "guilds", "contact"];
  const visible = order.filter((k) => !SEC[k] || SEC[k].show !== false);
  order.forEach((k) => { if (!visible.includes(k)) { const el = document.getElementById(k); if (el) el.remove(); } });
  if (!visible.includes("profile")) { const st = $("#stats"); if (st) st.remove(); }

  let zoneNum = 1;
  visible.forEach((k) => {
    const head = $(`[data-head="${k}"]`); const s = SEC[k] || {};
    if (!head) return;
    zoneNum++;
    head.classList.add("reveal");
    head.innerHTML = `<div class="zh-tag">ZONE ${String(zoneNum).padStart(2, "0")} // ${esc((s.nav || k).toUpperCase())}</div>
      <h2 class="zh-title"><span class="ic">${esc(s.icon || "")}</span>${esc(s.title || k)}</h2>
      ${s.subtitle ? `<p class="zh-sub">${esc(s.subtitle)}</p>` : ""}`;
  });

  const navHTML = (dock) => visible.map((k) => {
    const s = SEC[k] || {};
    return dock
      ? `<a href="#${k}" data-nav="${k}" data-sfx>${esc(s.icon || "•")}<small>${esc(s.nav || k)}</small></a>`
      : `<a href="#${k}" data-nav="${k}" data-sfx>${esc(s.nav || k)}</a>`;
  }).join("");
  $("#hudNav").innerHTML = navHTML(false);
  $("#dock").innerHTML = navHTML(true);
  $("#hudHandle").textContent = P.handle || "player.one";

  /* ---------------- HERO ---------------- */
  const name = P.name || "Player One";
  const heroName = $("#heroName"); heroName.textContent = name; heroName.dataset.text = name;
  $("#heroIntro").textContent = P.intro || "";
  const resumeBtn = $("#resumeBtn");
  if (P.resume) resumeBtn.href = P.resume; else resumeBtn.remove();
  $("#heroSocials").innerHTML = socialHTML(D.socials);
  $("#heroLore").innerHTML = (P.lore || []).map((l) => `<span>${esc(l)}</span>`).join("");

  const ccAvatar = $("#ccAvatar"); ccAvatar.src = P.avatar || fallbackImg("YOU"); ccAvatar.alt = name; ccAvatar.dataset.fallback = "YOU";
  $("#ccLv").textContent = P.year || 1;
  $("#ccName").textContent = name;
  $("#ccBranch").textContent = P.branch || "";
  $("#ccCollege").textContent = P.college || "";
  const totalSem = P.totalSemesters || 8;
  $("#ccSem").textContent = `${P.semester || 1} / ${totalSem}`;
  $("#ccCgpa").textContent = P.cgpa || "—";
  $("#ccBatch").textContent = P.batch || "—";
  $("#ccLoc").textContent = P.location || "—";
  $("#ccStatus").textContent = P.status || "";
  if (!P.statusOnline) $("#ccDot").classList.add("away");
  $("#ccAttrs").innerHTML = (P.attributes || []).map((a) => `<li><span>${esc(a.label)}</span><div class="ab"><i data-w="${Math.min(100, +a.value || 0)}"></i></div><b>${esc(a.value)}</b></li>`).join("");

  setTimeout(() => {
    $("#ccXpBar").style.width = Math.min(100, ((P.semester || 1) / totalSem) * 100) + "%";
    $$("#ccAttrs i").forEach((i) => (i.style.width = i.dataset.w + "%"));
  }, 600);

  /* Typing effect */
  (function typer() {
    const el = $("#typed"); const words = (P.classTitles && P.classTitles.length) ? P.classTitles : ["Developer"];
    if (reduceMotion) { el.textContent = words[0]; return; }
    let w = 0, c = 0, del = false;
    const tick = () => {
      const word = [...words[w]];
      el.textContent = word.slice(0, c).join("");
      if (!del && c < word.length) c++;
      else if (del && c > 0) c--;
      else if (!del) { del = true; return setTimeout(tick, 1700); }
      else { del = false; w = (w + 1) % words.length; }
      setTimeout(tick, del ? 35 : 75);
    };
    tick();
  })();

  /* Random glitch on name */
  if (!reduceMotion) setInterval(() => { heroName.classList.add("glitching"); setTimeout(() => heroName.classList.remove("glitching"), 280); }, 5200);

  /* 3D tilt on character card */
  const card = $("#charCard");
  if (finePointer && !reduceMotion) {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg)`;
      card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  }

  /* Ticker */
  const tickWords = [];
  (D.skills || []).forEach((c) => (c.items || []).forEach((i) => i.status !== "learning" && tickWords.push(i.name)));
  const tw = (tickWords.length ? tickWords : ["CODE", "BUILD", "SHIP"]).slice(0, 14);
  const tickOnce = tw.map((w) => `<span>${esc(w.toUpperCase())}</span><span class="star">✦</span>`).join("");
  $("#ticker").innerHTML = tickOnce + tickOnce;

  /* ---------------- STATS ---------------- */
  $("#statsGrid").innerHTML = (D.stats || []).map((s, i) => `
    <div class="stat reveal" style="--d:${i * 0.08}s">
      <div class="stat-ic">${esc(s.icon || "★")}</div>
      <div class="stat-num" data-count="${+s.value || 0}" data-suffix="${esc(s.suffix || "")}">0</div>
      <div class="stat-lbl">${esc(s.label)}</div>
    </div>`).join("");
  const countUp = (el) => {
    const target = +el.dataset.count, suf = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * e).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------------- SKILL TREE ---------------- */
  const tier = (l) => (l >= 85 ? "Master" : l >= 65 ? "Adept" : l >= 40 ? "Apprentice" : "Novice");
  const skillCats = D.skills || [];
  const tabs = $("#skillTabs");
  if (tabs) {
    tabs.innerHTML = skillCats.map((c, i) => `<button class="skill-tab${i === 0 ? " active" : ""}" role="tab" data-cat="${i}" data-sfx>${esc(c.icon || "")} ${esc(c.category)} <span class="cnt">${(c.items || []).length}</span></button>`).join("");
    const renderSkills = (idx) => {
      const C = 2 * Math.PI * 40;
      $("#skillGrid").innerHTML = ((skillCats[idx] || {}).items || []).map((s, i) => {
        const learning = s.status === "learning";
        const lv = Math.max(1, Math.round((+s.level || 0) / 10));
        const icon = isUrl(s.icon) ? img(s.icon, s.name) : `<span>${esc(s.icon || "✦")}</span>`;
        return `<div class="skill${learning ? " learning" : ""}" style="--d:${i * 0.06}s" title="${esc(s.name)} — ${esc(s.level)}%">
          ${learning ? '<span class="skill-lock">🔓</span>' : ""}
          <span class="skill-lv">LV${lv}</span>
          <div class="skill-ring"><svg viewBox="0 0 92 92"><circle class="bgc" cx="46" cy="46" r="40"/><circle class="fgc" cx="46" cy="46" r="40" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - Math.min(100, +s.level || 0) / 100)}"/></svg><div class="skill-ico">${icon}</div></div>
          <div class="skill-name">${esc(s.name)}</div>
          <div class="skill-tier">${learning ? "Unlocking…" : tier(+s.level || 0)} · ${esc(s.level)}%</div>
        </div>`;
      }).join("");
      requestAnimationFrame(() => setTimeout(() => $$("#skillGrid .fgc").forEach((c) => { c.style.strokeDashoffset = c.dataset.off; }), 60));
    };
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".skill-tab"); if (!b) return;
      $$(".skill-tab", tabs).forEach((t) => t.classList.toggle("active", t === b));
      renderSkills(+b.dataset.cat);
    });
    renderSkills(0);
  }

  /* ---------------- LOADOUT ---------------- */
  const inv = D.inventory || [];
  if ($("#invGrid")) {
    const slots = Math.max(inv.length, Math.ceil(inv.length / 6) * 6 || 6);
    let html = inv.map((it, i) => `<button class="inv-slot" data-r="${esc(it.rarity || "common")}" data-i="${i}" aria-label="${esc(it.name)}" title="${esc(it.name)}" data-sfx>${isUrl(it.icon) ? img(it.icon, it.name) : `<span class="em">${esc(it.icon || "🧰")}</span>`}</button>`).join("");
    for (let i = inv.length; i < slots; i++) html += `<div class="inv-slot empty" aria-hidden="true"></div>`;
    $("#invGrid").innerHTML = html;
    $("#invCount").textContent = `${inv.length}/${slots}`;
    const rc = { common: "var(--r-common)", rare: "var(--r-rare)", epic: "var(--r-epic)", legendary: "var(--r-legendary)" };
    const showItem = (i) => {
      const it = inv[i]; if (!it) return;
      $$(".inv-slot").forEach((s) => s.classList.toggle("sel", s.dataset.i == i));
      $("#invDetail").innerHTML = `<b>${esc(it.name)}</b> · <span class="rar" style="color:${rc[it.rarity] || rc.common}">${esc(it.rarity || "common")}</span><br>${esc(it.note || "")}`;
    };
    $("#invGrid").addEventListener("click", (e) => { const s = e.target.closest(".inv-slot[data-i]"); if (s) showItem(+s.dataset.i); });
    $("#invGrid").addEventListener("mouseover", (e) => { const s = e.target.closest(".inv-slot[data-i]"); if (s && finePointer) showItem(+s.dataset.i); });
    $("#learnList").innerHTML = (D.learning || []).map((l) => `
      <div class="learn-item">
        <div class="li-row"><b>${esc(l.name)}</b><span>ETA: ${esc(l.eta || "—")}</span></div>
        <div class="load-bar"><i data-w="${Math.min(100, +l.progress || 0)}"></i><em>${esc(l.progress)}%</em></div>
      </div>`).join("");
  }

  /* ---------------- QUESTS ---------------- */
  const quests = D.quests || [];
  const stars = (n) => { n = Math.max(0, Math.min(5, +n || 0)); return "★".repeat(n) + `<span class="off">${"★".repeat(5 - n)}</span>`; };
  if ($("#questGrid")) {
    const filters = [
      { k: "all", l: "All Quests" },
      { k: "main", l: "⚔️ Main Quests" },
      { k: "side", l: "🗡️ Side Quests" },
      { k: "prog", l: "⏳ In Progress" }
    ];
    const count = (k) => quests.filter((q) => k === "all" || (k === "prog" ? q.status !== "Completed" : q.type === k)).length;
    $("#questFilters").innerHTML = filters.filter((f) => count(f.k) > 0).map((f, i) => `<button class="qf${i === 0 ? " active" : ""}" data-f="${f.k}" data-sfx>${f.l} (${count(f.k)})</button>`).join("");
    $("#questGrid").innerHTML = quests.map((q, i) => {
      const done = q.status === "Completed";
      return `<article class="quest reveal" style="--d:${(i % 3) * 0.1}s" data-type="${esc(q.type)}" data-prog="${done ? 0 : 1}">
        <div class="q-media">${img(q.image || fallbackImg(q.title), q.title)}
          <span class="q-type ${q.type === "side" ? "side" : ""}">${q.type === "side" ? "SIDE QUEST" : "MAIN QUEST"}</span>
          <span class="q-status ${done ? "done" : "prog"}">${done ? "✔ " : "◔ "}${esc(q.status || "")}</span>
        </div>
        <div class="q-body">
          <div class="q-meta"><span class="stars" title="Difficulty">${stars(q.difficulty)}</span><span>${esc(q.date || "")}</span></div>
          <h3 class="q-title">${esc(q.title)}</h3>
          <p class="q-sum">${esc(q.summary || "")}</p>
          <div class="tags">${(q.tech || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="q-foot"><span class="q-xp">+${esc(q.xp || 0)} XP</span><button class="q-open" data-q="${i}" data-sfx>Quest Log →</button></div>
        </div>
      </article>`;
    }).join("");
    $("#questFilters").addEventListener("click", (e) => {
      const b = e.target.closest(".qf"); if (!b) return;
      $$(".qf").forEach((x) => x.classList.toggle("active", x === b));
      const f = b.dataset.f;
      $$(".quest").forEach((q) => q.classList.toggle("hide", !(f === "all" || (f === "prog" ? q.dataset.prog === "1" : q.dataset.type === f))));
    });
    $("#questGrid").addEventListener("click", (e) => {
      const b = e.target.closest(".q-open, .q-media"); if (!b) return;
      const idx = b.dataset.q ?? b.closest(".quest").querySelector(".q-open").dataset.q;
      openQuest(+idx);
    });
  }

  const modal = $("#modal");
  let lastFocus = null;
  function openQuest(i) {
    const q = quests[i]; if (!q) return;
    const L = q.links || {};
    $("#modalContent").innerHTML = `
      <div class="m-hero">${img(q.image || fallbackImg(q.title), q.title)}</div>
      <div class="m-body">
        <div class="m-kicker">${q.type === "side" ? "SIDE QUEST" : "MAIN QUEST"} · ${esc((q.status || "").toUpperCase())} · +${esc(q.xp || 0)} XP</div>
        <h3 class="m-title" id="mTitle">${esc(q.title)}</h3>
        <div class="m-meta"><span>📅 ${esc(q.date || "—")}</span><span>👥 ${esc(q.team || "—")}</span><span class="stars">${stars(q.difficulty)}</span></div>
        <div class="m-block"><h4>// OBJECTIVE</h4><p>${esc(q.objective || q.summary || "")}</p></div>
        <div class="m-grid">
          <div class="m-block"><h4>// WHAT I DID</h4><ul>${(q.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
          <div class="m-block"><h4>// LOOT (WHAT I LEARNT)</h4><ul>${(q.learnings || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
        </div>
        <div class="tags">${(q.tech || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="m-links">
          ${L.code ? `<a class="btn btn-primary btn-sm" href="${esc(L.code)}" target="_blank" rel="noopener">⌥ Source Code</a>` : ""}
          ${L.live ? `<a class="btn btn-ghost btn-sm" href="${esc(L.live)}" target="_blank" rel="noopener">▶ Live Demo</a>` : ""}
        </div>
      </div>`;
    lastFocus = document.activeElement;
    modal.hidden = false; document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
    sfx.coin();
    gainXP(25, "quest-" + i);
  }
  const closeModal = () => { if (modal.hidden) return; modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus(); };
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------------- JOURNEY MAP ---------------- */
  if ($("#mapTrack")) {
    $("#mapTrack").innerHTML = (D.journey || []).map((l) => {
      const st = l.status || "locked";
      if (st === "locked") {
        return `<div class="lvl locked"><div class="lvl-node"><span>${esc(l.level)}</span></div>
          <div class="lvl-card"><div><div class="lock-big">🔒</div><div class="lvl-label">LEVEL ${esc(l.level)}</div>
          <div class="lvl-title">${esc(l.title || "???")}</div><div class="lvl-period">${esc(l.period || "")}</div><div class="dim" style="font-size:13px">Coming soon…</div></div></div></div>`;
      }
      return `<div class="lvl ${st}">
        <div class="lvl-path"></div>
        ${st === "current" ? `<div class="lvl-pin">${img(P.avatar || fallbackImg("YOU"), "You are here")}<small>YOU</small></div>` : ""}
        <div class="lvl-node"><span>${st === "done" ? "✓" : esc(l.level)}</span></div>
        <div class="lvl-card">
          <div class="lvl-label">LEVEL ${esc(l.level)} · ${st === "done" ? "CLEARED" : "IN PROGRESS"}</div>
          <div class="lvl-title">${esc(l.title)}</div>
          <div class="lvl-period">${esc(l.period || "")}${l.sgpa && l.sgpa !== "—" ? ` · SGPA ${esc(l.sgpa)}` : ""}</div>
          ${l.boss ? `<div class="lvl-boss"><span>👹 Boss: ${esc(l.boss)}</span><b>${st === "done" ? "DEFEATED" : "FIGHTING"}</b></div>` : ""}
          <ul>${(l.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div></div>`;
    }).join("");

    /* drag to scroll */
    const ms = $("#mapScroll"); let down = false, sx = 0, sl = 0;
    ms.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = ms.scrollLeft; ms.classList.add("drag"); });
    window.addEventListener("pointerup", () => { down = false; ms.classList.remove("drag"); });
    ms.addEventListener("pointermove", (e) => { if (down) ms.scrollLeft = sl - (e.clientX - sx); });
    ms.addEventListener("wheel", (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && ms.scrollWidth > ms.clientWidth) { const max = ms.scrollWidth - ms.clientWidth; if ((e.deltaY > 0 && ms.scrollLeft < max) || (e.deltaY < 0 && ms.scrollLeft > 0)) { ms.scrollLeft += e.deltaY; e.preventDefault(); } } }, { passive: false });
    /* centre the current level */
    setTimeout(() => { const cur = $(".lvl.current", ms); if (cur) ms.scrollLeft = cur.offsetLeft - ms.clientWidth / 2 + cur.offsetWidth / 2; }, 300);
  }

  /* ---------------- TROPHIES ---------------- */
  const ach = D.achievements || [];
  if ($("#trophyGrid")) {
    const unlocked = ach.filter((a) => !a.locked);
    const by = (r) => unlocked.filter((a) => a.rarity === r).length;
    $("#trophySummary").innerHTML = `<span>🏆 Unlocked <b>${unlocked.length}</b> / ${ach.length}</span>` +
      ["legendary", "epic", "rare", "common"].filter(by).map((r) => `<span>${r[0].toUpperCase() + r.slice(1)} <b>${by(r)}</b></span>`).join("");
    $("#trophyGrid").innerHTML = ach.map((a, i) => `
      <div class="trophy reveal${a.locked ? " locked" : ""}" data-r="${esc(a.rarity || "common")}" style="--d:${(i % 4) * 0.08}s" tabindex="0">
        <div class="t-inner">
          <div class="t-face">
            <div class="t-hex">${esc(a.icon || "🏆")}</div>
            <div class="t-rar">${a.locked ? "LOCKED" : esc(a.rarity || "common")}</div>
            <div class="t-title">${esc(a.title)}</div>
            <div class="t-iss">${esc(a.issuer || "")}</div>
          </div>
          <div class="t-face t-back">
            <div class="t-rar">${a.locked ? "NEXT GOAL" : "ACHIEVEMENT"}</div>
            ${a.date ? `<div class="t-date">${esc(a.date)}</div>` : ""}
            <p>${esc(a.description || "")}</p>
            ${a.link ? `<a class="btn btn-ghost btn-sm" href="${esc(a.link)}" target="_blank" rel="noopener">View Credential ↗</a>` : ""}
          </div>
        </div>
      </div>`).join("");
    $("#trophyGrid").addEventListener("click", (e) => { const t = e.target.closest(".trophy"); if (t && !e.target.closest("a")) { t.classList.toggle("flip"); sfx.click(); } });
    $("#trophyGrid").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.classList.contains("trophy")) e.target.classList.toggle("flip"); });
  }

  /* ---------------- GUILDS ---------------- */
  if ($("#guildGrid")) {
    $("#guildGrid").innerHTML = (D.guilds || []).map((g, i) => `
      <article class="guild reveal" style="--d:${(i % 4) * 0.08}s">
        <div class="g-crest">${esc(g.icon || "🛡️")}</div>
        <h3 class="g-name">${esc(g.name)}</h3>
        <div class="g-role">${esc(g.role || "")}</div>
        <div class="g-period">${esc(g.period || "")}</div>
        <p class="g-desc">${esc(g.description || "")}</p>
      </article>`).join("");
  }

  /* ---------------- CONTACT ---------------- */
  const C = D.contact || {};
  if ($("#contactForm")) {
    $("#ciTitle").textContent = C.heading || "Ready Player Two?";
    $("#ciMsg").textContent = C.message || "";
    $("#ciEmail").textContent = P.email || "";
    $("#ciSocials").innerHTML = socialHTML(D.socials);
    $("#ciRows").innerHTML = [
      P.location && ["📍", P.location],
      C.phone && ["📞", C.phone],
      P.status && ["🟢", P.status]
    ].filter(Boolean).map(([i, t]) => `<div><span>${i}</span><span>${esc(t)}</span></div>`).join("");

    $("#emailChip").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(P.email || ""); toast("📋", "COPIED", "Email copied to clipboard"); }
      catch { window.location.href = "mailto:" + (P.email || ""); }
    });

    const form = $("#contactForm"), out = $("#termOut");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const nm = (fd.get("name") || "").toString().trim(), em = (fd.get("email") || "").toString().trim(), msg = (fd.get("message") || "").toString().trim();
      out.classList.remove("err");
      if (!nm || !/^\S+@\S+\.\S+$/.test(em) || !msg) { out.textContent = "✖ ERROR: fill all fields with a valid email"; out.classList.add("err"); sfx.error(); return; }
      if (C.formAction) {
        out.textContent = "⠋ transmitting…";
        try {
          const r = await fetch(C.formAction, { method: "POST", body: fd, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
          out.textContent = "✔ Invite sent! +500 XP"; form.reset();
        } catch { out.textContent = "✖ Couldn't send. Try email instead."; out.classList.add("err"); sfx.error(); return; }
      } else {
        const body = encodeURIComponent(`${msg}\n\n— ${nm} (${em})`);
        window.location.href = `mailto:${P.email}?subject=${encodeURIComponent(fd.get("subject") + " — from " + nm)}&body=${body}`;
        out.textContent = "✔ Opening your mail app… +500 XP";
      }
      sfx.level(); confetti(); gainXP(500, "contact");
      toast("📡", "ACHIEVEMENT UNLOCKED", "Party invite sent!");
    });
  }

  /* ---------------- FOOTER ---------------- */
  $("#footNote").textContent = (D.footer || {}).note || "";
  $("#footYear").textContent = (D.footer || {}).year || new Date().getFullYear();
  $("#footName").textContent = name;

  /* ---------------- TOASTS ---------------- */
  function toast(icon, small, text, life = 3.2) {
    const t = document.createElement("div");
    t.className = "toast"; t.style.setProperty("--life", life + "s");
    t.innerHTML = `<div class="ti">${icon}</div><div><small>${esc(small)}</small><b>${esc(text)}</b></div>`;
    $("#toasts").appendChild(t);
    setTimeout(() => t.remove(), (life + 0.6) * 1000);
  }

  /* ---------------- VISITOR XP ---------------- */
  let xp = 0; const earned = new Set();
  const XP_PER_LV = 300;
  function gainXP(n, key) {
    if (key && earned.has(key)) return;
    if (key) earned.add(key);
    const before = Math.floor(xp / XP_PER_LV);
    xp += n;
    const lv = Math.floor(xp / XP_PER_LV);
    $("#visXp").textContent = xp; $("#visLv").textContent = lv + 1;
    $("#visBar").style.width = ((xp % XP_PER_LV) / XP_PER_LV) * 100 + "%";
    if (lv > before) { setTimeout(() => { toast("⬆️", "LEVEL UP", `You reached Visitor LV ${lv + 1}`); sfx.level(); }, 400); }
  }

  /* ---------------- ZONES (scroll spy + discovery) ---------------- */
  const zones = $$("[data-zone]").filter((z) => z.id !== "stats");
  const found = new Set();
  $("#zonesTotal").textContent = zones.length;
  const navLinks = () => $$("[data-nav]");
  const setActive = (id) => navLinks().forEach((a) => a.classList.toggle("active", a.dataset.nav === id));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id; setActive(id);
      if (!found.has(id)) {
        found.add(id);
        $("#zonesFound").textContent = found.size;
        if (id !== "profile" && !booting) {
          const s = SEC[id] || {};
          toast(s.icon || "✦", "ZONE DISCOVERED  +100 XP", s.title || id, 2.4);
          sfx.coin();
        }
        gainXP(100, "zone-" + id);
        if (found.size === zones.length) {
          $("#zonesMsg").textContent = "· 💯 Completionist!";
          setTimeout(() => { toast("💯", "ACHIEVEMENT UNLOCKED", "Completionist — explored every zone!", 4); confetti(); sfx.level(); }, 900);
        }
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  zones.forEach((z) => spy.observe(z));

  /* Reveal + counters + bars */
  const rev = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target; el.classList.add("in");
      $$("[data-count]", el).forEach(countUp);
      rev.unobserve(el);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => rev.observe(el));
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { $$(".load-bar i", en.target).forEach((i) => (i.style.width = i.dataset.w + "%")); barObs.unobserve(en.target); } });
  }, { threshold: 0.3 });
  const lp = $(".learn-panel"); if (lp) barObs.observe(lp);

  /* HUD hide on scroll down */
  let lastY = 0; const hud = $("#hud");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    hud.classList.toggle("hidden-up", y > lastY && y > 400 && modal.hidden);
    lastY = y;
  }, { passive: true });

  /* ---------------- STARFIELD ---------------- */
  (function starfield() {
    const cv = $("#stars"), ctx = cv.getContext("2d");
    let w, h, stars = [], mx = 0, my = 0, shoot = null, dpr = Math.min(2, window.devicePixelRatio || 1);
    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--a2").trim() || "#22e7ff";
    let accent = color();
    const resize = () => {
      w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
      const n = Math.min(260, Math.floor((innerWidth * innerHeight) / 7000));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1, t: Math.random() * 6 }));
    };
    resize(); addEventListener("resize", resize);
    addEventListener("mousemove", (e) => { mx = (e.clientX / innerWidth - 0.5); my = (e.clientY / innerHeight - 0.5); });
    starfield.refresh = () => (accent = color());
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduceMotion) { s.y += s.z * 0.25 * dpr; s.t += 0.03; if (s.y > h) { s.y = 0; s.x = Math.random() * w; } }
        const x = s.x + mx * 40 * s.z * dpr, y = s.y + my * 40 * s.z * dpr;
        const size = Math.max(1, Math.round(s.z * 2.2 * dpr));
        ctx.globalAlpha = 0.35 + Math.sin(s.t) * 0.25 + s.z * 0.35;
        ctx.fillStyle = s.z > 0.82 ? accent : "#ffffff";
        ctx.fillRect(x, y, size, size);
      }
      if (!reduceMotion) {
        if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.3, l: 0 };
        if (shoot) {
          shoot.l += 1; const len = 120 * dpr, sx = shoot.x + shoot.l * 14 * dpr, sy = shoot.y + shoot.l * 6 * dpr;
          const g = ctx.createLinearGradient(sx, sy, sx - len, sy - len * 0.43);
          g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2 * dpr;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - len, sy - len * 0.43); ctx.stroke();
          if (shoot.l > 60) shoot = null;
        }
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion && !document.hidden) requestAnimationFrame(draw);
    };
    draw();
    document.addEventListener("visibilitychange", () => { if (!document.hidden && !reduceMotion) requestAnimationFrame(draw); });
    window.__starfield = starfield;
  })();

  /* ---------------- CONFETTI (pixel squares) ---------------- */
  function confetti() {
    if (reduceMotion) return;
    const cv = $("#confetti"), ctx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    const css = getComputedStyle(document.documentElement);
    const cols = ["--a1", "--a2", "--a3", "--a4"].map((v) => css.getPropertyValue(v).trim());
    const ps = Array.from({ length: 160 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.55,
      vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 6, s: Math.random() * 6 + 4, c: cols[(Math.random() * 4) | 0], life: 0
    }));
    const step = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      ps.forEach((p) => { p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.life++; if (p.y < cv.height + 20) alive = true; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s); });
      if (alive) requestAnimationFrame(step); else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    step();
  }

  /* ---------------- CUSTOM CURSOR ---------------- */
  if (S.customCursor !== false && finePointer && !reduceMotion) {
    const cur = $("#cursor"), dot = $("#cursorDot");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy, first = true;
    addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (first) { first = false; cx = tx; cy = ty; document.body.classList.add("has-cursor"); } dot.style.transform = `translate(${tx}px, ${ty}px)`; });
    (function loop() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => cur.classList.toggle("hover", !!e.target.closest("a, button, .trophy, .inv-slot, .q-media")));
    document.addEventListener("mouseleave", () => { cur.style.opacity = 0; dot.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { cur.style.opacity = ""; dot.style.opacity = ""; });
  }

  /* Sound hooks */
  document.addEventListener("mouseover", (e) => { const t = e.target.closest("[data-sfx]"); if (t && !t.contains(e.relatedTarget)) sfx.hover(); });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-sfx]")) sfx.click(); });

  /* ---------------- TOOLS: sound / CRT ---------------- */
  const btnSound = $("#btnSound"), btnCrt = $("#btnCrt");
  const paintSound = () => { btnSound.textContent = soundOn ? "🔊" : "🔇"; btnSound.classList.toggle("on", soundOn); };
  const toggleSound = () => { soundOn = !soundOn; store.set("sound", soundOn); paintSound(); if (soundOn) sfx.coin(); toast(soundOn ? "🔊" : "🔇", "SETTINGS", soundOn ? "Retro sound ON" : "Sound OFF", 1.8); };
  btnSound.addEventListener("click", toggleSound); paintSound();
  let crtOn = store.get("crt", !!S.crtDefault);
  const paintCrt = () => { document.body.classList.toggle("crt-on", crtOn); btnCrt.classList.toggle("on", crtOn); };
  const toggleCrt = () => { crtOn = !crtOn; store.set("crt", crtOn); paintCrt(); sfx.click(); };
  btnCrt.addEventListener("click", toggleCrt); paintCrt();
  const cycleTheme = () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]; applyTheme(theme);
    window.__starfield && window.__starfield.refresh && window.__starfield.refresh();
    toast("🎨", "THEME SWITCHED", theme.toUpperCase(), 1.8); sfx.coin();
  };

  /* ---------------- COMMAND PALETTE ---------------- */
  const pal = $("#palette"), pin = $("#paletteInput"), plist = $("#paletteList");
  const actions = [
    ...visible.map((k) => ({ i: (SEC[k] || {}).icon || "•", l: "Go to " + ((SEC[k] || {}).title || k), h: "zone", run: () => document.getElementById(k).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }) })),
    ...(P.resume ? [{ i: "💾", l: "Download resume", h: "file", run: () => resumeBtn.click() }] : []),
    { i: "📋", l: "Copy email address", h: "action", run: () => $("#emailChip") && $("#emailChip").click() },
    { i: "🎨", l: "Switch colour theme", h: "fx", run: cycleTheme },
    { i: "🔊", l: "Toggle retro sound", h: "fx", run: toggleSound },
    { i: "📺", l: "Toggle CRT scanlines", h: "fx", run: toggleCrt },
    { i: "🎉", l: "Throw confetti", h: "fun", run: () => { confetti(); sfx.level(); } },
    ...(D.socials || []).map((s) => ({ i: "↗", l: "Open " + s.name, h: "link", run: () => window.open(s.url, "_blank", "noopener") }))
  ];
  let pIdx = 0, pItems = actions;
  const renderPal = () => {
    const q = pin.value.toLowerCase().trim();
    pItems = actions.filter((a) => a.l.toLowerCase().includes(q));
    pIdx = Math.min(pIdx, Math.max(0, pItems.length - 1));
    plist.innerHTML = pItems.map((a, i) => `<li class="${i === pIdx ? "sel" : ""}" data-i="${i}"><span class="pi">${a.i}</span>${esc(a.l)}<small>${a.h}</small></li>`).join("") || `<li>No matching command</li>`;
  };
  const openPal = () => { pal.hidden = false; pin.value = ""; pIdx = 0; renderPal(); setTimeout(() => pin.focus(), 10); sfx.click(); };
  const closePal = () => { pal.hidden = true; };
  const runPal = (i) => { const a = pItems[i]; if (!a) return; closePal(); setTimeout(a.run, 50); };
  $("#btnPalette").addEventListener("click", openPal);
  pin.addEventListener("input", () => { pIdx = 0; renderPal(); });
  pin.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { pIdx = (pIdx + 1) % Math.max(1, pItems.length); renderPal(); e.preventDefault(); sfx.hover(); }
    else if (e.key === "ArrowUp") { pIdx = (pIdx - 1 + pItems.length) % Math.max(1, pItems.length); renderPal(); e.preventDefault(); sfx.hover(); }
    else if (e.key === "Enter") { runPal(pIdx); }
  });
  plist.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) runPal(+li.dataset.i); });
  pal.addEventListener("click", (e) => { if (e.target.closest("[data-pclose]")) closePal(); });

  /* ---------------- KEYBOARD (palette, esc, Konami) ---------------- */
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kPos = 0;
  document.addEventListener("keydown", (e) => {
    if (booting) return;
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
    if (e.key === "Escape") { closeModal(); closePal(); return; }
    if (!typing && e.key === "/" && pal.hidden) { e.preventDefault(); openPal(); return; }
    if (typing) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kPos = k === konami[kPos] ? kPos + 1 : (k === konami[0] ? 1 : 0);
    if (kPos === konami.length) {
      kPos = 0; document.body.classList.toggle("cheat");
      confetti(); sfx.level();
      toast("🕹️", "CHEAT CODE ACTIVATED", document.body.classList.contains("cheat") ? "RGB God-Mode ON" : "God-Mode OFF", 3);
      gainXP(999, "konami");
    }
  });

  /* ---------------- BOOT SCREEN ---------------- */
  let booting = false;
  (function boot() {
    const el = $("#boot");
    let seen = false; try { seen = sessionStorage.getItem("p1_booted") === "1"; } catch {}
    if (S.bootScreen === false || seen || reduceMotion) { el.classList.add("off"); return; }
    booting = true; document.body.classList.add("booting");
    const lines = S.bootLines && S.bootLines.length ? S.bootLines : ["Loading…"];
    const log = $("#bootLog"), bar = $("#bootBar"), start = $("#bootStart");
    let i = 0, done = false;
    const finish = () => {
      if (done) return; done = true;
      try { sessionStorage.setItem("p1_booted", "1"); } catch {}
      el.classList.add("hide"); document.body.classList.remove("booting");
      setTimeout(() => { el.classList.add("off"); booting = false; toast("👾", "PLAYER JOINED", `Welcome to ${name}'s world!`, 3); }, 700);
      sfx.coin();
    };
    const next = () => {
      if (done) return;
      if (i < lines.length) {
        log.textContent += "> " + lines[i] + "\n"; i++;
        bar.style.width = (i / lines.length) * 100 + "%";
        setTimeout(next, 260 + Math.random() * 180);
      } else { start.classList.add("show"); setTimeout(finish, 1400); }
    };
    setTimeout(next, 250);
    el.addEventListener("click", finish);
    addEventListener("keydown", function k() { finish(); removeEventListener("keydown", k); });
  })();
})();
