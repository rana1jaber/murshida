// =============================================
//  اللغة (عربي / English) والوضع (فاتح / داكن)
//  - النصوص الثابتة: data-i18n (نص) و data-i18n-html (فيه وسوم)
//    و data-i18n-ph (placeholder) و data-i18n-aria (aria-label) و data-i18n-alt
//  - النصوص داخل الكود: t("key") أو t("key", {name: "..."})
// =============================================
(function () {
  const DICT = {
    ar: {
      "page.title": "أرشديني",
      "page.counselorTitle": "أرشديني للمرشدة",
      "brand.name": "أرشديني",
      "brand.tag": "Guide me · استشاراتكِ سرّية دائمًا",
      "brand.home": "أرشديني، الصفحة الرئيسية",
      "nav.label": "القائمة الرئيسية",
      "nav.home": "الرئيسية", "nav.services": "الخدمات", "nav.how": "كيف يعمل؟", "nav.faq": "الأسئلة الشائعة",
      "btn.login": "تسجيل الدخول", "btn.signup": "إنشاء حساب", "btn.my": "أسئلتي", "btn.logout": "تسجيل الخروج", "btn.refresh": "تحديث",
      "toggle.lang": "English", "toggle.langLabel": "Switch to English",
      "toggle.toDark": "الوضع الداكن", "toggle.toLight": "الوضع الفاتح",
      "demo.bar": "وضع تجريبي: البيانات محفوظة في متصفحك فقط. اربطي Supabase من ملف <code>config.js</code> قبل الاستخدام الحقيقي.",

      "hero.t1": "لأنكِ تستحقين", "hero.t2": "من يسمعكِ",
      "hero.lead": "اكتبي سؤالكِ لمرشدة المدرسة، وهي ترد عليكِ بنفسها. بدون اسم، وبدون إيميل، وبدون رقم جوال.",
      "hero.cta": "اكتبي سؤالكِ بسرية", "hero.hand": "محتاجة أحد يسمعكِ؟", "hero.trust": "سرّي، آمن، وخصوصيتكِ أولوية",
      "hero.alt": "مكتب دراسة هادئ عليه لابتوب ودفتر ملاحظات وكوب قهوة",

      "svc.head": "كيف أقدر أساعدكِ؟", "svc.hand": "كل خطوة تقرّبكِ من حلمكِ",
      "svc.1t": "سرية تامة", "svc.1d": "لا اسم ولا رقم. حتى المرشدة ما تعرف مين كتبت السؤال.",
      "svc.2t": "إرشاد في القرارات", "svc.2d": "نتأمل الخيارات معًا، وتكونين واثقة من قراركِ.",
      "svc.3t": "تخطيط دراسي ومهني", "svc.3d": "مساعدة في اختيار المسار، والاستعداد للمرحلة الجامعية.",
      "svc.4t": "دعم نفسي ومعنوي", "svc.4d": "لأنكِ لستِ وحدكِ. دائمًا فيه من يسمعكِ ويدعمكِ.",

      "how.head": "كيف يعمل الموقع؟", "how.hand": "ثلاث خطوات بس",
      "how.1t": "أنشئي حسابًا باسم مستعار", "how.1d": "اختاري اسم مستخدم لا يدل عليكِ وكلمة مرور. لا نطلب إيميل ولا رقم جوال.",
      "how.2t": "اكتبي سؤالكِ", "how.2d": "اكتبي اللي في بالكِ بحرية. السؤال يوصل للمرشدة بدون أي معلومة عنكِ.",
      "how.3t": "تابعي رد المرشدة", "how.3d": "ادخلي بنفس الحساب في أي وقت، وتلقين كل أسئلتكِ والردود عليها.",

      "who.title": "من تقدر تستفيد؟", "who.desc": " جميع طالبات المرحلة الثانوية في المدرسة.",
      "who.quote": "«أنتِ أقوى مما تظنين،<br>وهنا دائمًا من يؤمن بكِ» ♡",
      "who.note": "مو بس استشارة..<br>بل رحلة دعم ♡",

      "faq.head": "الأسئلة الشائعة",
      "faq.q1": "هل تعرف المرشدة مين أنا؟",
      "faq.a1": "لا. المرشدة تشوف نص السؤال وتاريخه فقط. اسم المستخدم حقكِ ما يظهر لها أبدًا، ولا نطلب اسمكِ أو إيميلكِ أو رقمكِ.",
      "faq.q2": "نسيت اسم المستخدم أو كلمة المرور، وش أسوي؟",
      "faq.a2": "للأسف ما فيه أي طريقة للاسترجاع، لأننا ما نعرف مين صاحبة الحساب. هذا هو سبب السرية. تقدرين تسوين حسابًا جديدًا وتكتبين سؤالكِ من جديد.",
      "faq.q3": "متى يوصلني الرد؟",
      "faq.a3": "المرشدة ترد خلال أيام الدوام، وغالبًا خلال يومين. ادخلي على حسابكِ وشوفي صفحة \"أسئلتي\".",
      "faq.q4": "أقدر أستخدم أجهزة المدرسة؟",
      "faq.a4": "تقدرين، والدخول ينتهي تلقائيًا لما تقفلين الصفحة. بس الأفضل تستخدمين جهازكِ الشخصي، ولا تنسين تضغطين \"تسجيل الخروج\" إذا كان الجهاز مشترك.",
      "faq.q5": "وإذا كان الموضوع عاجل؟",
      "faq.a5": "الموقع مو للحالات العاجلة. إذا تحسين بخطر أو الأمر ما يتحمل الانتظار، توجّهي للمرشدة مباشرة في مكتبها، أو لأي معلمة تثقين فيها.",

      "urgent.title": "إذا كان الأمر عاجلًا أو تشعرين بخطر",
      "urgent.home": "توجّهي للمرشدة مباشرة في مكتبها، ولا تنتظرين الرد هنا.",
      "urgent.ask": "توجّهي للمرشدة مباشرة في مكتبها. المرشدة ما تقدر توصل لكِ من هنا لأنها ما تعرف مين أنتِ.",

      "signup.title": "إنشاء حساب سري", "signup.sub": "بدون إيميل وبدون رقم جوال. اختاري اسمًا لا يدل عليكِ.",
      "signup.user": "اسم المستخدم",
      "signup.userHint": "⚠︎ لا تستخدمي اسمكِ الحقيقي. حروف إنجليزية صغيرة أو أرقام أو _ (من 3 إلى 20).",
      "signup.pass": "كلمة المرور", "signup.passHint": "8 خانات على الأقل.", "signup.pass2": "تأكيد كلمة المرور",
      "warn.title": "تنبيه مهم",
      "warn.body": "حفاظًا على سريتكِ، لا نطلب منكِ أي إيميل أو رقم جوال أو اسم حقيقي. لذلك <b>في حال نسيتِ اسم المستخدم أو كلمة المرور، لا توجد أي طريقة لاسترجاع حسابكِ أو أسئلتكِ.</b> احفظيهما في مكان آمن لا يطّلع عليه غيركِ.",
      "signup.agree": "فهمت، وسأحفظ بياناتي في مكان آمن",
      "signup.btn": "إنشاء الحساب", "signup.busy": "جاري الإنشاء…",
      "signup.have": "عندكِ حساب؟", "signup.loginLink": "سجلي الدخول",

      "welcome.title": "احفظي بياناتكِ الآن ♡",
      "welcome.sub": "هذه آخر مرة نعرضها لكِ. صوّري الشاشة أو انسخيها واحفظيها في مكان آمن.",
      "welcome.user": "اسم المستخدم", "welcome.pass": "كلمة المرور",
      "welcome.show": "إظهار كلمة المرور", "welcome.hide": "إخفاء كلمة المرور", "welcome.copy": "نسخ البيانات",
      "welcome.saved": "حفظت اسم المستخدم وكلمة المرور", "welcome.continue": "انتقلي لكتابة سؤالكِ",
      "welcome.copyText": "اسم المستخدم: {u}\nكلمة المرور: {p}",

      "login.title": "تسجيل الدخول", "login.sub": "ادخلي باسم المستخدم اللي اخترتيه وقت التسجيل.",
      "login.user": "اسم المستخدم", "login.pass": "كلمة المرور", "login.btn": "دخول", "login.busy": "جاري الدخول…",
      "login.no": "ما عندكِ حساب؟", "login.signupLink": "أنشئي حسابًا سريًا",

      "my.title": "أسئلتي", "my.hello1": "مرحبًا", "my.hello2": "، اكتبي اللي في بالكِ بحرية.",
      "ask.label": "سؤالكِ للمرشدة",
      "ask.ph": "اكتبي سؤالكِ هنا… ولا تكتبين اسمكِ أو أي شي يدل عليكِ إذا تبغين تبقين مجهولة.",
      "ask.hand": "خذي وقتكِ ♡", "ask.btn": "إرسال السؤال", "ask.busy": "جاري الإرسال…",
      "my.prev": "أسئلتي السابقة",
      "my.emptyT": "ما كتبتِ أي سؤال للحين", "my.emptyB": "اكتبي سؤالكِ الأول من الأعلى، وبيظهر هنا مع رد المرشدة.",
      "reply.from": "رد المرشدة",
      "status.new": "بانتظار الرد", "status.done": "تم الرد",
      "loading": "جاري التحميل…",

      "toast.copied": "تم النسخ. احفظيها في مكان آمن", "toast.copyFail": "ما قدرت أنسخ، صوّري الشاشة بدلًا من ذلك",
      "toast.sent": "وصل سؤالكِ للمرشدة ♡", "toast.loggedOut": "تم تسجيل الخروج", "toast.replied": "تم إرسال الرد",

      "err.enterUser": "اكتبي اسم المستخدم.", "err.passMismatch": "كلمتا المرور غير متطابقتين.",
      "err.mustAgree": "لازم تأشرين على مربع الموافقة قبل إنشاء الحساب.", "err.enterBoth": "اكتبي اسم المستخدم وكلمة المرور.",
      "err.username": "اسم المستخدم يكون من 3 إلى 20 خانة: حروف إنجليزية صغيرة أو أرقام أو _ فقط.",
      "err.password": "كلمة المرور لازم تكون 8 خانات على الأقل.",
      "err.bodyShort": "اكتبي سؤالكِ بشكل أوضح (5 أحرف على الأقل).", "err.bodyLong": "السؤال طويل جدًا، الحد 2000 حرف.",
      "err.taken": "اسم المستخدم محجوز، جربي اسمًا آخر.",
      "err.badLogin": "البيانات غير صحيحة. تأكدي من اسم المستخدم وكلمة المرور.",
      "err.badLoginC": "البيانات غير صحيحة.",
      "err.confirm": "لازم تطفين خيار تأكيد الإيميل من إعدادات Supabase.",
      "err.rate": "محاولات كثيرة، انتظري قليلًا ثم جربي مرة ثانية.",
      "err.network": "تعذر الاتصال. تأكدي من الإنترنت.",
      "err.unknown": "صار خطأ غير متوقع: {m}",
      "err.notCounselor": "هذا الحساب ليس حساب مرشدة.",
      "err.loginFirst": "سجلي الدخول أولًا.", "err.forbidden": "غير مصرح.",
      "err.replyEmpty": "اكتبي الرد أولًا.", "err.notFound": "السؤال غير موجود.",

      "footer.tag": "مستقبلكِ أجمل ♡",

      "c.brandTag": "لوحة المرشدة · الأسئلة السرية من الطالبات",
      "c.demo": "وضع تجريبي: ادخلي بـ <code>{e}</code> وكلمة المرور <code>{p}</code>",
      "c.loginTitle": "دخول المرشدة", "c.loginSub": "هذه الصفحة خاصة بالمرشدة فقط. حسابات الطالبات لا تفتحها.",
      "c.email": "البريد الإلكتروني",
      "c.hello": "أهلًا بكِ ♡", "c.helloSub": "الأسئلة تظهر بدون أي معلومة عن صاحبتها.",
      "c.tabs": "تصفية الأسئلة", "c.tabNew": "بانتظار الرد", "c.tabDone": "تم الرد", "c.tabAll": "الكل",
      "c.anon": "طالبة مجهولة", "c.yourReply": "ردكِ", "c.edit": "تعديل الرد", "c.write": "اكتبي ردكِ",
      "c.cancel": "إلغاء", "c.save": "حفظ التعديل", "c.send": "إرسال الرد",
      "c.emptyNewT": "ما فيه أسئلة جديدة", "c.emptyNewB": "كل الأسئلة تم الرد عليها. الأسئلة الجديدة تظهر هنا أول ما تكتبها الطالبات.",
      "c.empty": "ما فيه أسئلة هنا.", "c.back": "الموقع الرئيسي"
    },

    en: {
      "page.title": "Guide me",
      "page.counselorTitle": "Guide me for counselors",
      "brand.name": "Guide me",
      "brand.tag": "أرشديني · Always confidential",
      "brand.home": "Guide me, home page",
      "nav.label": "Main menu",
      "nav.home": "Home", "nav.services": "Services", "nav.how": "How it works", "nav.faq": "FAQ",
      "btn.login": "Log in", "btn.signup": "Sign up", "btn.my": "My questions", "btn.logout": "Log out", "btn.refresh": "Refresh",
      "toggle.lang": "عربي", "toggle.langLabel": "التبديل إلى العربية",
      "toggle.toDark": "Dark mode", "toggle.toLight": "Light mode",
      "demo.bar": "Demo mode: data is saved in your browser only. Connect Supabase in <code>config.js</code> before real use.",

      "hero.t1": "Because you deserve", "hero.t2": "someone who listens",
      "hero.lead": "Write your question to the school counselor and she will reply to you herself. No name, no email, no phone number.",
      "hero.cta": "Ask privately", "hero.hand": "Need someone to listen?", "hero.trust": "Private, safe, and your privacy comes first",
      "hero.alt": "A calm study desk with a laptop, a notebook and an iced coffee",

      "svc.head": "How can I help you?", "svc.hand": "Every step brings you closer to your dream",
      "svc.1t": "Fully confidential", "svc.1d": "No name, no number. Even the counselor can't tell who asked.",
      "svc.2t": "Help with decisions", "svc.2d": "We look at your options together, so you feel sure of your choice.",
      "svc.3t": "Study and career planning", "svc.3d": "Help choosing your track and getting ready for university.",
      "svc.4t": "Emotional support", "svc.4d": "You're not alone. There's always someone to listen and support you.",

      "how.head": "How it works", "how.hand": "Just three steps",
      "how.1t": "Create an account with a nickname", "how.1d": "Pick a username that doesn't reveal who you are, and a password. No email or phone needed.",
      "how.2t": "Write your question", "how.2d": "Write freely. Your question reaches the counselor with no information about you.",
      "how.3t": "Read the counselor's reply", "how.3d": "Log in with the same account any time to see all your questions and replies.",

      "who.title": "Who is it for?", "who.desc": " All high school students at the school.",
      "who.quote": "“You are stronger than you think,<br>and someone here always believes in you” ♡",
      "who.note": "Not just advice..<br>a journey of support ♡",

      "faq.head": "Frequently asked questions",
      "faq.q1": "Does the counselor know who I am?",
      "faq.a1": "No. The counselor only sees the question and its date. Your username is never shown to her, and we never ask for your name, email or number.",
      "faq.q2": "I forgot my username or password. What can I do?",
      "faq.a2": "Unfortunately there's no way to recover it, because we don't know who owns the account. That's what keeps it private. You can create a new account and ask again.",
      "faq.q3": "When will I get a reply?",
      "faq.a3": "The counselor replies on school days, usually within two days. Log in and check \"My questions\".",
      "faq.q4": "Can I use school computers?",
      "faq.a4": "Yes, and you're logged out automatically when you close the page. A personal device is better, and remember to press \"Log out\" on a shared one.",
      "faq.q5": "What if it's urgent?",
      "faq.a5": "This site isn't for emergencies. If you feel unsafe or it can't wait, go to the counselor's office directly, or to any teacher you trust.",

      "urgent.title": "If it's urgent or you feel unsafe",
      "urgent.home": "Go to the counselor's office directly. Don't wait for a reply here.",
      "urgent.ask": "Go to the counselor's office directly. She can't reach you from here because she doesn't know who you are.",

      "signup.title": "Create a private account", "signup.sub": "No email, no phone number. Pick a name that doesn't reveal who you are.",
      "signup.user": "Username",
      "signup.userHint": "⚠︎ Don't use your real name. Lowercase English letters, numbers or _ (3 to 20).",
      "signup.pass": "Password", "signup.passHint": "At least 8 characters.", "signup.pass2": "Confirm password",
      "warn.title": "Important",
      "warn.body": "To keep you anonymous, we don't ask for an email, phone number or real name. So <b>if you forget your username or password, there is no way to recover your account or your questions.</b> Keep them somewhere safe that only you can see.",
      "signup.agree": "I understand, and I'll keep my details somewhere safe",
      "signup.btn": "Create account", "signup.busy": "Creating…",
      "signup.have": "Already have an account?", "signup.loginLink": "Log in",

      "welcome.title": "Save your details now ♡",
      "welcome.sub": "This is the only time we show them. Take a screenshot or copy them somewhere safe.",
      "welcome.user": "Username", "welcome.pass": "Password",
      "welcome.show": "Show password", "welcome.hide": "Hide password", "welcome.copy": "Copy details",
      "welcome.saved": "I saved my username and password", "welcome.continue": "Write your question",
      "welcome.copyText": "Username: {u}\nPassword: {p}",

      "login.title": "Log in", "login.sub": "Use the username you chose when you signed up.",
      "login.user": "Username", "login.pass": "Password", "login.btn": "Log in", "login.busy": "Logging in…",
      "login.no": "No account yet?", "login.signupLink": "Create a private account",

      "my.title": "My questions", "my.hello1": "Hi", "my.hello2": ", write whatever is on your mind.",
      "ask.label": "Your question for the counselor",
      "ask.ph": "Write your question here… Leave out your name or anything that identifies you if you want to stay anonymous.",
      "ask.hand": "Take your time ♡", "ask.btn": "Send question", "ask.busy": "Sending…",
      "my.prev": "My past questions",
      "my.emptyT": "You haven't asked anything yet", "my.emptyB": "Write your first question above. It will show up here with the counselor's reply.",
      "reply.from": "Counselor's reply",
      "status.new": "Waiting for reply", "status.done": "Replied",
      "loading": "Loading…",

      "toast.copied": "Copied. Keep it somewhere safe", "toast.copyFail": "Couldn't copy. Take a screenshot instead",
      "toast.sent": "Your question reached the counselor ♡", "toast.loggedOut": "Logged out", "toast.replied": "Reply sent",

      "err.enterUser": "Enter a username.", "err.passMismatch": "The passwords don't match.",
      "err.mustAgree": "Tick the box to confirm before creating your account.", "err.enterBoth": "Enter your username and password.",
      "err.username": "Usernames are 3 to 20 characters: lowercase English letters, numbers or _ only.",
      "err.password": "Your password needs at least 8 characters.",
      "err.bodyShort": "Write your question a bit more clearly (at least 5 characters).", "err.bodyLong": "Your question is too long. The limit is 2000 characters.",
      "err.taken": "That username is taken. Try another one.",
      "err.badLogin": "Those details aren't right. Check your username and password.",
      "err.badLoginC": "Those details aren't right.",
      "err.confirm": "Turn off email confirmation in your Supabase settings.",
      "err.rate": "Too many attempts. Wait a moment and try again.",
      "err.network": "Couldn't connect. Check your internet.",
      "err.unknown": "Something went wrong: {m}",
      "err.notCounselor": "This account isn't a counselor account.",
      "err.loginFirst": "Log in first.", "err.forbidden": "Not allowed.",
      "err.replyEmpty": "Write your reply first.", "err.notFound": "Question not found.",

      "footer.tag": "Your future is bright ♡",

      "c.brandTag": "Counselor dashboard · anonymous student questions",
      "c.demo": "Demo mode: log in with <code>{e}</code> and password <code>{p}</code>",
      "c.loginTitle": "Counselor login", "c.loginSub": "This page is for the counselor only. Student accounts can't open it.",
      "c.email": "Email",
      "c.hello": "Welcome ♡", "c.helloSub": "Questions appear with no information about who wrote them.",
      "c.tabs": "Filter questions", "c.tabNew": "Waiting", "c.tabDone": "Replied", "c.tabAll": "All",
      "c.anon": "Anonymous student", "c.yourReply": "Your reply", "c.edit": "Edit reply", "c.write": "Write your reply",
      "c.cancel": "Cancel", "c.save": "Save changes", "c.send": "Send reply",
      "c.emptyNewT": "No new questions", "c.emptyNewB": "Every question has a reply. New ones show up here as soon as students write them.",
      "c.empty": "No questions here.", "c.back": "Main site"
    }
  };

  // ---------- تخزين آمن ----------
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  const root = document.documentElement;
  let lang = get("guideme_lang") === "en" ? "en" : "ar";
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";

  window.t = function (key, vars) {
    let s = (DICT[lang] && DICT[lang][key]) ?? DICT.ar[key] ?? key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  };
  window.getLang = () => lang;

  function applyLang() {
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-html]").forEach(el => (el.innerHTML = t(el.dataset.i18nHtml)));
    document.querySelectorAll("[data-i18n-ph]").forEach(el => el.setAttribute("placeholder", t(el.dataset.i18nPh)));
    document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelectorAll("[data-i18n-alt]").forEach(el => el.setAttribute("alt", t(el.dataset.i18nAlt)));
    const titleKey = document.body && document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    const btn = document.getElementById("langToggle");
    if (btn) { btn.textContent = t("toggle.lang"); btn.setAttribute("aria-label", t("toggle.langLabel")); btn.lang = lang === "ar" ? "en" : "ar"; }
    updateThemeButton();
  }

  window.setLang = function (l) {
    lang = l === "en" ? "en" : "ar";
    set("guideme_lang", lang);
    applyLang();
    window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  };

  // ---------- الوضع الفاتح / الداكن ----------
  const saved = get("guideme_theme");
  if (saved === "dark" || saved === "light") root.dataset.theme = saved;

  function effectiveTheme() {
    if (root.dataset.theme === "dark" || root.dataset.theme === "light") return root.dataset.theme;
    try { return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; } catch (e) { return "light"; }
  }
  function updateThemeButton() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const dark = effectiveTheme() === "dark";
    const label = dark ? t("toggle.toLight") : t("toggle.toDark");
    btn.setAttribute("aria-label", label);
    btn.title = label;
    btn.querySelector(".i-sun").hidden = !dark;
    btn.querySelector(".i-moon").hidden = dark;
  }
  window.toggleTheme = function () {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    set("guideme_theme", next);
    updateThemeButton();
  };
  try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateThemeButton); } catch (e) {}

  // ---------- تاريخ حسب اللغة ----------
  window.formatDate = function (iso) {
    try {
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", {
        day: "numeric", month: "long", hour: "numeric", minute: "2-digit"
      }).format(new Date(iso));
    } catch (e) { return new Date(iso).toLocaleString(); }
  };

  function boot() {
    applyLang();
    const lt = document.getElementById("langToggle");
    if (lt) lt.addEventListener("click", () => setLang(lang === "ar" ? "en" : "ar"));
    const tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", toggleTheme);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
