/* Prompt Engineer — the skill library.
   A skill is a reusable prompt ingredient: the app suggests the ones that fit
   the task the user typed, and every chosen skill becomes an extra section in
   the generated prompt.
   The six categories are the ready-made shelves of skills-library.com; every
   entry sits in the shelf that matches what it actually does.
   The names and the snippets stay bilingual AR/EN by design, exactly like the
   preset bodies and the tone descriptions.
   74 of the entries come from skills-library.com. */
window.PE_SKILLS = (function () {
  const CATS = {
  "design": {
    "n": [
      "تصميم وواجهات", "Design & UI"
    ],
    "icon": "design"
  },
  "writing": {
    "n": [
      "كتابة وتوثيق", "Writing & Docs"
    ],
    "icon": "writing"
  },
  "marketing": {
    "n": [
      "تسويق وSEO", "Marketing & SEO"
    ],
    "icon": "marketing"
  },
  "media": {
    "n": [
      "صور وفيديو", "Images & Video"
    ],
    "icon": "media"
  },
  "planning": {
    "n": [
      "تخطيط وبيانات", "Planning & Data & Analytics"
    ],
    "icon": "data"
  },
  "productivity": {
    "n": [
      "إنتاجية وسير عمل", "Productivity"
    ],
    "icon": "productivity"
  }
};
  const LIST = [
  {
    "id": "seo",
    "n": [
      "تحسين محركات البحث", "SEO optimization"
    ],
    "k": [
      "seo",
      "سيو",
      "محرك البحث",
      "محركات البحث",
      "keyword",
      "كلمة مفتاحية",
      "كلمات مفتاحية",
      "google",
      "جوجل",
      "ترتيب",
      "ranking",
      "مقال",
      "article",
      "blog",
      "مدونة",
      "زيارات",
      "traffic"
    ],
    "s": [
      "أدرج الكلمات المفتاحية الرئيسية والفرعية بشكل طبيعي، وأضف عنوانًا ووصفًا ميتا، واقترح بنية عناوين فرعية، واذكر نية البحث.",
      "Work the primary and secondary keywords in naturally, add a title and a meta description, suggest a sub-heading structure, and state the search intent."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "content",
    "n": [
      "كتابة محتوى", "Content writing"
    ],
    "k": [
      "محتوى",
      "content",
      "مقال",
      "article",
      "مدونة",
      "blog",
      "كتابة",
      "write",
      "موضوع",
      "(topic)",
      "نشر",
      "publish"
    ],
    "s": [
      "اكتب بأسلوب متدرّج: مقدمة قوية، فقرات قصيرة، نقاط بارزة، وخاتمة عملية مع دعوة واضحة لاتخاذ إجراء.",
      "Write in a gradual style: a strong opening, short paragraphs, key takeaways, and a practical ending with one clear call to action."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "social",
    "n": [
      "منشورات سوشيال ميديا", "Social media posts"
    ],
    "k": [
      "انستغرام",
      "instagram",
      "تيك توك",
      "tiktok",
      "تويتر",
      "twitter",
      "لينكدإن",
      "linkedin",
      "فيسبوك",
      "facebook",
      "سوشيال",
      "social",
      "منشور",
      "بوست",
      "post",
      "ريلز",
      "reels",
      "_threads"
    ],
    "s": [
      "جهّز نسخة لكل منصة بطول مناسب ووسوم مناسبة، واقترح خطافًا قويًا في أول سطر وكلمة استدعاء واحدة للنقر.",
      "Prepare one version per platform with the right length and hashtags, suggest a strong hook in the first line, and one call to action."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "email",
    "n": [
      "كتابة إيميل", "Email writing"
    ],
    "k": [
      "ايميل",
      "إيميل",
      "email",
      "بريد",
      "رسالة",
      "letter",
      "نشرة",
      "newsletter",
      "ترويجي",
      "اعتذار",
      "apology",
      "اشتراك"
    ],
    "s": [
      "اكتب عنوانًا واضحًا، وابدأ بالسياق والطلب، وافصل بين.action steps، واختم بخطوة تالية واحدة محددة.",
      "Write a clear subject line, open with the context and the request, separate the action steps, and close with one specific next step."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "ads",
    "n": [
      "نصوص إعلانية", "Ad copy"
    ],
    "k": [
      "اعلان",
      "إعلان",
      "ad",
      "ads",
      "banner",
      "ممول",
      "ppc",
      "حملة",
      "campaign",
      "ترويج مدفوع",
      "م"
    ],
    "s": [
      "اكتب عناوين إعلانية متدرجة، وركّز على الفائدة قبل الميزة، وأضف دعوة لاتخاذ إجراء واحدة واضحة.",
      "Write graded ad headlines, lead with the benefit before the feature, and add one clear call to action."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "product",
    "n": [
      "وصف منتج", "Product description"
    ],
    "k": [
      "منتج",
      "وصف منتج",
      "product",
      "description",
      "امازون",
      "amazon",
      "متجر",
      "ecommerce",
      "اوكازون",
      "خصائص",
      "feature"
    ],
    "s": [
      "ابدأ بخطاف يبرز القيمة، ثم اذكر الفوائد قبل المواصفات، وأضف ثلاث نقاط بيع واضحة.",
      "Open with a hook that highlights the value, then list the benefits before the specs, and add three clear selling points."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "video",
    "n": [
      "سكربت فيديو", "Video script"
    ],
    "k": [
      "فيديو",
      "video",
      "يوتيوب",
      "youtube",
      "ريلز",
      "reels",
      "تيك توك",
      "tiktok",
      "سيناريو",
      "script",
      "بودكاست",
      "podcast",
      "بث",
      "مونتاج",
      "لقطة"
    ],
    "s": [
      "اكتب سكربتًا مقسّمًا إلى مشاهد مع الوقت التقريبي لكل مشهد، واقترح الخطاف في أول خمس ثوانٍ.",
      "Write a script split into scenes with an approximate time for each, and suggest the hook in the first five seconds."
    ],
    "cat": "media",
    "src": "prompt-engineer"
  },
  {
    "id": "story",
    "n": [
      "السرد القصصي", "Storytelling"
    ],
    "k": [
      "قصة",
      "سرد",
      "story",
      "narrative",
      "حكاية",
      "رواية",
      "ملحمة",
      "فيلم",
      "movie",
      "شخصية",
      "character"
    ],
    "s": [
      "ابنِ السرد ببداية متوسطة وصراع واضح وتغيير في الشخصية، واستخدم تفاصيل حسية قصيرة.",
      "Build the narrative around a middling start, a clear conflict and a change in the character, using short sensory details."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "teach",
    "n": [
      "خطة شرح وتعليم", "Teaching plan"
    ],
    "k": [
      "شرح",
      "تعلم",
      "تدريس",
      "teacher",
      "lesson",
      "دورة",
      "course",
      "طالب",
      "مدرس",
      "تبسيط",
      "simplify",
      "مادة",
      "curriculum"
    ],
    "s": [
      "بسّط المفهوم خطوة بخطوة مع مثال واحد واضح لكل فكرة، وأضف تمرينين قصيرين للتقويم.",
      "Simplify the concept step by step with one clear example per idea, and add two short assessment exercises."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "code",
    "n": [
      "كتابة برمجية", "Coding"
    ],
    "k": [
      "كود",
      "برمجة",
      "code",
      "function",
      "دالة",
      "javascript",
      "python",
      "typescript",
      "java",
      "api",
      "خوارزمية",
      "algorithm",
      "script"
    ],
    "s": [
      "اكتب الكود بلغة واحدة محددة، واذكر 복잡ية الزمن والحدود، وأعطِ أمثلة إدخال وإخراج.",
      "Write the code in one specified language, state the time complexity and the limits, and give input and output examples."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "review",
    "n": [
      "مراجعة كود", "Code review"
    ],
    "k": [
      "مراجعة",
      "review",
      "كود",
      "code",
      "ثغرات",
      "security",
      "أمان",
      "جودة الكود",
      "pull request"
    ],
    "s": [
      "راجع الكود من حيث الوضوح والأخطاء ومنطق التنفيذ، ورتّب الملاحظات حسب الخطورة، واقترح إصلاحًا لكل ملاحظة.",
      "Review the code for clarity, bugs and execution logic, sort the notes by severity, and suggest a fix for each one."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "debug",
    "n": [
      "تصحيح الأخطاء", "Debugging"
    ],
    "k": [
      "خطا",
      "اخطاء",
      "خطأ",
      "أخطاء",
      "bug",
      "debug",
      "crash",
      "استثناء",
      "exception",
      "لا يعمل",
      "يفشل",
      "عطل",
      "ا",
      "hsException"
    ],
    "s": [
      "حلّل السبب الجذري قبل اقتراح الإصلاح، وأعد إنتاج الخطأ بأبسط مثال، واذكر الفرضية ثم الدليل.",
      "Analyse the root cause before proposing a fix, reproduce the bug in the simplest example, and state the hypothesis then the evidence."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "test",
    "n": [
      "كتابة الاختبارات", "Writing tests"
    ],
    "k": [
      "اختبار",
      "اختبارات",
      "test",
      "tests",
      "unit",
      "integration",
      "تغطية",
      "coverage",
      "断言",
      "e2e"
    ],
    "s": [
      "اقترح حالات تغطي الحد الأدنى والحد الأقصى والحالات الحدّية، واذكر الأداة المناسبة لكل مستوى.",
      "Suggest cases that cover the minimum, the maximum and the edge values, and name the right tool for each level."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "docs",
    "n": [
      "التوثيق", "Documentation"
    ],
    "k": [
      "توثيق",
      "وثائق",
      "documentation",
      "readme",
      "دليل",
      "مرجع",
      "api docs",
      "تعليمات الاستخدام",
      "user guide"
    ],
    "s": [
      "ابدأ بهدف الصفحة وكيفية التثبيت، ثم الاستعمال خطوة بخطوة، ثم الأمثلة، واختم بجدول مرجعي.",
      "Open with the goal of the page and how to install, then the usage step by step, then the examples, and end with a reference table."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "translate",
    "n": [
      "الترجمة والتعريب", "Translation and localization"
    ],
    "k": [
      "ترجم",
      "ترجمة",
      "translate",
      "translation",
      "localization",
      "تعريب",
      "لغات",
      "linguistic",
      "idiom"
    ],
    "s": [
      "ترجم بصوت طبيعي لا حرفي، وحافظ على المصطلحات المتفق عليها، وأضف ملاحظة ثقافية عند الحاجة.",
      "Translate with a natural voice rather than literally, keep the agreed terminology, and add a cultural note when it matters."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "summary",
    "n": [
      "التلخيص", "Summarization"
    ],
    "k": [
      "تلخيص",
      "لخص",
      "summary",
      "summarize",
      "اختصر",
      "ملخص",
      "خلاصة",
      "اختصار"
    ],
    "s": [
      "لخّص في نقاط مع الحفاظ على الأرقام والأسماء والتواريخ، وابدأ بالجملة الأكثر أهمية.",
      "Summarize as bullet points while keeping every number, name and date, and start with the most important sentence."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "data",
    "n": [
      "تحليل البيانات", "Data analysis"
    ],
    "k": [
      "بيانات",
      "تحليل",
      "data",
      "analysis",
      "csv",
      "excel",
      "احصاء",
      "إحصاء",
      "مؤشرات",
      "metrics",
      "dashboard",
      "kpI",
      "kpi"
    ],
    "s": [
      "حدّد سؤال التحليل والمقاييس المطلوبة أولًا، ثم اذكر مصدر كل رقم وشكل العرض المناسب.",
      "Define the analysis question and the required metrics first, then name the source of every number and the right display shape."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "compare",
    "n": [
      "المقارنة", "Comparison"
    ],
    "k": [
      "مقارنه",
      "مقارنة",
      "compare",
      "comparison",
      "مقابل",
      "versus",
      "vs",
      "بدائل",
      "افضل",
      "best",
      "مزايا وعيوب",
      "pros and cons"
    ],
    "s": [
      "قارن الخيارات على معايير واضحة في جدول، وحاذب البنية بين الخيارات، واذكر الفائز وسببه.",
      "Compare the options on clear criteria in a table, keep the structure identical across the options, and name the winner with the reason."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "brainstorm",
    "n": [
      "العصف الذهني", "Brainstorming"
    ],
    "k": [
      "افكار",
      "أفكار",
      "عصف",
      "brainstorm",
      "ابتكار",
      "ابداع",
      "إبداع",
      "بدائل",
      "ابتكار",
      "ideation",
      "توليد افكار"
    ],
    "s": [
      "ولّد عشرة أفكار متمايزة فعلًا، واذكر لكل فكرة الجهد والتكلفة والأثر المتوقع، ثم رتّبها حسب القيمة.",
      "Generate ten genuinely different ideas, state the effort, the cost and the expected impact of each, then rank them by value."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "persuade",
    "n": [
      "الكتابة الإقناعية", "Persuasive writing"
    ],
    "k": [
      "اقناع",
      "إقناع",
      "persuade",
      "persuasive",
      "حجة",
      "argument",
      "جدلي",
      "مقنع",
      "sell"
    ],
    "s": [
      "اعرض الحجة الرئيسية في الجملة الأولى، ثم ثلاث نقاط دعم مدعومة بدليل، ثم عالج الاعتراض الأقوى.",
      "Put the main argument in the first sentence, then three evidence-backed points, then address the strongest objection."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "interview",
    "n": [
      "أسئلة المقابلات", "Interview questions"
    ],
    "k": [
      "مقابله",
      "مقابلة",
      "interview",
      "توظيف",
      "hiring",
      "cv",
      "سير ذاتيه",
      "مرشح",
      "recruitment"
    ],
    "s": [
      "اكتب أسئلة مفتوحة متدرجة من الخبرة إلى السلوك، وتجنّب الأسئلة المغلقة أو النمطية.",
      "Write open questions that move from experience to behaviour, and avoid the closed or template ones."
    ],
    "cat": "marketing",
    "src": "prompt-engineer"
  },
  {
    "id": "ux",
    "n": [
      "تجربة المستخدم", "UX research"
    ],
    "k": [
      "تجربة",
      "ux",
      "ui",
      "تصميم",
      "design",
      "مستخدم",
      "واجهة",
      "usability",
      "journey",
      "رحلة المستخدم"
    ],
    "s": [
      "ارسم رحلة المستخدم أولًا، ثم اذكر نقطة الألم في كل مرحلة، ثم قدّم توصيات قابلة للتنفيذ مرتبة.",
      "Map the user journey first, then name the pain point at every stage, then give ranked actionable recommendations."
    ],
    "cat": "design",
    "src": "prompt-engineer"
  },
  {
    "id": "slides",
    "n": [
      "عرض تقديمي", "Presentation slides"
    ],
    "k": [
      "عرض",
      "تقديمي",
      "slides",
      "powerpoint",
      "keynote",
      "شرائح",
      "ورشة",
      "presentation",
      "deck"
    ],
    "s": [
      "اقسم العرض إلى ست شرائح: المشكلة، الحل، الدليل، المنهجية، النتائج، الدعوة، برسالة واحدة في كل شريحة.",
      "Split the deck into six slides: problem, solution, proof, method, results, ask — with one message per slide."
    ],
    "cat": "design",
    "src": "prompt-engineer"
  },
  {
    "id": "risk",
    "n": [
      "تحليل المخاطر", "Risk analysis"
    ],
    "k": [
      "مخاطر",
      "risk",
      "احتمال",
      "impact",
      "mitigation",
      "تخفيف",
      "طوارئ",
      "contingency",
      "خطة بديلة"
    ],
    "s": [
      "رتّب المخاطر حسب الاحتمال والأثر، واقترح إجراء تخفيف لكل خطر مع مالك واضح وموعد استحقاق.",
      "Rank the risks by likelihood and impact, and give each one a mitigation with a clear owner and a due date."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "steps",
    "n": [
      "خطوات إجرائية", "Step-by-step procedure"
    ],
    "k": [
      "خطوات",
      "step",
      "مراحل",
      "procedure",
      "بروتوكول",
      "protocol",
      "instructions",
      "تعليمات",
      "method",
      "اجراء"
    ],
    "s": [
      "اكتب الخطوات مرقّمة مع مخرج واضح لكل خطوة، وحدّد نقاط التحقق بين كل خطوتين.",
      "Write the steps as a numbered list with a clear output for each, and mark the checkpoints between them."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "roleplay",
    "n": [
      "تمثيل دور", "Role play"
    ],
    "k": [
      "لعب دور",
      "تمثيل",
      "حوار",
      "dialogue",
      "roleplay",
      "خدمة العملاء",
      "customer support",
      "سيناريو",
      "محادثة"
    ],
    "s": [
      "اكتب حوارًا بالأدوار، وابدأ العميل بسؤال، واترك لك مساحة لكتابة الرد النهائي.",
      "Write the dialogue by roles, start the customer with a question, and leave room for you to write the final reply."
    ],
    "cat": "productivity",
    "src": "prompt-engineer"
  },
  {
    "id": "critique",
    "n": [
      "النقدconstructive", "Constructive critique"
    ],
    "k": [
      "نقد",
      "critique",
      "ملاحظات",
      "feedback",
      "تقييم",
      "evaluation",
      "تحسين النص",
      "improvement",
      "مراجعة ادبية"
    ],
    "s": [
      "اعرض النقطتين القويتين أولًا، ثم ثلاث ملاحظات محددة قابلة للتنفيذ مع مثال على كل واحدة.",
      "Lead with the two strengths, then give three specific actionable notes with an example for each."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "checklist",
    "n": [
      "قائمة تحقق", "Checklist"
    ],
    "k": [
      "قائمة",
      "checklist",
      "تحقق",
      "مراجعة نهائية",
      "final review",
      "نهائي",
      "pre-publish",
      "تسليم",
      "delivery"
    ],
    "s": [
      "حوّل المتطلبات إلى قائمة تحقق ثنائية (نعم / لا) مرتبة حسب الأولوية، وضع علامة على ما تم.",
      "Turn the requirements into a yes/no checklist sorted by priority, and mark what is already done."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "explain",
    "n": [
      "الشرح المبسّط", "Simple explanation"
    ],
    "k": [
      "اشرح",
      "explain",
      "simply",
      "مبسط",
      "بسيط",
      "مفهوم",
      "understand",
      "يشرح",
      "ل.non-expert"
    ],
    "s": [
      "اشرح بأسلوب بسيط دون مصطلحات، واستخدم تشبيهًا واحدًا من الحياة اليومية، وافترض القارئ مبتدئًا.",
      "Explain in plain language without jargon, use one everyday analogy, and assume a beginner reader."
    ],
    "cat": "writing",
    "src": "prompt-engineer"
  },
  {
    "id": "counter",
    "n": [
      "الرد على الاعتراضات", "Handling objections"
    ],
    "k": [
      "اعتراض",
      "objection",
      "شكوى",
      "complaint",
      "رد",
      "نقد",
      "دفاع",
      "counter"
    ],
    "s": [
      "اعرض الاعتراض الشائع كما ورد، ثم ردّ عليه بدليل أو رقم، ثم اعرض حلًا وسطًا قابلًا للتنفيذ.",
      "State the common objection as it is, answer it with evidence or a number, then offer a workable middle ground."
    ],
    "cat": "productivity",
    "src": "prompt-engineer"
  },
  {
    "id": "research",
    "n": [
      "البحث وتوثيق المصادر", "Research and sources"
    ],
    "k": [
      "بحث",
      "research",
      "مصادر",
      "sources",
      "مراجع",
      "references",
      "ادبيات",
      "papers",
      "دراسة سوق",
      "market research"
    ],
    "s": [
      "اقترح كلمات بحث محددة لكل فرع، وحدّد نوع المصدر الأنسب، واذكر معايير تقييم المصدر.",
      "Suggest precise search terms for each branch, name the most suitable source type, and state how to judge a source."
    ],
    "cat": "planning",
    "src": "prompt-engineer"
  },
  {
    "id": "brainstorming",
    "cat": "productivity",
    "n": [
      "العصف الذهني قبل العمل الإبداعي", "brainstorming"
    ],
    "k": [
      "brainstorming",
      "must",
      "this",
      "before",
      "creative",
      "work",
      "عصف",
      "ذهني",
      "أفكار",
      "ابتكار",
      "brainstorm"
    ],
    "s": [
      "يولّد خيارات متعددة قبل التنفيذ، ويقيّم كل خيار بالأثر والجهد طبّق ذلك على المهمة أعلاه.",
      "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "seo-audit",
    "cat": "marketing",
    "n": [
      "تدقيق SEO", "seo audit"
    ],
    "k": [
      "seo-audit",
      "the",
      "user",
      "wants",
      "audit",
      "review",
      "seo",
      "سيو",
      "تدقيق",
      "موقع",
      "كلمات",
      "مفتاحية"
    ],
    "s": [
      "يفحص الموقع ويكشف أخطاء الفهرسة والروابط والبيانات المنسّبة طبّق ذلك على المهمة أعلاه.",
      "When the user wants to audit, review, or diagnose SEO issues on their site. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "seo-geo",
    "cat": "marketing",
    "n": [
      "تحسين محركات البحث والتوليد", "seo geo"
    ],
    "k": [
      "seo-geo",
      "seo",
      "geo",
      "generative",
      "engine",
      "optimization",
      "Generative",
      "Engine",
      "OptimizationSchema"
    ],
    "s": [
      "يجهّز الموقع لمحركات البحث وللمحرّكات التوليدية مع البيانات المنسّبة طبّق ذلك على المهمة أعلاه.",
      "SEO & GEO (Generative Engine Optimization) for websites. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "social-content",
    "cat": "marketing",
    "n": [
      "محتوى وسائل التواصل", "social content"
    ],
    "k": [
      "social-content",
      "the",
      "user",
      "wants",
      "creating",
      "scheduling",
      "social",
      "محتوى",
      "سوشيال",
      "instagram",
      "linkedin",
      "tiktok",
      "twitter"
    ],
    "s": [
      "يكتب ويجدول محتوى لينكدإن وت(instagram) وتيك توك وفيسبوك طبّق ذلك على المهمة أعلاه.",
      "When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, or other platf Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "social-media-marketing",
    "cat": "marketing",
    "n": [
      "تسويق عبر السوشيال ميديا", "social media marketing"
    ],
    "k": [
      "social-media-marketing",
      "smm.",
      "سوشيال",
      "تسويق",
      "smm",
      "محتوى网络",
      "community"
    ],
    "s": [
      "خطة محتوى وتقويم نشر وإدارة مجتمع لكل منصة طبّق ذلك على المهمة أعلاه.",
      "Эксперт по SMM. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "pricing-strategy",
    "cat": "marketing",
    "n": [
      "استراتيجية التسعير", "pricing strategy"
    ],
    "k": [
      "pricing-strategy",
      "the",
      "user",
      "wants",
      "with",
      "pricing",
      "تسعير",
      "باقات",
      "monetization",
      "اشتراك"
    ],
    "s": [
      "يبني خيارات التسعير والتغليف والتحويل بناءً على القيمة طبّق ذلك على المهمة أعلاه.",
      "When the user wants help with pricing decisions, packaging, or monetization strategy. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "email-sequence",
    "cat": "marketing",
    "n": [
      "سلسلة إيميلات", "email sequence"
    ],
    "k": [
      "email-sequence",
      "the",
      "user",
      "wants",
      "optimize",
      "email",
      "سلسلة",
      "بريد",
      "campaign",
      "drip"
    ],
    "s": [
      "يبني سلسلة بريد متدرجة مع-triggerات لكل مرحلة طبّق ذلك على المهمة أعلاه.",
      "When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "email-design",
    "cat": "marketing",
    "n": [
      "تصميم الإيميل", "email design"
    ],
    "k": [
      "email-design",
      "email",
      "marketing",
      "design",
      "layout",
      "patterns",
      "تصميم",
      "بريد",
      "subject",
      "line"
    ],
    "s": [
      "تنسيقات بريد وعناوين جذابة وقواعد到达 للرسائل طبّق ذلك على المهمة أعلاه.",
      "Email marketing design with layout patterns, subject line formulas, and deliverability rules. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "cold-email",
    "cat": "marketing",
    "n": [
      "إيميل التواصل البارد", "cold email"
    ],
    "k": [
      "cold-email",
      "write",
      "b2b",
      "cold",
      "emails",
      "follow-up",
      "email",
      "outreach",
      "prospecting"
    ],
    "s": [
      "رسائل B2B موجزة تستحق الرد مع متابعات طبّق ذلك على المهمة أعلاه.",
      "Write B2B cold emails and follow-up sequences that get replies. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "content-creator",
    "cat": "marketing",
    "n": [
      "صانع المحتوى التسويقي", "content creator"
    ],
    "k": [
      "content-creator",
      "seo-optimized",
      "marketing",
      "content",
      "consistent",
      "brand",
      "محتوى",
      "تسويقي",
      "seo",
      "voice"
    ],
    "s": [
      "محتوى محسّن لمحركات البحث بصوت علامة ثابت طبّق ذلك على المهمة أعلاه.",
      "Create SEO-optimized marketing content with consistent brand voice. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "copywriting",
    "cat": "marketing",
    "n": [
      "كتابة نصوص البيع", "copywriting"
    ],
    "k": [
      "copywriting",
      "write",
      "rigorous",
      "conversion-focused",
      "marketing",
      "copy",
      "نص",
      "بيع",
      "landing",
      "page",
      "conversion"
    ],
    "s": [
      "نصوص صفحات هبوط وإيميلات تركز على التحويل دون اختلاق طبّق ذلك على المهمة أعلاه.",
      "Write rigorous, conversion-focused marketing copy for landing pages and emails. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "canvas-design",
    "cat": "design",
    "n": [
      "تصميم بصري فني", "canvas design"
    ],
    "k": [
      "canvas-design",
      "beautiful",
      "visual",
      "art",
      "png",
      "pdf",
      "تصميم",
      "canvas",
      "فن"
    ],
    "s": [
      "ملفات PNG وPDF بتصميم بصري مميز طبّق ذلك على المهمة أعلاه.",
      "Create beautiful visual art in .png and .pdf documents using design philosophy. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "algorithmic-art",
    "cat": "design",
    "n": [
      "الفن الخوارزمي", "algorithmic art"
    ],
    "k": [
      "algorithmic-art",
      "creating",
      "algorithmic",
      "art",
      "p5.js",
      "seeded",
      "فن",
      "خوارزمي",
      "p5",
      "generative"
    ],
    "s": [
      "فن مولّد برمجيًا ببذرة عشوائية قابلة للاستكشاف طبّق ذلك على المهمة أعلاه.",
      "Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "ai-image-generation",
    "cat": "media",
    "n": [
      "توليد الصور", "ai image generation"
    ],
    "k": [
      "ai-image-generation",
      "generate",
      "images",
      "flux",
      "gemini",
      "grok",
      "صورة",
      "image",
      "generation",
      "توليد",
      "prompt"
    ],
    "s": [
      "يولّد صورًا بأكثر من خمسين نموذجًا مع وصف دقيق للمشهد طبّق ذلك على المهمة أعلاه.",
      "Generate AI images with FLUX, Gemini, Grok, Seedream, Reve and 50+ models via inference.sh CLI. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "ai-video-generation",
    "cat": "media",
    "n": [
      "توليد الفيديو", "ai video generation"
    ],
    "k": [
      "ai-video-generation",
      "generate",
      "videos",
      "google",
      "veo",
      "seedance",
      "فيديو",
      "video",
      "توليد",
      "script"
    ],
    "s": [
      "ينتج فيديو من وصف نصي مع لوحة مشاهد طبّق ذلك على المهمة أعلاه.",
      "Generate AI videos with Google Veo, Seedance, Wan, Grok and 40+ models via inference.sh CLI. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "doc-coauthoring",
    "cat": "writing",
    "n": [
      "الكتابة التعاونية", "doc coauthoring"
    ],
    "k": [
      "doc-coauthoring",
      "guide",
      "users",
      "through",
      "structured",
      "workflow",
      "توثيق",
      "coauthoring",
      "مستندات",
      "كتابة"
    ],
    "s": [
      "سير عمل منظّم لكتابة المستندات والمقترحات خطوة بخطوة طبّق ذلك على المهمة أعلاه.",
      "Guide users through a structured workflow for co-authoring documentation. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "documentation-writer",
    "cat": "writing",
    "n": [
      "كاتب التوثيق", "documentation writer"
    ],
    "k": [
      "documentation-writer",
      "taxis",
      "documentation",
      "expert.",
      "توثيق",
      "technical",
      "writer"
    ],
    "s": [
      "توثيق تقني بأسلوب Diátaxis: شرح، مرجع، درس،Recipe طبّق ذلك على المهمة أعلاه.",
      "Diátaxis Documentation Expert. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "writing-clearly-and-concisely",
    "cat": "writing",
    "n": [
      "الكتابة الواضحة الموجزة", "writing clearly and concisely"
    ],
    "k": [
      "use",
      "writing",
      "prose",
      "humans",
      "read",
      "كتابة",
      "واضحة",
      "concise",
      "وضوح",
      "drafting"
    ],
    "s": [
      "نص يفهمه الإنسان من أول مرة: واضح، مباشر، بلا حشو طبّق ذلك على المهمة أعلاه.",
      "Use when writing prose humans will read—documentation, commit messages, error messages, explanations, reports, or UI text. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "data-storytelling",
    "cat": "planning",
    "n": [
      "سرد البيانات", "data storytelling"
    ],
    "k": [
      "data-storytelling",
      "transform",
      "data",
      "compelling",
      "narratives",
      "visualization",
      "بيانات",
      "storytelling",
      "سرد",
      "تحليل"
    ],
    "s": [
      "يحوّل الأرقام إلى قصة مقنعة بسياق ورسم بصري طبّق ذلك على المهمة أعلاه.",
      "Transform data into compelling narratives using visualization, context, and persuasive structure. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "postmortem-writing",
    "cat": "planning",
    "n": [
      "تحليل ما بعد الحادث", "postmortem writing"
    ],
    "k": [
      "postmortem-writing",
      "write",
      "effective",
      "blameless",
      "postmortems",
      "root",
      "postmortem",
      "حادث",
      "تحليل",
      "جذري",
      "incident"
    ],
    "s": [
      "تقرير بلا لوم يشرح السبب الجذري والخط الزمني والإجراءات طبّق ذلك على المهمة أعلاه.",
      "Write effective blameless postmortems with root cause analysis, timelines, and action items. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "incident-runbook-templates",
    "cat": "planning",
    "n": [
      "دليل الاستجابة للحوادث", "incident runbook templates"
    ],
    "k": [
      "incident-runbook-templates",
      "structured",
      "incident",
      "response",
      "runbooks",
      "step-by-step",
      "runbook",
      "حادث",
      "تشغيل"
    ],
    "s": [
      "خطوات جاهزة للتصعيد والتعافي أثناء العطل طبّق ذلك على المهمة أعلاه.",
      "Create structured incident response runbooks with step-by-step procedures, escalation paths, and recovery actions. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "product-manager-toolkit",
    "cat": "marketing",
    "n": [
      "حقيبة أدوات مدير المنتج", "product manager toolkit"
    ],
    "k": [
      "product-manager-toolkit",
      "comprehensive",
      "toolkit",
      "product",
      "managers",
      "rice",
      "manager",
      "منتج_priorities",
      "prd"
    ],
    "s": [
      "أولويات RICE ومقابلات العملاء وقوالب المتطلبات طبّق ذلك على المهمة أعلاه.",
      "Comprehensive toolkit for product managers including RICE prioritization, customer interview analysis, PRD templates, discovery frameworks, and go-to- Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "market-sizing-analysis",
    "cat": "marketing",
    "n": [
      "قياس حجم السوق", "market sizing analysis"
    ],
    "k": [
      "market-sizing-analysis",
      "skill",
      "used",
      "the",
      "user",
      "asks",
      "market",
      "sizing",
      "tam",
      "sam",
      "som",
      "سوق"
    ],
    "s": [
      "يحسب TAM وSAM وSOM مع افتراضات معلنة طبّق ذلك على المهمة أعلاه.",
      "This skill should be used when the user asks to \"calculate TAM\", \"determine SAM\", \"estimate SOM\", \"size the market\", \"calculate market opportunity\", \" Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "competitive-landscape",
    "cat": "marketing",
    "n": [
      "تحليل المنافسين", "competitive landscape"
    ],
    "k": [
      "competitive-landscape",
      "skill",
      "used",
      "the",
      "user",
      "asks",
      "منافسين",
      "competitive",
      "landscape",
      "differentiation"
    ],
    "s": [
      "خريطة المنافسين وفوارق التمايز والمواقع الفارغة طبّق ذلك على المهمة أعلاه.",
      "This skill should be used when the user asks to \"analyze competitors\", \"assess competitive landscape\", \"identify differentiation\", \"evaluate market po Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "startup-metrics-framework",
    "cat": "marketing",
    "n": [
      "مؤشرات الشركات الناشئة", "startup metrics framework"
    ],
    "k": [
      "startup-metrics-framework",
      "skill",
      "used",
      "the",
      "user",
      "asks",
      "startup",
      "metrics",
      "cac",
      "ltv",
      "saas",
      "burn"
    ],
    "s": [
      "CAC وLTV والاقتصاديات الوحدوية ومعدل الحرق طبّق ذلك على المهمة أعلاه.",
      "This skill should be used when the user asks about \"key startup metrics\", \"SaaS metrics\", \"CAC and LTV\", \"unit economics\", \"burn multiple\", \"rule of 4 Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "launch-strategy",
    "cat": "marketing",
    "n": [
      "استراتيجية الإطلاق", "launch strategy"
    ],
    "k": [
      "launch-strategy",
      "the",
      "user",
      "wants",
      "plan",
      "product",
      "launch",
      "إطلاق",
      "استراتيجية",
      "release"
    ],
    "s": [
      "خطة إطلاق وإعلان عن ميزة مع خط زمني وقنوات طبّق ذلك على المهمة أعلاه.",
      "When the user wants to plan a product launch, feature announcement, or release strategy. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "kpi-dashboard-design",
    "cat": "marketing",
    "n": [
      "تصميم لوحة المؤشرات", "kpi dashboard design"
    ],
    "k": [
      "kpi-dashboard-design",
      "design",
      "effective",
      "kpi",
      "dashboards",
      "metrics",
      "dashboard",
      "مؤشرات",
      "لوحة"
    ],
    "s": [
      "اختيار المؤشرات المناسبة ورسمها بطريقة مفهومة طبّق ذلك على المهمة أعلاه.",
      "Design effective KPI dashboards with metrics selection, visualization best practices, and real-time monitoring patterns. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "free-tool-strategy",
    "cat": "marketing",
    "n": [
      "استراتيجية الأداة المجانية", "free tool strategy"
    ],
    "k": [
      "free-tool-strategy",
      "the",
      "user",
      "wants",
      "plan",
      "evaluate",
      "free",
      "tool",
      "مجاني",
      "تسويق",
      "lead",
      "magnet"
    ],
    "s": [
      "أداة مجانية تجلب زيارات أو عملاء محتملين طبّق ذلك على المهمة أعلاه.",
      "When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or brand awareness. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "enhance-prompt",
    "cat": "productivity",
    "n": [
      "تحسين البرومبت", "enhance prompt"
    ],
    "k": [
      "enhance-prompt",
      "transforms",
      "vague",
      "ideas",
      "polished",
      "stitch-optimized",
      "prompt",
      "enhance",
      "تحسين",
      "برومبت"
    ],
    "s": [
      "يحوّل فكرة غامضة إلى برومبت دقيق加工厂 طبّق ذلك على المهمة أعلاه.",
      "Transforms vague UI ideas into polished, Stitch-optimized prompts. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "frontend-design",
    "cat": "design",
    "n": [
      "تصميم الواجهات", "frontend design"
    ],
    "k": [
      "frontend-design",
      "distinctive",
      "production-grade",
      "frontend",
      "interfaces",
      "high",
      "design",
      "واجهة",
      "ui",
      "تصميم"
    ],
    "s": [
      "واجهات إنتاجية مميزة بجودة تصميم عالية طبّق ذلك على المهمة أعلاه.",
      "Create distinctive, production-grade frontend interfaces with high design quality. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "web-design-guidelines",
    "cat": "design",
    "n": [
      "مراجعة إرشادات تصميم الويب", "web design guidelines"
    ],
    "k": [
      "web-design-guidelines",
      "review",
      "code",
      "web",
      "interface",
      "guidelines",
      "design",
      "مراجعة",
      "ui"
    ],
    "s": [
      "يفحص الواجهة مقابل إرشادات الوصول والاستخدام طبّق ذلك على المهمة أعلاه.",
      "Review UI code for Web Interface Guidelines compliance. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "ui-ux-pro-max",
    "cat": "design",
    "n": [
      "خبرة تصميم UI/UX", "ui ux pro max"
    ],
    "k": [
      "ui-ux-pro-max",
      "design",
      "intelligence.",
      "ui",
      "ux",
      "تصميم",
      "palette",
      "typography"
    ],
    "s": [
      "أساليب وألوان وخطوط ومخططات جاهزة للاختيار طبّق ذلك على المهمة أعلاه.",
      "UI/UX design intelligence. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "accessibility-compliance",
    "cat": "design",
    "n": [
      "الوصولية WCAG", "accessibility compliance"
    ],
    "k": [
      "accessibility-compliance",
      "implement",
      "wcag",
      "compliant",
      "interfaces",
      "mobile",
      "accessibility",
      "وصولية",
      "a11y"
    ],
    "s": [
      "واجهات متوافقة مع WCAG 2.2 ودعم التقنيات المساعدة طبّق ذلك على المهمة أعلاه.",
      "Implement WCAG 2.2 compliant interfaces with mobile accessibility, inclusive design patterns, and assistive technology support. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "fixing-accessibility",
    "cat": "design",
    "n": [
      "إصلاح مشاكل الوصولية", "fixing accessibility"
    ],
    "k": [
      "fixing-accessibility",
      "audit",
      "fix",
      "html",
      "accessibility",
      "issues",
      "aria",
      "keyboard",
      "a11y",
      "إصلاح"
    ],
    "s": [
      "يعالج ARIA ولوحة المفاتيح والتباين ونماذج الأخطاء طبّق ذلك على المهمة أعلاه.",
      "Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "fixing-motion-performance",
    "cat": "design",
    "n": [
      "أداء الحركات", "fixing motion performance"
    ],
    "k": [
      "fixing-motion-performance",
      "audit",
      "fix",
      "animation",
      "performance",
      "issues",
      "motion",
      "أداء"
    ],
    "s": [
      "يراجع تأثير الحركات على الأداء ويزيل الت.layout الاهتزاز طبّق ذلك على المهمة أعلاه.",
      "Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, and blur effects. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "performance-optimization",
    "cat": "design",
    "n": [
      "تحسين الأداء", "performance optimization"
    ],
    "k": [
      "performance-optimization",
      "optimize",
      "application",
      "performance",
      "speed",
      "efficiency",
      "أداء",
      "تحسين"
    ],
    "s": [
      "يسرّع التحميل ويقلّل الحجم ويحسّن قابلية التوسع طبّق ذلك على المهمة أعلاه.",
      "Optimize application performance for speed, efficiency, and scalability. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "web-performance-optimization",
    "cat": "design",
    "n": [
      "أداء الويب", "web performance optimization"
    ],
    "k": [
      "web-performance-optimization",
      "optimize",
      "website",
      "web",
      "application",
      "performance",
      "vitals",
      "caching",
      "سرعة"
    ],
    "s": [
      "Core Web Vitals والتخزين المؤقت وتحميل الأصول طبّق ذلك على المهمة أعلاه.",
      "Optimize website and web application performance including loading speed, Core Web Vitals, bundle size, caching strategies, and runtime performance Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "security-requirement-extraction",
    "cat": "planning",
    "n": [
      "استخراج المتطلبات الأمنية", "security requirement extraction"
    ],
    "k": [
      "security-requirement-extraction",
      "derive",
      "security",
      "requirements",
      "threat",
      "models",
      "متطلبات",
      "أمنية"
    ],
    "s": [
      "يحوّل نماذج التهديد إلى متطلبات قابلة للتنفيذ طبّق ذلك على المهمة أعلاه.",
      "Derive security requirements from threat models and business context. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "api-design-principles",
    "cat": "design",
    "n": [
      "مبادئ تصميم الـ API", "api design principles"
    ],
    "k": [
      "api-design-principles",
      "master",
      "rest",
      "graphql",
      "api",
      "design",
      "تصميم"
    ],
    "s": [
      "واجهات REST وGraphQL بديهية وقابلة للتوسع طبّق ذلك على المهمة أعلاه.",
      "Master REST and GraphQL API design principles to build intuitive, scalable, and maintainable APIs that delight developers. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "rest-api-design",
    "cat": "design",
    "n": [
      "تصميم REST API", "rest api design"
    ],
    "k": [
      "rest-api-design",
      "design",
      "restful",
      "apis",
      "following",
      "best",
      "rest",
      "api",
      "تصميم",
      "endpoints"
    ],
    "s": [
      "نمذجة الموارد وطرق HTTP ورموز الحالة والإصدارات طبّق ذلك على المهمة أعلاه.",
      "Design RESTful APIs following best practices for resource modeling, HTTP methods, status codes, versioning, and documentation. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "api-security-best-practices",
    "cat": "design",
    "n": [
      "أمان الـ API", "api security best practices"
    ],
    "k": [
      "api-security-best-practices",
      "implement",
      "secure",
      "api",
      "design",
      "patterns",
      "security",
      "auth",
      "rate",
      "limit",
      "أمان"
    ],
    "s": [
      "المصادقة والتفويض والتحقق من المدخلات وحدود الطلبات طبّق ذلك على المهمة أعلاه.",
      "Implement secure API design patterns including authentication, authorization, input validation, rate limiting, and protection against common API vulne Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "auth-implementation-patterns",
    "cat": "design",
    "n": [
      "أنماط المصادقة", "auth implementation patterns"
    ],
    "k": [
      "auth-implementation-patterns",
      "master",
      "authentication",
      "authorization",
      "patterns",
      "jwt",
      "auth",
      "oauth",
      "rbac",
      "مصادقة"
    ],
    "s": [
      "JWT وOAuth2 وإدارة الجلسات وأدوار الصلاحيات طبّق ذلك على المهمة أعلاه.",
      "Master authentication and authorization patterns including JWT, OAuth2, session management, and RBAC to build secure, scalable access control systems. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "database-schema-designer",
    "cat": "design",
    "n": [
      "تصميم مخطط قاعدة البيانات", "database schema designer"
    ],
    "k": [
      "database-schema-designer",
      "design",
      "robust",
      "scalable",
      "database",
      "schemas",
      "schema",
      "sql",
      "nosql",
      "تصميم"
    ],
    "s": [
      "مخطط قوي مع التطبيع والفهارس واستراتيجيات التوسع طبّق ذلك على المهمة أعلاه.",
      "Design robust, scalable database schemas for SQL and NoSQL databases. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "database-migration",
    "cat": "design",
    "n": [
      "ترحيل قواعد البيانات", "database migration"
    ],
    "k": [
      "database-migration",
      "execute",
      "database",
      "migrations",
      "across",
      "orms",
      "migration",
      "ترحيل",
      "rollback"
    ],
    "s": [
      "ترحيل بلا توقف مع تحويل البيانات وخطة تراجع طبّق ذلك على المهمة أعلاه.",
      "Execute database migrations across ORMs and platforms with zero-downtime strategies, data transformation, and rollback procedures. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "deployment-pipeline-design",
    "cat": "design",
    "n": [
      "تصميم خط النشر", "deployment pipeline design"
    ],
    "k": [
      "deployment-pipeline-design",
      "design",
      "multi-stage",
      "pipelines",
      "approval",
      "gates",
      "deployment",
      "pipeline",
      "ci",
      "cd",
      "نشر"
    ],
    "s": [
      "مسارات CI/CD متدرجة مع بوابات موافقة وفحوص أمنية طبّق ذلك على المهمة أعلاه.",
      "Design multi-stage CI/CD pipelines with approval gates, security checks, and deployment orchestration. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "devops-rollout-plan",
    "cat": "design",
    "n": [
      "خطة النشر التدريجي", "devops rollout plan"
    ],
    "k": [
      "devops-rollout-plan",
      "generate",
      "comprehensive",
      "rollout",
      "plans",
      "preflight",
      "devops",
      "plan",
      "نشر",
      "تدريجي"
    ],
    "s": [
      "فحوص مسبقة وخطوات نشر وإشارات تحقق وتراجع طبّق ذلك على المهمة أعلاه.",
      "Generate comprehensive rollout plans with preflight checks, step-by-step deployment, verification signals, rollback procedures, and communication plan Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "ci-cd-best-practices",
    "cat": "design",
    "n": [
      "ممارسات CI/CD", "ci cd best practices"
    ],
    "k": [
      "ci-cd-best-practices",
      "best",
      "practices",
      "building",
      "automated",
      "pipelines",
      "ci",
      "cd",
      "pipeline",
      "أتمتة"
    ],
    "s": [
      "خطوط آلية واستراتيجيات نشر واختبار وأساليب عمل طبّق ذلك على المهمة أعلاه.",
      "CI/CD best practices for building automated pipelines, deployment strategies, testing, and DevOps workflows across platforms Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "monitoring-expert",
    "cat": "design",
    "n": [
      "المراقبة والإنذارات", "monitoring expert"
    ],
    "k": [
      "monitoring-expert",
      "when",
      "setting",
      "monitoring",
      "systems",
      "logging",
      "alerts",
      "مراقبة",
      "dashboards"
    ],
    "s": [
      "لوحات ومقاييس وتتبع وتنبيهات مع حدود واضحة طبّق ذلك على المهمة أعلاه.",
      "Use when setting up monitoring systems, logging, metrics, tracing, or alerting. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "logging-best-practices",
    "cat": "design",
    "n": [
      "ممارسات السجلات", "logging best practices"
    ],
    "k": [
      "logging-best-practices",
      "logging",
      "best",
      "practices",
      "focused",
      "wide",
      "سجلات",
      "structured",
      "events"
    ],
    "s": [
      "سجلات موحّدة غنية تسهّل التشخيص والتحليل طبّق ذلك على المهمة أعلاه.",
      "Logging best practices focused on wide events (canonical log lines) for powerful debugging and analytics Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "ship-learn-next",
    "cat": "planning",
    "n": [
      "من التعلّم إلى التنفيذ", "ship learn next"
    ],
    "k": [
      "ship-learn-next",
      "transform",
      "learning",
      "content",
      "like",
      "youtube",
      "learn",
      "ship",
      "تنفيذ",
      "خطة",
      "tutorial"
    ],
    "s": [
      "يحوّل مقطعًا تعليميًا إلى خطة تنفيذ قابلة للإنجاز طبّق ذلك على المهمة أعلاه.",
      "Transform learning content (like YouTube transcripts, articles, tutorials) into actionable implementation plans using the Ship-Learn-Next framework. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "i18n-localization",
    "cat": "productivity",
    "n": [
      "التدويل والتعريب", "i18n localization"
    ],
    "k": [
      "i18n-localization",
      "internationalization",
      "localization",
      "patterns.",
      "i18n",
      "ترجمة",
      "rtl"
    ],
    "s": [
      "كشف النصوص الثابتة وإدارة الترجمات ودعم RTL طبّق ذلك على المهمة أعلاه.",
      "Internationalization and localization patterns. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "twitter-thread-creation",
    "cat": "marketing",
    "n": [
      "سلسلة تغريدات", "twitter thread creation"
    ],
    "k": [
      "twitter-thread-creation",
      "twitter",
      "thread",
      "writing",
      "hook",
      "tweets",
      "تغريدات",
      "سلسلة"
    ],
    "s": [
      "سلسلة X بخطاف قوي وبنية تحافظ على الانتباه طبّق ذلك على المهمة أعلاه.",
      "Twitter/X thread writing with hook tweets, thread structure, and engagement optimization. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "internal-comms-anthropic",
    "cat": "marketing",
    "n": [
      "التواصل الداخلي", "internal comms anthropic"
    ],
    "k": [
      "internal-comms-anthropic",
      "set",
      "resources",
      "write",
      "kinds",
      "internal",
      "comms",
      "تواصل",
      "داخلي",
      "status"
    ],
    "s": [
      "صيغ جاهزة للإعلانات وتقارير الحالة والرسائل الداخلية طبّق ذلك على المهمة أعلاه.",
      "A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "onboarding-cro",
    "cat": "marketing",
    "n": [
      "تحسين تجربة البدء", "onboarding cro"
    ],
    "k": [
      "onboarding-cro",
      "the",
      "user",
      "wants",
      "optimize",
      "post-signup",
      "onboarding",
      "cro",
      "تفعيل",
      "تجربة"
    ],
    "s": [
      "يرفع تفعيل المستخدم ووقت الوصول إلى القيمة طبّق ذلك على المهمة أعلاه.",
      "When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "threat-modeling-expert",
    "cat": "planning",
    "n": [
      "نمذجة التهديدات", "threat modeling expert"
    ],
    "k": [
      "threat-modeling-expert",
      "expert",
      "threat",
      "modeling",
      "methodologies",
      "security",
      "stride",
      "pasta",
      "مخاطر"
    ],
    "s": [
      "STRIDE وPASTA وأشجار الهجوم وتقييم المخاطر طبّق ذلك على المهمة أعلاه.",
      "Expert in threat modeling methodologies, security architecture review, and risk assessment. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "stride-analysis-patterns",
    "cat": "planning",
    "n": [
      "تحليل STRIDE", "stride analysis patterns"
    ],
    "k": [
      "stride-analysis-patterns",
      "stride",
      "methodology",
      "systematically",
      "identify",
      "threats.",
      "threat",
      "security",
      "تهديدات"
    ],
    "s": [
      "يطبّق منهجية STRIDE لتحديد التهديدات بشكل منهجي طبّق ذلك على المهمة أعلاه.",
      "Apply STRIDE methodology to systematically identify threats. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "systematic-debugging",
    "cat": "planning",
    "n": [
      "التصحيح المنهجي", "systematic debugging"
    ],
    "k": [
      "systematic-debugging",
      "when",
      "encountering",
      "bug",
      "test",
      "failure",
      "debugging",
      "systematic",
      "أخطاء",
      "إصلاح"
    ],
    "s": [
      "يحلّل السبب الجذري قبل اقتراح أي إصلاح طبّق ذلك على المهمة أعلاه.",
      "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "test-driven-development",
    "cat": "planning",
    "n": [
      "التطوير بالاختبارات أولًا", "test driven development"
    ],
    "k": [
      "test-driven-development",
      "when",
      "implementing",
      "feature",
      "bugfix",
      "before",
      "tdd",
      "test",
      "driven",
      "development",
      "اختبار"
    ],
    "s": [
      "يكتب الاختبار الفاشل أولًا ثم ينفّذ الحل طبّق ذلك على المهمة أعلاه.",
      "Use when implementing any feature or bugfix, before writing implementation code Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "requesting-code-review",
    "cat": "planning",
    "n": [
      "طلب مراجعة الكود", "requesting code review"
    ],
    "k": [
      "requesting-code-review",
      "when",
      "completing",
      "tasks",
      "implementing",
      "major",
      "code",
      "review",
      "طلب",
      "مراجعة"
    ],
    "s": [
      "يطلب مراجعة مستقلة قبل الدمج مع معايير واضحة طبّق ذلك على المهمة أعلاه.",
      "Use when completing tasks, implementing major features, or before merging to verify work meets requirements Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "receiving-code-review",
    "cat": "planning",
    "n": [
      "استقبال مراجعة الكود", "receiving code review"
    ],
    "k": [
      "receiving-code-review",
      "when",
      "receiving",
      "code",
      "review",
      "feedback",
      "تغذية",
      "راجعة"
    ],
    "s": [
      "يفنّذ الملاحظات بأسئلة توضيح قبل التعديل طبّق ذلك على المهمة أعلاه.",
      "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires  Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "verification-before-completion",
    "cat": "planning",
    "n": [
      "التحقق قبل الإنجاز", "verification before completion"
    ],
    "k": [
      "verification-before-completion",
      "when",
      "about",
      "claim",
      "work",
      "complete",
      "verification",
      "تحقق",
      "قبل",
      "الإنجاز"
    ],
    "s": [
      "يشغّل الفحوص الفعلية قبل أن يدّعي اكتمال العمل طبّق ذلك على المهمة أعلاه.",
      "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "executing-plans",
    "cat": "planning",
    "n": [
      "تنفيذ خطة", "executing plans"
    ],
    "k": [
      "executing-plans",
      "when",
      "have",
      "written",
      "implementation",
      "plan",
      "execute",
      "تنفيذ",
      "خطة"
    ],
    "s": [
      "ينفّذ خطة مكتوبة مع نقاط مراجعة بين المراحل طبّق ذلك على المهمة أعلاه.",
      "Use when you have a written implementation plan to execute in a separate session with review checkpoints Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "writing-plans",
    "cat": "planning",
    "n": [
      "كتابة الخطة", "writing plans"
    ],
    "k": [
      "writing-plans",
      "when",
      "have",
      "spec",
      "requirements",
      "multi-step",
      "write",
      "plan",
      "خطة",
      "قبل",
      "التنفيذ"
    ],
    "s": [
      "يحوّل المتطلبات إلى خطة خطوات قبل بدء العمل طبّق ذلك على المهمة أعلاه.",
      "Use when you have a spec or requirements for a multi-step task, before touching code Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "subagent-driven-development",
    "cat": "planning",
    "n": [
      "التنفيذ بوكالات فرعية", "subagent driven development"
    ],
    "k": [
      "subagent-driven-development",
      "when",
      "executing",
      "implementation",
      "plans",
      "independent",
      "subagent",
      "parallel",
      "تنفيذ",
      "متوازي"
    ],
    "s": [
      "يوزّع خطة التنفيذ على وكلاء متوازيين طبّق ذلك على المهمة أعلاه.",
      "Use when executing implementation plans with independent tasks in the current session Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "dispatching-parallel-agents",
    "cat": "planning",
    "n": [
      "إرسال وكلاء متوازيين", "dispatching parallel agents"
    ],
    "k": [
      "dispatching-parallel-agents",
      "when",
      "facing",
      "independent",
      "tasks",
      "can",
      "parallel",
      "agents",
      "توازٍ"
    ],
    "s": [
      "يشغّل مهامًا مستقلة بالتوازي دون تعارض طبّق ذلك على المهمة أعلاه.",
      "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "finishing-a-development-branch",
    "cat": "planning",
    "n": [
      "إنهاء فرع التطوير", "finishing a development branch"
    ],
    "k": [
      "finishing-a-development-branch",
      "when",
      "implementation",
      "complete",
      "tests",
      "pass",
      "branch",
      "merge",
      "finish",
      "فرع"
    ],
    "s": [
      "خطوات دمج أو تنظيف الفرع بعد اجتياز الاختبارات طبّق ذلك على المهمة أعلاه.",
      "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by prese Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "using-git-worktrees",
    "cat": "planning",
    "n": [
      "أشجار عمل Git", "using git worktrees"
    ],
    "k": [
      "use",
      "starting",
      "feature",
      "work",
      "needs",
      "git",
      "worktree",
      "عزل",
      "فرع"
    ],
    "s": [
      "يعزل العمل في مساحة مستقلة دون المساس بالحالي طبّق ذلك على المهمة أعلاه.",
      "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees w Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "webapp-testing",
    "cat": "design",
    "n": [
      "اختبار تطبيقات الويب", "webapp testing"
    ],
    "k": [
      "webapp-testing",
      "toolkit",
      "interacting",
      "and",
      "testing",
      "local",
      "webapp",
      "playwright",
      "اختبار"
    ],
    "s": [
      "يتحقق من الواجهة فعليًا عبر متصفح آلي طبّق ذلك على المهمة أعلاه.",
      "Toolkit for interacting with and testing local web applications using Playwright. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "api-documentation-generator",
    "cat": "writing",
    "n": [
      "توليد توثيق الـ API", "api documentation generator"
    ],
    "k": [
      "api-documentation-generator",
      "generate",
      "comprehensive",
      "developer-friendly",
      "api",
      "documentation",
      "توليد",
      "توثيق"
    ],
    "s": [
      "توثيق كامل للنقاط والمعاملات والأمثلة من الكود طبّق ذلك على المهمة أعلاه.",
      "Generate comprehensive, developer-friendly API documentation from code, including endpoints, parameters, examples, and best practices Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "documentation-templates",
    "cat": "writing",
    "n": [
      "قوالب التوثيق", "documentation templates"
    ],
    "k": [
      "documentation-templates",
      "documentation",
      "templates",
      "structure",
      "guidelines.",
      "readme",
      "قوالب"
    ],
    "s": [
      "بنية جاهزة لملفات README والتوثيق وتعليقات الكود طبّق ذلك على المهمة أعلاه.",
      "Documentation templates and structure guidelines. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "api-documentation",
    "cat": "writing",
    "n": [
      "توثيق الـ API", "api documentation"
    ],
    "k": [
      "api-documentation",
      "comprehensive",
      "api",
      "documentation",
      "developers.",
      "توثيق",
      "rest",
      "graphql"
    ],
    "s": [
      "توثيق شامل لـ REST وGraphQL مع أمثلة طبّق ذلك على المهمة أعلاه.",
      "Create comprehensive API documentation for developers. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "marp-slide",
    "cat": "writing",
    "n": [
      "شرائح Marp", "marp slide"
    ],
    "k": [
      "marp-slide",
      "professional",
      "marp",
      "presentation",
      "slides",
      "beautiful",
      "عرض",
      "تقديمي"
    ],
    "s": [
      "عرض تقديمي professionally بهوية بصرية نظيفة طبّق ذلك على المهمة أعلاه.",
      "Create professional Marp presentation slides with 7 beautiful themes (default, minimal, colorful, dark, gradient, tech, business). Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "frontend-slides",
    "cat": "writing",
    "n": [
      "عرض تقديمي متحرك", "frontend slides"
    ],
    "k": [
      "frontend-slides",
      "stunning",
      "animation-rich",
      "html",
      "presentations",
      "scratch",
      "slides",
      "presentation",
      "عرض"
    ],
    "s": [
      "عرض HTML غني بالحركات من الصفر أو من PowerPoint طبّق ذلك على المهمة أعلاه.",
      "Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Apply that to the task above."
    ],
    "src": "skills-library.com"
  },
  {
    "id": "office-productivity",
    "cat": "writing",
    "n": [
      "إنتاجية المكتب", "office productivity"
    ],
    "k": [
      "office-productivity",
      "office",
      "productivity",
      "workflow",
      "covering",
      "document",
      "مستندات",
      "excel",
      "عرض"
    ],
    "s": [
      "مستندات وجداول وعروض مع ربطها بأدوات المكتب طبّق ذلك على المهمة أعلاه.",
      "Office productivity workflow covering document creation, spreadsheet automation, presentation generation, and integration with LibreOffice and Microso Apply that to the task above."
    ],
    "src": "skills-library.com"
  }
];

  /* Arabic normalisation: drop the diacritics and unify the alef / ya / ta marbuta */
  const norm = s => String(s || '')
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ');

  /* score every skill against the free text the user typed */
  function find(text, limit, cat) {
    const t = norm(text);
    const pool = cat ? LIST.filter(s => s.cat === cat) : LIST;
    if (!t.trim()) return [];
    const out = [];
    for (const s of pool) {
      let score = 0;
      for (const k of (s.k || [])) {
        const nk = norm(k);
        if (nk.length < 3) continue;
        if (t.includes(nk)) score += nk.length >= 6 ? 3 : 2;
      }
      if (score > 0) out.push({ id: s.id, score });
    }
    out.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    return out.slice(0, limit || 10);
  }

  const byId = {};
  LIST.forEach(s => { byId[s.id] = s; });

  return { list: LIST, cats: CATS, byId, norm, find };
})();
