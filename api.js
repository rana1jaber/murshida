// =============================================
//  طبقة البيانات: Supabase أو الوضع التجريبي
//  الصفحات تستخدم window.Api فقط، فلا يتغير شيء فيها
//  عند الانتقال من التجريبي إلى Supabase.
// =============================================
(function () {
  const CFG = window.MURSHIDA_CONFIG || {};
  const DEMO = !CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY || !window.supabase;
  const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

  // ---------- أدوات مشتركة ----------
  function normalizeUsername(u) {
    return String(u || "").trim().toLowerCase();
  }
  function validateUsername(u) {
    if (!USERNAME_RE.test(u)) {
      throw new Error(t("err.username"));
    }
  }
  function validatePassword(p) {
    if (!p || p.length < 8) throw new Error(t("err.password"));
  }
  function validateBody(b) {
    const t = String(b || "").trim();
    if (t.length < 5) throw new Error(t("err.bodyShort"));
    if (t.length > 2000) throw new Error(t("err.bodyLong"));
    return t;
  }

  // تخزين آمن (قد يكون محظورًا في بعض المتصفحات)
  const mem = {};
  function safeStore(kind) {
    return {
      get(k) { try { return window[kind].getItem(k); } catch (e) { return mem[kind + k] ?? null; } },
      set(k, v) { try { window[kind].setItem(k, v); } catch (e) { mem[kind + k] = v; } },
      del(k) { try { window[kind].removeItem(k); } catch (e) { delete mem[kind + k]; } }
    };
  }
  const local = safeStore("localStorage");
  const session = safeStore("sessionStorage");

  // =============================================
  //  1) Supabase
  // =============================================
  function makeSupabaseApi() {
    // الجلسة تُحفظ في sessionStorage: تنتهي عند إغلاق التبويب.
    // مهم لو الطالبة تستخدم جهازًا مشتركًا في المدرسة.
    const sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
      auth: { storage: window.sessionStorage, persistSession: true, autoRefreshToken: true }
    });
    const toEmail = (u) => `${u}@${CFG.USERNAME_DOMAIN}`;
    const COLS = "id, body, reply, status, created_at, replied_at";

    function mapError(err) {
      const m = (err && err.message) || "";
      if (/already registered|already exists/i.test(m)) return new Error(t("err.taken"));
      if (/invalid login credentials/i.test(m)) return new Error(t("err.badLogin"));
      if (/email not confirmed/i.test(m)) return new Error(t("err.confirm"));
      if (/rate limit/i.test(m)) return new Error(t("err.rate"));
      if (/fetch|network/i.test(m)) return new Error(t("err.network"));
      return new Error(t("err.unknown", { m }));
    }

    return {
      mode: "supabase",
      async signUpStudent(username, password) {
        const u = normalizeUsername(username);
        validateUsername(u); validatePassword(password);
        const { data, error } = await sb.auth.signUp({ email: toEmail(u), password });
        if (error) throw mapError(error);
        if (!data.session) throw new Error(t("err.confirm"));
        return { id: data.user.id, username: u };
      },
      async signInStudent(username, password) {
        const u = normalizeUsername(username);
        const { data, error } = await sb.auth.signInWithPassword({ email: toEmail(u), password });
        if (error) throw mapError(error);
        return { id: data.user.id, username: u };
      },
      async signInCounselor(email, password) {
        const { error } = await sb.auth.signInWithPassword({ email: String(email).trim(), password });
        if (error) throw mapError(error);
        const ok = await this.isCounselor();
        if (!ok) { await sb.auth.signOut(); throw new Error(t("err.notCounselor")); }
        return true;
      },
      async signOut() { await sb.auth.signOut(); },
      async currentUser() {
        const { data } = await sb.auth.getSession();
        const user = data.session && data.session.user;
        if (!user) return null;
        const username = (user.email || "").split("@")[0];
        return { id: user.id, username };
      },
      async isCounselor() {
        const { data, error } = await sb.rpc("is_counselor");
        if (error) return false;
        return data === true;
      },
      async myQuestions() {
        // قواعد RLS ترجع أسئلة الطالبة فقط
        const { data, error } = await sb.from("questions").select(COLS).order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return data;
      },
      async askQuestion(body) {
        const t = validateBody(body);
        // user_id يُعبّأ تلقائيًا في قاعدة البيانات من auth.uid()
        const { error } = await sb.from("questions").insert({ body: t });
        if (error) throw mapError(error);
      },
      async allQuestions() {
        const { data, error } = await sb.from("questions").select(COLS).order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return data;
      },
      async reply(id, text) {
        const t = String(text || "").trim();
        if (t.length < 2) throw new Error(t("err.replyEmpty"));
        const { error } = await sb.from("questions")
          .update({ reply: t, status: "answered", replied_at: new Date().toISOString() })
          .eq("id", id);
        if (error) throw mapError(error);
      }
    };
  }

  // =============================================
  //  2) الوضع التجريبي (للمعاينة فقط)
  //  كل شيء محفوظ في هذا المتصفح، ولا يصلح للاستخدام الحقيقي.
  // =============================================
  function makeDemoApi() {
    const KEY = "murshida_demo_v1";
    const SESSION = "murshida_demo_session";
    const DEMO_COUNSELOR = { email: "counselor@demo.local", password: "demo1234" };

    function hoursAgo(h) { return new Date(Date.now() - h * 3600e3).toISOString(); }
    function seed() {
      return {
        nextId: 4,
        users: [{ id: "u-example", username: "example_student", pass: "-" }],
        questions: [
          { id: 1, user_id: "u-example", status: "new", created_at: hoursAgo(3), reply: null, replied_at: null,
            body: "(مثال) أحس إني متوترة جدًا قبل الاختبارات لدرجة إني أنسى اللي ذاكرته. وش أسوي؟" },
          { id: 2, user_id: "u-example", status: "new", created_at: hoursAgo(20), reply: null, replied_at: null,
            body: "(مثال) محتارة بين المسار العلمي والمسار الصحي، وأهلي يبغون شي وأنا أبغى شي ثاني." },
          { id: 3, user_id: "u-example", status: "answered", created_at: hoursAgo(50), replied_at: hoursAgo(30),
            body: "(مثال) صديقتي صارت تتجاهلني فجأة وما أعرف السبب.",
            reply: "أفهم إن هذا الشي مؤلم. جربي تكلمينها بهدوء وتسألينها بشكل مباشر إذا فيه شي ضايقها، وإذا تحبين تعالي مكتبي ونتكلم أكثر." }
        ]
      };
    }
    function load() {
      try { const raw = local.get(KEY); if (raw) return JSON.parse(raw); } catch (e) {}
      const s = seed(); save(s); return s;
    }
    function save(db) { local.set(KEY, JSON.stringify(db)); }
    async function hash(p) {
      try {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(p));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
      } catch (e) { return "plain:" + p; }
    }
    function getSession() { try { return JSON.parse(session.get(SESSION) || "null"); } catch (e) { return null; } }
    const pub = (q) => ({ id: q.id, body: q.body, reply: q.reply, status: q.status, created_at: q.created_at, replied_at: q.replied_at });
    const delay = () => new Promise(r => setTimeout(r, 250));

    return {
      mode: "demo",
      demoCounselor: DEMO_COUNSELOR,
      async signUpStudent(username, password) {
        await delay();
        const u = normalizeUsername(username);
        validateUsername(u); validatePassword(password);
        const db = load();
        if (db.users.some(x => x.username === u)) throw new Error(t("err.taken"));
        const user = { id: "u-" + Math.random().toString(36).slice(2, 10), username: u, pass: await hash(password) };
        db.users.push(user); save(db);
        session.set(SESSION, JSON.stringify({ id: user.id, username: u, role: "student" }));
        return { id: user.id, username: u };
      },
      async signInStudent(username, password) {
        await delay();
        const u = normalizeUsername(username);
        const db = load();
        const user = db.users.find(x => x.username === u);
        if (!user || user.pass !== await hash(password)) throw new Error(t("err.badLogin"));
        session.set(SESSION, JSON.stringify({ id: user.id, username: u, role: "student" }));
        return { id: user.id, username: u };
      },
      async signInCounselor(email, password) {
        await delay();
        if (String(email).trim().toLowerCase() !== DEMO_COUNSELOR.email || password !== DEMO_COUNSELOR.password) {
          throw new Error(t("err.badLoginC"));
        }
        session.set(SESSION, JSON.stringify({ id: "counselor", username: "counselor", role: "counselor" }));
        return true;
      },
      async signOut() { session.del(SESSION); },
      async currentUser() {
        const s = getSession();
        return s ? { id: s.id, username: s.username } : null;
      },
      async isCounselor() { const s = getSession(); return !!(s && s.role === "counselor"); },
      async myQuestions() {
        const s = getSession(); if (!s) return [];
        return load().questions.filter(q => q.user_id === s.id).map(pub)
          .sort((a, b) => b.created_at.localeCompare(a.created_at));
      },
      async askQuestion(body) {
        await delay();
        const t = validateBody(body);
        const s = getSession(); if (!s) throw new Error(t("err.loginFirst"));
        const db = load();
        db.questions.push({ id: db.nextId++, user_id: s.id, body: t, reply: null, status: "new", created_at: new Date().toISOString(), replied_at: null });
        save(db);
      },
      async allQuestions() {
        if (!(await this.isCounselor())) throw new Error(t("err.forbidden"));
        // نفس الأعمدة اللي تشوفها المرشدة في Supabase: بدون user_id
        return load().questions.map(pub).sort((a, b) => b.created_at.localeCompare(a.created_at));
      },
      async reply(id, text) {
        await delay();
        const t = String(text || "").trim();
        if (t.length < 2) throw new Error(t("err.replyEmpty"));
        const db = load();
        const q = db.questions.find(x => x.id === id);
        if (!q) throw new Error(t("err.notFound"));
        q.reply = t; q.status = "answered"; q.replied_at = new Date().toISOString();
        save(db);
      },
      resetDemo() { local.del(KEY); session.del(SESSION); }
    };
  }

  window.Api = DEMO ? makeDemoApi() : makeSupabaseApi();

  window.escapeHtml = function (s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };
})();
