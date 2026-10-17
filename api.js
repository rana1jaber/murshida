// =============================================
//  طبقة البيانات: Supabase أو الوضع التجريبي
//  الصفحات تستخدم window.Api فقط، فلا يتغير شيء فيها
//  عند الانتقال من التجريبي إلى Supabase.
// =============================================
(function () {
  const CFG = window.MURSHIDA_CONFIG || {};
  const DEMO = !CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY || !window.supabase;
  const USERNAME_RE = /^[a-z0-9_]{3,20}$/;
  const BUCKET = "value-files";
  const MAX_FILE = 5 * 1024 * 1024;
  const FILE_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };
  const COLORS = ["lilac", "sky", "mint", "peach", "sun"];

  // ---------- أدوات مشتركة ----------
  function normalizeUsername(u) {
    return String(u || "").trim().toLowerCase();
  }
  function validateUsername(u) {
    if (!USERNAME_RE.test(u)) throw new Error(t("err.username"));
  }
  function validatePassword(p) {
    if (!p || p.length < 8) throw new Error(t("err.password"));
  }
  function validateBody(b) {
    const txt = String(b || "").trim();
    if (txt.length < 5) throw new Error(t("err.bodyShort"));
    if (txt.length > 2000) throw new Error(t("err.bodyLong"));
    return txt;
  }
  function validateReply(r) {
    const txt = String(r || "").trim();
    if (txt.length < 2) throw new Error(t("err.replyEmpty"));
    return txt;
  }
  const clean = (s) => String(s ?? "").trim();
  const orNull = (s) => (clean(s) ? clean(s) : null);

  // قيمة جديدة أو معدّلة من المرشدة
  function validateValue(v) {
    const title = clean(v.title);
    if (title.length < 2 || title.length > 80) throw new Error(t("err.val.title"));
    const brief = orNull(v.brief);
    if (brief && brief.length > 1000) throw new Error(t("err.val.brief"));
    const behaviors = (Array.isArray(v.behaviors) ? v.behaviors : String(v.behaviors || "").split("\n"))
      .map(clean).filter(Boolean).slice(0, 20).map(b => b.slice(0, 200));
    const color = COLORS.includes(v.color) ? v.color : "lilac";
    return { title, brief, behaviors, color };
  }

  // مشاركة طالبة
  function validateWork(w) {
    const value_id = Number(w.value_id);
    if (!value_id) throw new Error(t("err.v.value"));
    const student_name = clean(w.student_name);
    if (student_name.length < 2 || student_name.length > 60) throw new Error(t("err.v.name"));
    const class_name = orNull(w.class_name);
    if (!class_name) throw new Error(t("err.v.grade"));
    const title = clean(w.title);
    if (title.length < 2 || title.length > 100) throw new Error(t("err.v.title"));
    const description = orNull(w.description);
    if (description && description.length > 1500) throw new Error(t("err.v.descLong"));
    let file = null;
    if (w.file) {
      if (!FILE_TYPES[w.file.type]) throw new Error(t("err.v.fileType"));
      if (w.file.size > MAX_FILE) throw new Error(t("err.v.fileSize"));
      file = w.file;
    }
    const file_name = file ? clean(w.fileName || file.name || "file").slice(0, 120) : null;
    return { value_id, student_name, class_name: class_name.slice(0, 40), title, description, file, file_name };
  }

  function uuid() {
    try { if (crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    const b = new Uint8Array(16);
    try { crypto.getRandomValues(b); } catch (e) { for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256); }
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }
  const newFilePath = (file) => `sub/${uuid()}.${FILE_TYPES[file.type]}`;

  // تخزين آمن (قد يكون محظورًا في بعض المتصفحات)
  const mem = {};
  function safeStore(kind) {
    return {
      get(k) { try { return window[kind].getItem(k); } catch (e) { return mem[kind + k] ?? null; } },
      set(k, v) {
        try { window[kind].setItem(k, v); return true; }
        catch (e) {
          // المساحة امتلأت: نرجع false عشان نعرض رسالة واضحة
          if (e && /quota/i.test(String(e.name) + String(e.message))) return false;
          mem[kind + k] = v; return true; // التخزين محظور: نكمل في الذاكرة
        }
      },
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
    // اتصال ثاني بدون أي حساب لمنصة القيم،
    // عشان المشاركات ما ترتبط أبدًا بحساب الأسئلة السرية.
    const pub = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: "murshida-public" }
    });
    const toEmail = (u) => `${u}@${CFG.USERNAME_DOMAIN}`;
    const COLS = "id, body, reply, status, created_at, replied_at";
    const VAL_COLS = "id, title, brief, behaviors, color, sort_order, created_at";
    const SUB_COLS = "id, value_id, student_name, class_name, title, description, file_path, file_name, status, created_at, reviewed_at";

    function mapError(err) {
      const m = (err && err.message) || "";
      if (/already registered|already exists/i.test(m)) return new Error(t("err.taken"));
      if (/invalid login credentials/i.test(m)) return new Error(t("err.badLogin"));
      if (/email not confirmed/i.test(m)) return new Error(t("err.confirm"));
      if (/rate limit/i.test(m)) return new Error(t("err.rate"));
      if (/payload too large|maximum allowed size|exceeded/i.test(m)) return new Error(t("err.v.fileSize"));
      if (/mime type|invalid_mime/i.test(m)) return new Error(t("err.v.fileType"));
      if (/fetch|network/i.test(m)) return new Error(t("err.network"));
      return new Error(t("err.unknown", { m }));
    }

    // روابط مؤقتة (ساعة) للملفات المرفقة
    async function withUrls(client, rows) {
      const paths = rows.filter(r => r.file_path).map(r => r.file_path);
      rows.forEach(r => (r.file_url = null));
      if (!paths.length) return rows;
      const { data, error } = await client.storage.from(BUCKET).createSignedUrls(paths, 3600);
      if (error || !data) return rows;
      const map = {};
      data.forEach(d => { if (d && d.signedUrl) map[d.path] = d.signedUrl; });
      rows.forEach(r => { if (r.file_path) r.file_url = map[r.file_path] || null; });
      return rows;
    }

    return {
      mode: "supabase",
      // ---------- الحسابات ----------
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

      // ---------- الأسئلة السرية ----------
      async myQuestions() {
        // قواعد RLS ترجع أسئلة الطالبة فقط
        const { data, error } = await sb.from("questions").select(COLS).order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return data;
      },
      async askQuestion(body) {
        const txt = validateBody(body);
        // user_id يُعبّأ تلقائيًا في قاعدة البيانات من auth.uid()
        const { error } = await sb.from("questions").insert({ body: txt });
        if (error) throw mapError(error);
      },
      async allQuestions() {
        const { data, error } = await sb.from("questions").select(COLS).order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return data;
      },
      async reply(id, text) {
        const txt = validateReply(text);
        const { error } = await sb.from("questions")
          .update({ reply: txt, status: "answered", replied_at: new Date().toISOString() })
          .eq("id", id);
        if (error) throw mapError(error);
      },

      // ---------- منصة القيم: للطالبات ----------
      async listValues() {
        const { data, error } = await pub.from("school_values").select(VAL_COLS)
          .order("sort_order", { ascending: true }).order("id", { ascending: true });
        if (error) throw mapError(error);
        return data;
      },
      async listApprovedWorks() {
        const { data, error } = await pub.from("value_submissions").select(SUB_COLS)
          .eq("status", "approved").order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return withUrls(pub, data);
      },
      async submitWork(work) {
        const w = validateWork(work);
        let file_path = null;
        if (w.file) {
          file_path = newFilePath(w.file);
          const { error: upErr } = await pub.storage.from(BUCKET)
            .upload(file_path, w.file, { contentType: w.file.type, upsert: false });
          if (upErr) throw mapError(upErr);
        }
        const { error } = await pub.from("value_submissions").insert({
          value_id: w.value_id, student_name: w.student_name, class_name: w.class_name,
          title: w.title, description: w.description, file_path, file_name: w.file_name
        });
        if (error) throw mapError(error);
      },

      // ---------- منصة القيم: للمرشدة ----------
      async adminListValues() {
        const { data, error } = await sb.from("school_values").select(VAL_COLS)
          .order("sort_order", { ascending: true }).order("id", { ascending: true });
        if (error) throw mapError(error);
        return data;
      },
      async saveValue(value) {
        const v = validateValue(value);
        const q = value.id
          ? sb.from("school_values").update(v).eq("id", value.id)
          : sb.from("school_values").insert(v);
        const { error } = await q;
        if (error) throw mapError(error);
      },
      async deleteValue(id) {
        // نحذف ملفات مشاركات القيمة أولًا، بعدين القيمة (والمشاركات تنحذف معها)
        const { data } = await sb.from("value_submissions").select("file_path").eq("value_id", id);
        const paths = (data || []).map(r => r.file_path).filter(Boolean);
        if (paths.length) await sb.storage.from(BUCKET).remove(paths);
        const { error } = await sb.from("school_values").delete().eq("id", id);
        if (error) throw mapError(error);
      },
      async adminListWorks() {
        const { data, error } = await sb.from("value_submissions").select(SUB_COLS)
          .order("created_at", { ascending: false });
        if (error) throw mapError(error);
        return withUrls(sb, data);
      },
      async reviewWork(id, status) {
        if (!["pending", "approved", "rejected"].includes(status)) throw new Error(t("err.forbidden"));
        const { error } = await sb.from("value_submissions")
          .update({ status, reviewed_at: status === "pending" ? null : new Date().toISOString() })
          .eq("id", id);
        if (error) throw mapError(error);
      },
      async deleteWork(id, file_path) {
        if (file_path) await sb.storage.from(BUCKET).remove([file_path]);
        const { error } = await sb.from("value_submissions").delete().eq("id", id);
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
    const DEMO_MAX_FILE = 1.5 * 1024 * 1024;

    function hoursAgo(h) { return new Date(Date.now() - h * 3600e3).toISOString(); }
    function seedValues(db) {
      db.nextValueId = 4; db.nextWorkId = 3;
      db.values = [
        { id: 1, title: "الاحترام", color: "lilac", sort_order: 0, created_at: hoursAgo(90),
          brief: "(مثال) أن نقدّر الآخرين ونتعامل معهم بلطف، في الكلام والتصرف.",
          behaviors: ["أستمع لغيري بدون مقاطعة", "أختار كلماتي بلطف", "أحترم الرأي المختلف"] },
        { id: 2, title: "المسؤولية", color: "mint", sort_order: 0, created_at: hoursAgo(89),
          brief: "(مثال) أن أتحمّل نتائج أفعالي وأؤدي واجباتي بإتقان.",
          behaviors: ["أسلّم واجباتي في وقتها", "أحافظ على ممتلكات المدرسة", "أعترف بخطئي وأصلحه"] },
        { id: 3, title: "التعاون", color: "sky", sort_order: 0, created_at: hoursAgo(88),
          brief: "(مثال) أن نعمل معًا ونساعد بعض عشان ننجح كلنا.",
          behaviors: ["أساعد زميلاتي في الدراسة", "أشارك بفعالية في العمل الجماعي", "أبادر بالمساعدة بدون ما أحد يطلب"] }
      ];
      db.works = [
        { id: 1, value_id: 3, student_name: "سارة (مثال)", class_name: "ثاني ثانوي / 3", status: "approved",
          title: "مجموعة مذاكرة للرياضيات", file_path: null, file_name: null, file_data: null,
          description: "سوينا مجموعة مذاكرة أسبوعية بعد الدوام، وكل وحدة تشرح درس للباقين.",
          created_at: hoursAgo(30), reviewed_at: hoursAgo(20) },
        { id: 2, value_id: 1, student_name: "نورة (مثال)", class_name: "أول ثانوي / 1", status: "pending",
          title: "لوحة كلمات لطيفة", file_path: null, file_name: null, file_data: null,
          description: "صممت لوحة للفصل فيها عبارات لطيفة نستخدمها مع بعض.",
          created_at: hoursAgo(4), reviewed_at: null }
      ];
    }
    function seed() {
      const db = {
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
      seedValues(db);
      return db;
    }
    function load() {
      try {
        const raw = local.get(KEY);
        if (raw) {
          const db = JSON.parse(raw);
          if (!db.values) { seedValues(db); save(db); } // نسخة تجريبية قديمة بدون قيم
          return db;
        }
      } catch (e) {}
      const s = seed(); save(s); return s;
    }
    function save(db) {
      if (!local.set(KEY, JSON.stringify(db))) throw new Error(t("err.v.demoFull"));
    }
    async function hash(p) {
      try {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(p));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
      } catch (e) { return "plain:" + p; }
    }
    function readAsDataUrl(file) {
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result); r.onerror = () => rej(new Error(t("err.v.fileType")));
        r.readAsDataURL(file);
      });
    }
    function getSession() { try { return JSON.parse(session.get(SESSION) || "null"); } catch (e) { return null; } }
    const pubQ = (q) => ({ id: q.id, body: q.body, reply: q.reply, status: q.status, created_at: q.created_at, replied_at: q.replied_at });
    const pubW = (w) => ({
      id: w.id, value_id: w.value_id, student_name: w.student_name, class_name: w.class_name, title: w.title,
      description: w.description, file_path: w.file_path, file_name: w.file_name, file_url: w.file_data || null,
      status: w.status, created_at: w.created_at, reviewed_at: w.reviewed_at
    });
    const byNewest = (a, b) => b.created_at.localeCompare(a.created_at);
    const delay = () => new Promise(r => setTimeout(r, 250));
    async function requireCounselor() { if (!(await api.isCounselor())) throw new Error(t("err.forbidden")); }

    const api = {
      mode: "demo",
      demoCounselor: DEMO_COUNSELOR,
      // ---------- الحسابات ----------
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

      // ---------- الأسئلة السرية ----------
      async myQuestions() {
        const s = getSession(); if (!s) return [];
        return load().questions.filter(q => q.user_id === s.id).map(pubQ).sort(byNewest);
      },
      async askQuestion(body) {
        await delay();
        const txt = validateBody(body);
        const s = getSession(); if (!s) throw new Error(t("err.loginFirst"));
        const db = load();
        db.questions.push({ id: db.nextId++, user_id: s.id, body: txt, reply: null, status: "new", created_at: new Date().toISOString(), replied_at: null });
        save(db);
      },
      async allQuestions() {
        await requireCounselor();
        // نفس الأعمدة اللي تشوفها المرشدة في Supabase: بدون user_id
        return load().questions.map(pubQ).sort(byNewest);
      },
      async reply(id, text) {
        await delay();
        const txt = validateReply(text);
        const db = load();
        const q = db.questions.find(x => x.id === id);
        if (!q) throw new Error(t("err.notFound"));
        q.reply = txt; q.status = "answered"; q.replied_at = new Date().toISOString();
        save(db);
      },

      // ---------- منصة القيم: للطالبات ----------
      async listValues() {
        return load().values.slice().sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
      },
      async listApprovedWorks() {
        return load().works.filter(w => w.status === "approved").map(pubW).sort(byNewest);
      },
      async submitWork(work) {
        await delay();
        const w = validateWork(work);
        if (w.file && w.file.size > DEMO_MAX_FILE) throw new Error(t("err.v.demoFile"));
        const db = load();
        if (!db.values.some(v => v.id === w.value_id)) throw new Error(t("err.v.value"));
        const file_data = w.file ? await readAsDataUrl(w.file) : null;
        db.works.push({
          id: db.nextWorkId++, value_id: w.value_id, student_name: w.student_name, class_name: w.class_name,
          title: w.title, description: w.description, file_path: w.file ? newFilePath(w.file) : null,
          file_name: w.file_name, file_data, status: "pending", created_at: new Date().toISOString(), reviewed_at: null
        });
        save(db);
      },

      // ---------- منصة القيم: للمرشدة ----------
      async adminListValues() { await requireCounselor(); return this.listValues(); },
      async saveValue(value) {
        await delay(); await requireCounselor();
        const v = validateValue(value);
        const db = load();
        if (value.id) {
          const cur = db.values.find(x => x.id === value.id);
          if (!cur) throw new Error(t("err.notFound"));
          Object.assign(cur, v);
        } else {
          db.values.push({ id: db.nextValueId++, sort_order: 0, created_at: new Date().toISOString(), ...v });
        }
        save(db);
      },
      async deleteValue(id) {
        await delay(); await requireCounselor();
        const db = load();
        db.values = db.values.filter(v => v.id !== id);
        db.works = db.works.filter(w => w.value_id !== id);
        save(db);
      },
      async adminListWorks() { await requireCounselor(); return load().works.map(pubW).sort(byNewest); },
      async reviewWork(id, status) {
        await delay(); await requireCounselor();
        const db = load();
        const w = db.works.find(x => x.id === id);
        if (!w) throw new Error(t("err.notFound"));
        w.status = status; w.reviewed_at = status === "pending" ? null : new Date().toISOString();
        save(db);
      },
      async deleteWork(id) {
        await delay(); await requireCounselor();
        const db = load();
        db.works = db.works.filter(w => w.id !== id);
        save(db);
      },
      resetDemo() { local.del(KEY); session.del(SESSION); }
    };
    return api;
  }

  window.Api = DEMO ? makeDemoApi() : makeSupabaseApi();
  window.Api.limits = { maxFile: MAX_FILE, fileTypes: Object.keys(FILE_TYPES), colors: COLORS };

  window.escapeHtml = function (s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };
})();
