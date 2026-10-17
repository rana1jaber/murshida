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
      "nav.home": "الرئيسية", "nav.services": "الخدمات", "nav.how": "كيف يعمل الموقع؟", "nav.faq": "الأسئلة الشائعة",
      "btn.login": "تسجيل الدخول", "btn.signup": "إنشاء حساب", "btn.my": "أسئلتي", "btn.logout": "تسجيل الخروج", "btn.refresh": "تحديث",
      "toggle.lang": "English", "toggle.langLabel": "Switch to English",
      "toggle.toDark": "الوضع الداكن", "toggle.toLight": "الوضع الفاتح",
      "demo.bar": "وضع تجريبي: تُحفظ البيانات في متصفحكِ فقط. اربطي Supabase من ملف <code>config.js</code> قبل الاستخدام الفعلي.",

      "hero.t1": "لأنكِ تستحقين", "hero.t2": "من يسمعكِ",
      "hero.lead": "اكتبي سؤالكِ لمرشدة المدرسة، وستردّ عليكِ بنفسها، دون اسم أو بريد إلكتروني أو رقم جوال.",
      "hero.cta": "اكتبي سؤالكِ بسرية", "hero.hand": "هل تحتاجين من يسمعكِ؟", "hero.trust": "سرّي وآمن، وخصوصيتكِ أولويتنا",
      "hero.alt": "مكتب دراسة هادئ عليه حاسوب محمول ودفتر ملاحظات وكوب قهوة",

      "svc.head": "كيف أستطيع مساعدتكِ؟", "svc.hand": "كل خطوة تقرّبكِ من حلمكِ",
      "svc.1t": "سرية تامة", "svc.1d": "لا اسم ولا رقم، ولا تعرف المرشدة نفسها من كتبت السؤال.",
      "svc.2t": "إرشاد في القرارات", "svc.2d": "نتأمل الخيارات معًا، لتكوني واثقة من قراركِ.",
      "svc.3t": "تخطيط دراسي ومهني", "svc.3d": "مساعدة في اختيار المسار، والاستعداد للمرحلة الجامعية.",
      "svc.4t": "دعم نفسي ومعنوي", "svc.4d": "لستِ وحدكِ، فهناك دائمًا من يسمعكِ ويدعمكِ.",

      "how.head": "كيف يعمل الموقع؟", "how.hand": "ثلاث خطوات فقط",
      "how.1t": "أنشئي حسابًا باسم مستعار", "how.1d": "اختاري اسم مستخدم لا يدل عليكِ وكلمة مرور، ولا نطلب بريدًا إلكترونيًا أو رقم جوال.",
      "how.2t": "اكتبي سؤالكِ", "how.2d": "اكتبي ما يشغل بالكِ بحرية، فسؤالكِ يصل إلى المرشدة دون أي معلومة عنكِ.",
      "how.3t": "تابعي رد المرشدة", "how.3d": "ادخلي بالحساب نفسه في أي وقت، وستجدين أسئلتكِ والردود عليها.",

      "who.title": "من يمكنها الاستفادة؟", "who.desc": "جميع طالبات المرحلة الثانوية في المدرسة.",
      "who.quote": "«أنتِ أقوى مما تظنين،<br>وهنا دائمًا من يؤمن بكِ» ♡",
      "who.note": "ليست مجرد استشارة..<br>بل رحلة دعم ♡",

      "faq.head": "الأسئلة الشائعة",
      "faq.q1": "هل تعرف المرشدة هويتي؟",
      "faq.a1": "لا. ترى المرشدة نص السؤال وتاريخه فقط، ولا يظهر لها اسم المستخدم الخاص بكِ أبدًا، ولا نطلب منكِ اسمكِ أو بريدكِ الإلكتروني أو رقم جوالكِ.",
      "faq.q2": "نسيتُ اسم المستخدم أو كلمة المرور، فماذا أفعل؟",
      "faq.a2": "للأسف لا توجد أي طريقة لاسترجاع الحساب، لأننا لا نعرف صاحبته، وهذا ما يضمن سريتكِ. يمكنكِ إنشاء حساب جديد وكتابة سؤالكِ من جديد.",
      "faq.q3": "متى يصلني الرد؟",
      "faq.a3": "ترد المرشدة خلال أيام الدوام، وغالبًا خلال يومين. ادخلي إلى حسابكِ وتابعي صفحة «أسئلتي».",
      "faq.q4": "هل يمكنني استخدام أجهزة المدرسة؟",
      "faq.a4": "نعم، وينتهي تسجيل الدخول تلقائيًا عند إغلاق الصفحة. لكن الأفضل أن تستخدمي جهازكِ الشخصي، ولا تنسي الضغط على «تسجيل الخروج» إذا كان الجهاز مشتركًا.",
      "faq.q5": "وماذا لو كان الأمر عاجلًا؟",
      "faq.a5": "الموقع ليس مخصصًا للحالات العاجلة. إذا شعرتِ بخطر أو كان الأمر لا يحتمل الانتظار، فتوجّهي إلى المرشدة مباشرة في مكتبها، أو إلى أي معلمة تثقين بها.",

      "urgent.title": "إذا كان الأمر عاجلًا أو شعرتِ بخطر",
      "urgent.home": "توجّهي إلى المرشدة مباشرة في مكتبها، ولا تنتظري الرد هنا.",
      "urgent.ask": "توجّهي إلى المرشدة مباشرة في مكتبها، فهي لا تستطيع التواصل معكِ من هنا لأنها لا تعرف هويتكِ.",

      "signup.title": "إنشاء حساب سري", "signup.sub": "دون بريد إلكتروني أو رقم جوال. اختاري اسمًا لا يدل عليكِ.",
      "signup.user": "اسم المستخدم",
      "signup.userHint": "⚠︎ لا تستخدمي اسمكِ الحقيقي. استخدمي حروفًا إنجليزية صغيرة أو أرقامًا أو _ (من 3 إلى 20 خانة).",
      "signup.pass": "كلمة المرور", "signup.passHint": "8 خانات على الأقل.", "signup.pass2": "تأكيد كلمة المرور",
      "warn.title": "تنبيه مهم",
      "warn.body": "حفاظًا على سريتكِ، لا نطلب منكِ أي بريد إلكتروني أو رقم جوال أو اسم حقيقي. لذلك <b>في حال نسيتِ اسم المستخدم أو كلمة المرور، لا توجد أي طريقة لاسترجاع حسابكِ أو أسئلتكِ.</b> احفظيهما في مكان آمن لا يطّلع عليه غيركِ.",
      "signup.agree": "فهمتُ ذلك، وسأحفظ بياناتي في مكان آمن",
      "signup.btn": "إنشاء الحساب", "signup.busy": "جارٍ إنشاء الحساب…",
      "signup.have": "لديكِ حساب؟", "signup.loginLink": "سجّلي الدخول",

      "welcome.title": "احفظي بياناتكِ الآن ♡",
      "welcome.sub": "هذه آخر مرة نعرضها لكِ. التقطي صورة للشاشة أو انسخيها واحفظيها في مكان آمن.",
      "welcome.user": "اسم المستخدم", "welcome.pass": "كلمة المرور",
      "welcome.show": "إظهار كلمة المرور", "welcome.hide": "إخفاء كلمة المرور", "welcome.copy": "نسخ البيانات",
      "welcome.saved": "حفظتُ اسم المستخدم وكلمة المرور", "welcome.continue": "انتقلي إلى كتابة سؤالكِ",
      "welcome.copyText": "اسم المستخدم: {u}\nكلمة المرور: {p}",

      "login.title": "تسجيل الدخول", "login.sub": "ادخلي باسم المستخدم الذي اخترتِه عند التسجيل.",
      "login.user": "اسم المستخدم", "login.pass": "كلمة المرور", "login.btn": "دخول", "login.busy": "جارٍ الدخول…",
      "login.no": "ليس لديكِ حساب؟", "login.signupLink": "أنشئي حسابًا سريًا",

      "my.title": "أسئلتي", "my.hello1": "مرحبًا", "my.hello2": "، اكتبي ما يشغل بالكِ بحرية.",
      "ask.label": "سؤالكِ للمرشدة",
      "ask.ph": "اكتبي سؤالكِ هنا… ولا تذكري اسمكِ أو أي شيء يدل عليكِ إن أردتِ أن تبقي مجهولة.",
      "ask.hand": "خذي وقتكِ ♡", "ask.btn": "إرسال السؤال", "ask.busy": "جارٍ الإرسال…",
      "my.prev": "أسئلتي السابقة",
      "my.emptyT": "لم تكتبي أي سؤال بعد", "my.emptyB": "اكتبي سؤالكِ الأول في الأعلى، وسيظهر هنا مع رد المرشدة.",
      "reply.from": "رد المرشدة",
      "status.new": "بانتظار الرد", "status.done": "تم الرد",
      "loading": "جارٍ التحميل…",

      "toast.copied": "تم النسخ. احفظيها في مكان آمن", "toast.copyFail": "تعذّر النسخ، التقطي صورة للشاشة بدلًا من ذلك",
      "toast.sent": "وصل سؤالكِ إلى المرشدة ♡", "toast.loggedOut": "تم تسجيل الخروج", "toast.replied": "تم إرسال الرد",

      "err.enterUser": "اكتبي اسم المستخدم.", "err.passMismatch": "كلمتا المرور غير متطابقتين.",
      "err.mustAgree": "يجب التأشير على مربع الموافقة قبل إنشاء الحساب.", "err.enterBoth": "اكتبي اسم المستخدم وكلمة المرور.",
      "err.username": "يتكوّن اسم المستخدم من 3 إلى 20 خانة: حروف إنجليزية صغيرة أو أرقام أو _ فقط.",
      "err.password": "يجب ألا تقل كلمة المرور عن 8 خانات.",
      "err.bodyShort": "اكتبي سؤالكِ بشكل أوضح (5 أحرف على الأقل).", "err.bodyLong": "السؤال طويل جدًا، والحد الأقصى 2000 حرف.",
      "err.taken": "اسم المستخدم محجوز، جرّبي اسمًا آخر.",
      "err.badLogin": "البيانات غير صحيحة. تأكدي من اسم المستخدم وكلمة المرور.",
      "err.badLoginC": "البيانات غير صحيحة.",
      "err.confirm": "يجب إيقاف خيار تأكيد البريد الإلكتروني من إعدادات Supabase.",
      "err.rate": "محاولات كثيرة، انتظري قليلًا ثم أعيدي المحاولة.",
      "err.network": "تعذّر الاتصال. تأكدي من اتصالكِ بالإنترنت.",
      "err.unknown": "حدث خطأ غير متوقع: {m}",
      "err.notCounselor": "هذا الحساب ليس حساب مرشدة.",
      "err.loginFirst": "سجّلي الدخول أولًا.", "err.forbidden": "غير مصرّح.",
      "err.replyEmpty": "اكتبي الرد أولًا.", "err.notFound": "لم يُعثر عليه، ربما تم حذفه.",

      "footer.tag": "مستقبلكِ أجمل ♡",
      "footer.counselor": "أ. خيرية علي",
      "yt.cta": "انتقلي إلى قناة اليوتيوب",

      "c.brandTag": "لوحة المرشدة · الأسئلة السرية من الطالبات",
      "c.demo": "وضع تجريبي: ادخلي بالبريد <code>{e}</code> وكلمة المرور <code>{p}</code>",
      "c.loginTitle": "دخول المرشدة", "c.loginSub": "هذه الصفحة خاصة بالمرشدة فقط، ولا يمكن فتحها بحسابات الطالبات.",
      "c.email": "البريد الإلكتروني",
      "c.hello": "أهلًا بكِ ♡", "c.helloSub": "تظهر الأسئلة دون أي معلومة عن صاحبتها.",
      "c.tabs": "تصفية الأسئلة", "c.tabNew": "بانتظار الرد", "c.tabDone": "تم الرد", "c.tabAll": "الكل",
      "c.anon": "طالبة مجهولة", "c.yourReply": "ردّكِ", "c.edit": "تعديل الرد", "c.write": "اكتبي ردّكِ",
      "c.cancel": "إلغاء", "c.save": "حفظ التعديل", "c.send": "إرسال الرد",
      "c.emptyNewT": "لا توجد أسئلة جديدة", "c.emptyNewB": "تم الرد على جميع الأسئلة، وستظهر الأسئلة الجديدة هنا فور كتابتها.",
      "c.empty": "لا توجد أسئلة هنا.", "c.back": "الموقع الرئيسي",

      // ---------- منصة القيم ----------
      "vt.eyebrow": "جديد",
      "vt.title": "منصة القيم",
      "vt.desc": "قيمٌ نعيشها وأثرٌ نصنعه. شاركي بعملكِ في لوحة القيم، واطّلعي على مشاركات زميلاتكِ.",
      "vt.btn": "ادخلي إلى رابط القيم"
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

      "who.title": "Who is it for?", "who.desc": "All high school students at the school.",
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
      "err.replyEmpty": "Write your reply first.", "err.notFound": "Not found. It may have been deleted.",

      "footer.tag": "Your future is bright ♡",
      "footer.counselor": "Ms. Khairiya Ali",
      "yt.cta": "Visit our YouTube channel",

      "c.brandTag": "Counselor dashboard · anonymous student questions",
      "c.demo": "Demo mode: log in with <code>{e}</code> and password <code>{p}</code>",
      "c.loginTitle": "Counselor login", "c.loginSub": "This page is for the counselor only. Student accounts can't open it.",
      "c.email": "Email",
      "c.hello": "Welcome ♡", "c.helloSub": "Questions appear with no information about who wrote them.",
      "c.tabs": "Filter questions", "c.tabNew": "Waiting", "c.tabDone": "Replied", "c.tabAll": "All",
      "c.anon": "Anonymous student", "c.yourReply": "Your reply", "c.edit": "Edit reply", "c.write": "Write your reply",
      "c.cancel": "Cancel", "c.save": "Save changes", "c.send": "Send reply",
      "c.emptyNewT": "No new questions", "c.emptyNewB": "Every question has a reply. New ones show up here as soon as students write them.",
      "c.empty": "No questions here.", "c.back": "Main site",

      // ---------- Values platform ----------
      "nav.values": "Values",
      "vt.eyebrow": "New",
      "vt.title": "Values platform",
      "vt.desc": "Values we live, impact we make. Share your work on the values board and see what other students shared.",
      "vt.btn": "Open the values link",

      "v.title": "Values platform",
      "v.hand": "Values we live… impact we make together",
      "v.lead": "Pick a value, read what it means and the behaviours that show it, then share work that shows how you lived it.",
      "v.cta": "Share your work", "v.toGallery": "Impact gallery",
      "v.stat.values": "Values", "v.stat.works": "Approved works", "v.stat.students": "Students taking part",
      "v.discover": "Explore the values", "v.discoverHand": "Tap a value to see its works",
      "v.behaviors": "Behaviours that show it",
      "v.count": "Works: {n}",
      "v.showWorks": "See works", "v.joinValue": "Share for this value",
      "v.emptyValuesT": "No values yet", "v.emptyValuesB": "The counselor will add values soon.",
      "v.gallery": "Impact gallery", "v.galleryHand": "Students' work, approved by the counselor",
      "v.filterLabel": "Filter by value", "v.filterAll": "All",
      "v.emptyGalleryT": "No works here yet", "v.emptyGalleryB": "Be the first to share ♡",
      "v.openFile": "Open file", "v.pdf": "PDF file",
      "v.form": "Share your work", "v.formSub": "Your work appears in the impact gallery after the counselor reviews it.",
      "v.notice.title": "The values platform is not anonymous",
      "v.notice.body": "Your name is shown in the school gallery. Don't share anything private here. For anonymous questions use \"My questions\".",
      "v.f.value": "Value", "v.f.valuePh": "Choose a value",
      "v.f.name": "Your name", "v.f.nameHint": "As you'd like it shown in the gallery, e.g. Sara Ahmed",
      "v.f.grade": "Grade", "v.f.gradePh": "Choose your grade",
      "v.g1": "Grade 10", "v.g2": "Grade 11", "v.g3": "Grade 12",
      "v.f.section": "Class (optional)", "v.f.sectionPh": "e.g. 3",
      "v.f.title": "Title of your work", "v.f.titlePh": "e.g. A kind words initiative",
      "v.f.desc": "Short description", "v.f.descPh": "How did you live this value? What impact did it make?",
      "v.f.file": "Attach a file (optional)",
      "v.f.fileHint": "An image or PDF, up to 5 MB. Avoid photos showing faces or personal details.",
      "v.f.drop": "Drag a file here or click to choose",
      "v.f.remove": "Remove file",
      "v.f.submit": "Send my work", "v.f.busy": "Sending…", "v.f.preparing": "Preparing the image…",
      "v.done.title": "Your work was sent ♡", "v.done.body": "It will appear in the impact gallery after the counselor reviews it.",
      "v.done.again": "Send another",

      "err.v.value": "Choose a value.", "err.v.name": "Enter your name (at least 2 letters).",
      "err.v.grade": "Choose your grade.", "err.v.title": "Enter a title for your work.",
      "err.v.descLong": "The description is too long. The limit is 1500 characters.",
      "err.v.fileSize": "The file is larger than 5 MB.",
      "err.v.fileType": "That file type isn't supported. Upload an image (JPG or PNG) or a PDF.",
      "err.v.demoFile": "In demo mode the file limit is 1.5 MB.",
      "err.v.demoFull": "Demo storage in this browser is full. Delete some works and try again.",
      "err.val.title": "Enter the value's name (2 to 80 characters).", "err.val.brief": "The description is too long. The limit is 1000 characters.",

      "c.tab.questions": "Anonymous questions", "c.tab.values": "Values", "c.tab.works": "Value works",
      "c.val.formAdd": "Add a value", "c.val.formEdit": "Edit value",
      "c.val.title": "Value name", "c.val.titlePh": "e.g. Respect",
      "c.val.brief": "Description", "c.val.briefPh": "A short description of the value for students",
      "c.val.behaviors": "Behaviours", "c.val.behaviorsHint": "One behaviour per line. Students see them under the value.",
      "c.val.behaviorsPh": "I listen without interrupting\nI choose kind words",
      "c.val.color": "Card colour",
      "c.color.lilac": "Lilac", "c.color.sky": "Blue", "c.color.mint": "Green", "c.color.peach": "Pink", "c.color.sun": "Yellow",
      "c.val.add": "Add value", "c.val.save": "Save changes", "c.val.list": "Current values",
      "c.val.edit": "Edit", "c.val.delete": "Delete",
      "c.val.confirmDel": "Deleting this value also deletes all its works. Are you sure?",
      "c.val.emptyT": "No values yet", "c.val.emptyB": "Add your first value with the form. Students will see it right away.",
      "c.yesDelete": "Yes, delete", "c.keep": "Keep",
      "c.w.pending": "Waiting for review", "c.w.approved": "Approved", "c.w.rejected": "Rejected",
      "c.w.approve": "Approve and publish", "c.w.reject": "Reject", "c.w.hide": "Hide from gallery", "c.w.delete": "Delete",
      "c.w.confirmDel": "Delete this work and its file for good?",
      "c.w.emptyPendingT": "No new works", "c.w.emptyPendingB": "New works show up here before they're published to the gallery.",
      "c.w.empty": "No works here.",
      "c.w.noValue": "Deleted value",
      "toast.valSaved": "Value saved", "toast.valDeleted": "Value deleted",
      "toast.approved": "Approved and shown in the gallery", "toast.rejected": "Rejected", "toast.hidden": "Hidden from the gallery",
      "toast.workDeleted": "Work deleted"
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
