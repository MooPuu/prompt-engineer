/* Prompt Engineer -- the slash-command library.
   Every command is a short, direct instruction that does one useful job.
   The list comes from the public ChatGPT command guides; each entry keeps the
   command name, what it is good for, the plain-text equivalent for the models
   that have no slash-command support, and the words that point at it.
   The names and the wording stay bilingual AR/EN by design. */
window.PE_COMMANDS = (function () {
  const TOOLS = {
  "chatgpt": {
    "n": [
      "ChatGPT",
      "ChatGPT"
    ],
    "slash": true
  },
  "claude": {
    "n": [
      "Claude",
      "Claude"
    ],
    "slash": true
  },
  "gemini": {
    "n": [
      "Gemini",
      "Gemini"
    ],
    "slash": true
  },
  "copilot": {
    "n": [
      "Copilot",
      "Copilot"
    ],
    "slash": true
  },
  "perplexity": {
    "n": [
      "Perplexity",
      "Perplexity"
    ],
    "slash": false
  },
  "deepseek": {
    "n": [
      "DeepSeek",
      "DeepSeek"
    ],
    "slash": false
  },
  "qwen": {
    "n": [
      "Qwen",
      "Qwen"
    ],
    "slash": false
  },
  "meta": {
    "n": [
      "Llama / Meta",
      "Llama / Meta"
    ],
    "slash": false
  }
};
  const LIST = [
  {
    "c": "/eli5",
    "n": [
      "شرح مبسّط",
      "Explain simply"
    ],
    "d": [
      "يشرح الفكرة بلغة يفهمها أي شخص",
      "Explains the idea in words anyone can follow"
    ],
    "x": [
      "بسّط لي ما يلي بلغة سهلة: ",
      "Simplify the following in plain language: "
    ],
    "k": [
      "eli5",
      "explain like",
      "simple explanation",
      "beginner",
      "شرح",
      "مبسط",
      "بسيط",
      "explain",
      "simply"
    ]
  },
  {
    "c": "/simplify",
    "n": [
      "تبسيط",
      "Simplify"
    ],
    "d": [
      "يختصر النص دون أن يفقد معناه",
      "Shortens the text without losing meaning"
    ],
    "x": [
      "بسّط النص التالي مع الحفاظ على كل معانيه: ",
      "Simplify the following text while keeping every meaning: "
    ],
    "k": [
      "simplify",
      "shorten",
      "concise",
      "condense",
      "تبسيط",
      "اختصار",
      "مختصر",
      "difficult",
      "content"
    ]
  },
  {
    "c": "/explain",
    "n": [
      "شرح",
      "Explain"
    ],
    "d": [
      "يشرح أي مفهوم خطوة بخطوة",
      "Explains any concept step by step"
    ],
    "x": [
      "اشرح لي ما يلي خطوة بخطوة: ",
      "Explain the following step by step: "
    ],
    "k": [
      "explain",
      "how does",
      "what is",
      "why does",
      "شرح",
      "وض��ح",
      "ما هو",
      "explains",
      "concept",
      "step"
    ]
  },
  {
    "c": "/summarize",
    "n": [
      "تلخيص",
      "Summarize"
    ],
    "d": [
      "يلخّص النص في نقاط أساسية",
      "Condenses the text into key points"
    ],
    "x": [
      "لخّص لي ما يلي في نقاط واضحة: ",
      "Summarize the following into clear bullet points: "
    ],
    "k": [
      "summarize",
      "summary",
      "tldr",
      "digest",
      "ملخص",
      "تلخيص",
      "لخّص",
      "content"
    ]
  },
  {
    "c": "/analogy",
    "n": [
      "تشبيه",
      "Analogy"
    ],
    "d": [
      "يضرب مثالًا من الحياة اليومية",
      "Explains it through an everyday analogy"
    ],
    "x": [
      "وضّح ما يلي بتشبيه من الحياة اليومية: ",
      "Explain the following with an everyday analogy: "
    ],
    "k": [
      "analogy",
      "like a",
      "compare to",
      "تشبيه",
      "مثال",
      "explain"
    ]
  },
  {
    "c": "/socratic",
    "n": [
      "حوار سقراطي",
      "Socratic"
    ],
    "d": [
      "يشرح عبر أسئلة موجّهة",
      "Teaches through guiding questions"
    ],
    "x": [
      "اشرح لي ما يلي بأسئلة سقراطية متدرجة: ",
      "Explain the following through guided Socratic questions: "
    ],
    "k": [
      "socratic",
      "guided question",
      "أسئلة",
      "سقراط",
      "teach",
      "questions"
    ]
  },
  {
    "c": "/teachme",
    "n": [
      "شرح منهجي",
      "Teach me"
    ],
    "d": [
      "يقسّم الشرح إلى دروس متدرجة",
      "Breaks the topic into progressive lessons"
    ],
    "x": [
      "علّمني ما يلي على شكل دروس متدرجة: ",
      "Teach me the following as progressive lessons: "
    ],
    "k": [
      "teachme",
      "teach",
      "tutorial",
      "lesson",
      "course for",
      "شرح",
      "تعليم",
      "درس",
      "structured",
      "tutoring"
    ]
  },
  {
    "c": "/cheatsheet",
    "n": [
      "ورقة مرجعية",
      "Cheatsheet"
    ],
    "d": [
      "يلخّص كل شيء في صفحة واحدة",
      "Condenses everything into one page"
    ],
    "x": [
      "أعد لي ما يلي كورقة مرجعية سريعة: ",
      "Turn the following into a one-page quick-reference sheet: "
    ],
    "k": [
      "cheatsheet",
      "cheat sheet",
      "quick reference",
      "مرجع سريع",
      "ورقة مرجعية",
      "quick-reference",
      "notes"
    ]
  },
  {
    "c": "/flashcards",
    "n": [
      "بطاقات مراجعة",
      "Flashcards"
    ],
    "d": [
      "ينشئ بطاقات تعليمية للمراجعة",
      "Builds study cards for revision"
    ],
    "x": [
      "أنشئ بطاقات مراجعة من ما يلي: ",
      "Create flashcards from the following: "
    ],
    "k": [
      "flashcards",
      "flashcard",
      "memorize",
      "بطاقات",
      "حفظ",
      "study"
    ]
  },
  {
    "c": "/quiz",
    "n": [
      "اختبار",
      "Quiz"
    ],
    "d": [
      "يولّد اختبارًا مع الإجابات النموذجية",
      "Generates a quiz with the model answers"
    ],
    "x": [
      "أنشئ اختبارًا من ما يلي مع الإجابات: ",
      "Create a quiz from the following with the answers: "
    ],
    "k": [
      "quiz",
      "test me",
      "امتحان",
      "اختبرني"
    ]
  },
  {
    "c": "/viva",
    "n": [
      "مراجعة مناقشة",
      "Viva prep"
    ],
    "d": [
      "يجهّز أسئلة مناقشة شفهية",
      "Prepares oral defence questions"
    ],
    "x": [
      "جهّز لي أسئلة مناقشة حول ما يلي: ",
      "Prepare oral defence questions about the following: "
    ],
    "k": [
      "viva",
      "defence",
      "defense",
      "oral exam",
      "مناقشة",
      "دفاع",
      "preparation"
    ]
  },
  {
    "c": "/interview",
    "n": [
      "مقابلة تجريبية",
      "Mock interview"
    ],
    "d": [
      "يسمّي دورك ويطرح أسئلة مقابلة",
      "Plays the interviewer and asks questions"
    ],
    "x": [
      "سمِّ دورك كمُحاوِر واسألني أسئلة حول: ",
      "Act as the interviewer and ask me questions about: "
    ],
    "k": [
      "interview",
      "mock interview",
      "practice",
      "مقابلة",
      "مقابلات",
      "mock"
    ]
  },
  {
    "c": "/devilsadvocate",
    "n": [
      "محامي الشيطان",
      "Devil's advocate"
    ],
    "d": [
      "ينقض الافتراضات ويكشف الثغرات",
      "Attacks the assumptions and exposes the gaps"
    ],
    "x": [
      "انتقض كل افتراض في ما يلي واقترح ما هو مفقود: ",
      "Challenge every assumption in the following and point out what is missing: "
    ],
    "k": [
      "devilsadvocate",
      "devil",
      "challenge my",
      "attack my",
      "critical review",
      "محامي الشيطان",
      "انتقض",
      "نقد",
      "challenge",
      "assumptions"
    ]
  },
  {
    "c": "/premortem",
    "n": [
      "تحليل مسبق للاخفاق",
      "Premortem"
    ],
    "d": [
      "يفترض الفشل ويحدد أسبابه",
      "Assumes it failed and finds the causes"
    ],
    "x": [
      "افترض أن المشروع التالي فشل، ثم اشرح لماذا: ",
      "Assume the following project failed, then explain why: "
    ],
    "k": [
      "premortem",
      "assume it failed",
      "why did it fail",
      "تحليل مسبق",
      "فشل",
      "assume",
      "failure",
      "analyze"
    ]
  },
  {
    "c": "/redteam",
    "n": [
      "فريق هجوم",
      "Red team"
    ],
    "d": [
      "يختبر الخطة بأسلوب خصم محترف",
      "Tests the plan the way a hostile rival would"
    ],
    "x": [
      "اختبر الخطة التالية بأسلوب خصم محترف: ",
      "Stress-test the following plan the way a hostile rival would: "
    ],
    "k": [
      "redteam",
      "red team",
      "hostile",
      "adversarial",
      "فريق هجوم",
      "هجوم",
      "stress-test",
      "plan"
    ]
  },
  {
    "c": "/factcheck",
    "n": [
      "تحقق من الحقائق",
      "Fact check"
    ],
    "d": [
      "يفحص كل ادعاء ويصنّف صحته",
      "Checks every claim and rates its accuracy"
    ],
    "x": [
      "تحقق من ادعاءات النص التالي وبيّن ما هو صحيح وما هو مضاعف: ",
      "Fact-check the claims in the following and separate the true from the overstated: "
    ],
    "k": [
      "factcheck",
      "fact check",
      "verify",
      "true or false",
      "تحقق",
      "حقيقة",
      "claims"
    ]
  },
  {
    "c": "/mythvsfact",
    "n": [
      "خرافة أم حقيقة",
      "Myth vs fact"
    ],
    "d": [
      "يفصل الخرافة عن الحقيقة",
      "Separates the myth from the fact"
    ],
    "x": [
      "افصل بين الخرافة والحقيقة في الموضوع التالي: ",
      "Separate the myths from the facts about the following: "
    ],
    "k": [
      "mythvsfact",
      "myth",
      "خرافة",
      "حقيقة",
      "separate",
      "myths",
      "facts"
    ]
  },
  {
    "c": "/proscons",
    "n": [
      "مزايا وعيوب",
      "Pros and cons"
    ],
    "d": [
      "يزن الخيارات في جدول واضح",
      "Weighs the options in a clear table"
    ],
    "x": [
      "اعرض مزايا وعيوب كل خيار في جدول: ",
      "Show the pros and cons of every option in a table: "
    ],
    "k": [
      "proscons",
      "pros and cons",
      "advantages and disadvantages",
      "trade off",
      "مزايا",
      "عيوب",
      "إيجابيات",
      "advantages",
      "disadvantages"
    ]
  },
  {
    "c": "/swot",
    "n": [
      "تحليل SWOT",
      "SWOT analysis"
    ],
    "d": [
      "يفحص القوة والضعف والفرص والمخاطر",
      "Maps strengths, weaknesses, opportunities and threats"
    ],
    "x": [
      "أجرِ تحليل SWOT للموضوع التالي: ",
      "Run a SWOT analysis on the following: "
    ],
    "k": [
      "swot",
      "strengths",
      "weaknesses",
      "opportunities",
      "قوة",
      "ضعف",
      "فرص",
      "analysis"
    ]
  },
  {
    "c": "/pestle",
    "n": [
      "تحليل PESTLE",
      "PESTLE analysis"
    ],
    "d": [
      "يحلل البيئة السياسية والاقتصادية",
      "Reads the political, economic and social context"
    ],
    "x": [
      "حلّل الموضوع التالي باستخدام PESTLE: ",
      "Analyse the following with a PESTLE lens: "
    ],
    "k": [
      "pestle",
      "political",
      "macro environment",
      "سياسة",
      "اقتصاد",
      "بيئة",
      "analysis"
    ]
  },
  {
    "c": "/fiveforces",
    "n": [
      "قوى بورتر",
      "Porter's Five Forces"
    ],
    "d": [
      "يقيس شدة المنافسة في السوق",
      "Measures how fierce the competition is"
    ],
    "x": [
      "قيّم شدة المنافسة في السوق التالي بالأقوى الخمسة: ",
      "Assess the competition in the following market with the Five Forces: "
    ],
    "k": [
      "fiveforces",
      "porter",
      "five forces",
      "قوى بورتر",
      "قوى",
      "five",
      "forces"
    ]
  },
  {
    "c": "/fivewhys",
    "n": [
      "لماذا الخمسة",
      "Five Whys"
    ],
    "d": [
      "يصل إلى السبب الجذري بأسئلة متتابعة",
      "Reaches the root cause with five whys"
    ],
    "x": [
      "اسأل لماذا خمس مرات للوصول إلى السبب الجذري في: ",
      "Ask why five times to reach the root cause of: "
    ],
    "k": [
      "fivewhys",
      "five whys",
      "لماذا خمس",
      "خمسة لماذا",
      "analysis"
    ]
  },
  {
    "c": "/rootcause",
    "n": [
      "السبب الجذري",
      "Root cause"
    ],
    "d": [
      "يحلّل السبب الحقيقي للمشكلة",
      "Finds the real cause of the problem"
    ],
    "x": [
      "حلّل السبب الجذري للمشكلة التالية: ",
      "Find the root cause of the following problem: "
    ],
    "k": [
      "rootcause",
      "root cause",
      "why did it happen",
      "cause",
      "السبب الجذري",
      "سبب",
      "find",
      "root"
    ]
  },
  {
    "c": "/decisionmatrix",
    "n": [
      "مصفوفة قرار",
      "Decision matrix"
    ],
    "d": [
      "يزن الخيارات بمعيارات مرجّحة",
      "Weighs the options on weighted criteria"
    ],
    "x": [
      "ابنِ مصفوفة قرار للخيارات التالية: ",
      "Build a weighted decision matrix for the following options: "
    ],
    "k": [
      "decisionmatrix",
      "decision matrix",
      "weighted criteria",
      "مصفوفة قرار",
      "معايير",
      "weighted",
      "decision",
      "matrix"
    ]
  },
  {
    "c": "/strategy",
    "n": [
      "استراتيجية",
      "Strategy"
    ],
    "d": [
      "يبني خطة استراتيجية قابلة للتنفيذ",
      "Builds an actionable strategic plan"
    ],
    "x": [
      "ابنِ خطة استراتيجية قابلة للتنفيذ حول: ",
      "Build an actionable strategy around: "
    ],
    "k": [
      "strategy",
      "strategic plan",
      "استراتيجية",
      "خطة استراتيجية",
      "strategic",
      "planning"
    ]
  },
  {
    "c": "/marketmap",
    "n": [
      "خريطة السوق",
      "Market map"
    ],
    "d": [
      "يرسم خريطة赛场 واللاعبين والفجوات",
      "Maps the players, the segments and the gaps"
    ],
    "x": [
      "ارسم خريطة السوق حول: ",
      "Map the market around: "
    ],
    "k": [
      "marketmap",
      "market map",
      "market landscape",
      "competitive landscape",
      "خريطة السوق",
      "industry",
      "landscape"
    ]
  },
  {
    "c": "/benchmark",
    "n": [
      "مقارنة مع المرجع",
      "Benchmark"
    ],
    "d": [
      "يقارن الأداء بأفضل الممارسات",
      "Compares the performance against best practice"
    ],
    "x": [
      "قارن ما يلي بأفضل الممارسات في المجال: ",
      "Compare the following against the best practice in the field: "
    ],
    "k": [
      "benchmark",
      "best in class",
      "compare against",
      "مرجع",
      "مقارنة مع",
      "comparison"
    ]
  },
  {
    "c": "/insights",
    "n": [
      "استخلاص الرؤى",
      "Insights"
    ],
    "d": [
      "يستخرج الأفكار الفعلية من البيانات",
      "Extracts the real insights from the data"
    ],
    "x": [
      "استخرج الرؤى الأهم من البيانات التالية: ",
      "Extract the most important insights from the following data: "
    ],
    "k": [
      "insights",
      "insight",
      "what does the data say",
      "رؤى",
      "استنتاجات",
      "دلالات",
      "extract"
    ]
  },
  {
    "c": "/recommendations",
    "n": [
      "توصيات",
      "Recommendations"
    ],
    "d": [
      "يعطي توصيات مرتبة حسب الأولوية",
      "Gives recommendations ranked by priority"
    ],
    "x": [
      "اقترح توصيات مرتبة حسب الأولوية حول: ",
      "Give me recommendations ranked by priority about: "
    ],
    "k": [
      "recommendations",
      "recommend",
      "what should i",
      "suggestions",
      "توصيات",
      "نصح",
      "اقترح",
      "provide"
    ]
  },
  {
    "c": "/prioritize",
    "n": [
      "ترتيب الأولويات",
      "Prioritize"
    ],
    "d": [
      "يرتّب الأعمال حسب الأثر",
      "Ranks the work by impact"
    ],
    "x": [
      "رتّب البنود التالية حسب الأثر أولاً: ",
      "Prioritise the following by impact first: "
    ],
    "k": [
      "prioritize",
      "what first",
      "rank these",
      "أولويات",
      "ترتيب",
      "الأهم",
      "rank",
      "priority"
    ]
  },
  {
    "c": "/executivebrief",
    "n": [
      "ملخص تنفيذي",
      "Executive brief"
    ],
    "d": [
      "يختصر الموضوع لصفحة واحدة",
      "Condenses the topic into one page"
    ],
    "x": [
      "اكتب ملخصًا تنفيذيًا في صفحة واحدة عن: ",
      "Write a one-page executive brief about: "
    ],
    "k": [
      "executivebrief",
      "executive summary",
      "one page",
      "brief me",
      "ملخص تنفيذي",
      "executive",
      "summary"
    ]
  },
  {
    "c": "/consultant",
    "n": [
      "استشاري",
      "Consultant"
    ],
    "d": [
      "يعطيك نصيحة استشارية عملية",
      "Gives you practical consultancy advice"
    ],
    "x": [
      "انصحني كاستشاري محترف حول: ",
      "Advise me as a senior consultant about: "
    ],
    "k": [
      "consultant",
      "advise me",
      "consult",
      "استشارة",
      "استشرني",
      "consulting-style",
      "advice"
    ]
  },
  {
    "c": "/roleplay",
    "n": [
      "تمثيل دور",
      "Role play"
    ],
    "d": [
      "يتقمّص دورًا ويبدأ الحوار",
      "Steps into a role and starts the exchange"
    ],
    "x": [
      "تقمّص دور: ",
      "Act as: "
    ],
    "k": [
      "roleplay",
      "act as",
      "pretend",
      "simulate a",
      "تمثيل",
      "تقمّص",
      "ت playing",
      "assume",
      "expert",
      "role"
    ]
  },
  {
    "c": "/brainstorm",
    "n": [
      "عصف ذهني",
      "Brainstorm"
    ],
    "d": [
      "يولّد أفكارًا كثيرة ومتنوعة",
      "Generates many varied ideas"
    ],
    "x": [
      "أطلق عصفًا ذهنيًا حول: ",
      "Brainstorm widely about: "
    ],
    "k": [
      "brainstorm",
      "ideas",
      "give me ideas",
      "عصف",
      "أفكار",
      "أفكارا",
      "lots"
    ]
  },
  {
    "c": "/compare",
    "n": [
      "مقارنة",
      "Compare"
    ],
    "d": [
      "يقارن بين خيارات أو نسختين",
      "Compares two options or two versions"
    ],
    "x": [
      "قارن بين: ",
      "Compare between: "
    ],
    "k": [
      "compare",
      "versus",
      "difference between",
      "مقارنة",
      "الفرق",
      "compares",
      "two",
      "options",
      "versions"
    ]
  },
  {
    "c": "/plan",
    "n": [
      "خطة",
      "Plan"
    ],
    "d": [
      "يبني خطة خطوات مرتبة",
      "Builds an ordered step-by-step plan"
    ],
    "x": [
      "اكتب خطة步骤 مفصلة لتنفيذ: ",
      "Write a detailed step-by-step plan to execute: "
    ],
    "k": [
      "plan",
      "steps to",
      "how to achieve",
      "خطة",
      "خطوات",
      "مخطط",
      "builds",
      "ordered",
      "step-by-step"
    ]
  },
  {
    "c": "/actionplan",
    "n": [
      "خطة عمل",
      "Action plan"
    ],
    "d": [
      "يحوّل الهدف إلى خطوات بمالك ومدة",
      "Turns the goal into owned, timed steps"
    ],
    "x": [
      "حوّل الهدف التالي إلى خطة عمل بخطوات ومالك ومدة: ",
      "Turn the following goal into an action plan with owners and deadlines: "
    ],
    "k": [
      "actionplan",
      "action plan",
      "who does what",
      "deadline",
      "خطة عمل",
      "مهام",
      "step-by-step",
      "action",
      "plan"
    ]
  },
  {
    "c": "/table",
    "n": [
      "جدول",
      "Table"
    ],
    "d": [
      "يحوّل المحتوى إلى جدول منظم",
      "Turns the content into a neat table"
    ],
    "x": [
      "حوّل ما يلي إلى جدول منظم: ",
      "Turn the following into a neat table: "
    ],
    "k": [
      "table",
      "convert to a table",
      "tabulate",
      "جدول",
      "جدولة",
      "convert"
    ]
  },
  {
    "c": "/extract",
    "n": [
      "استخراج",
      "Extract"
    ],
    "d": [
      "يستخرج المعلومات المهمة فقط",
      "Pulls out only the important information"
    ],
    "x": [
      "استخرج المعلومات المهمة من النص التالي: ",
      "Extract the key information from the following: "
    ],
    "k": [
      "extract",
      "pull out",
      "key points from",
      "استخراج",
      "استخرج",
      "key",
      "information"
    ]
  },
  {
    "c": "/research",
    "n": [
      "بحث",
      "Research"
    ],
    "d": [
      "يبحث ويجمع مصادر موثوقة",
      "Researches and gathers reliable sources"
    ],
    "x": [
      "ابحث عن: ",
      "Research: "
    ],
    "k": [
      "research",
      "look up",
      "find sources",
      "بحث",
      "ابحث",
      "أبحث",
      "structured"
    ]
  },
  {
    "c": "/sources",
    "n": [
      "مصادر",
      "Sources"
    ],
    "d": [
      "يقترح مصادر وروابط للتحقق",
      "Suggests sources and links to verify"
    ],
    "x": [
      "اقترح مصادر موثوقة حول: ",
      "Suggest reliable sources about: "
    ],
    "k": [
      "sources",
      "citations",
      "references",
      "where to find",
      "مراجع",
      "مصادر",
      "find",
      "reliable"
    ]
  },
  {
    "c": "/audit",
    "n": [
      "تدقيق",
      "Audit"
    ],
    "d": [
      "يفحص العمل ويكشف الفجوات",
      "Reviews the work and exposes the gaps"
    ],
    "x": [
      "دقّق في العمل التالي واكشف الفجوات: ",
      "Audit the following work and expose the gaps: "
    ],
    "k": [
      "audit",
      "review my",
      "check for errors",
      "تدقيق",
      "مراجعة",
      "افحص",
      "perform",
      "comprehensive"
    ]
  },
  {
    "c": "/analyze",
    "n": [
      "تحليل",
      "Analyze"
    ],
    "d": [
      "يحلّل المحتوى ويستخلص النتائج",
      "Analyses the content and draws the conclusions"
    ],
    "x": [
      "حلّل ما يلي واستخلص النتائج: ",
      "Analyse the following and draw the conclusions: "
    ],
    "k": [
      "analyze",
      "analyse",
      "break down",
      "تحليل",
      "حلل",
      "takes",
      "document",
      "dataset",
      "piece"
    ]
  },
  {
    "c": "/deep_research",
    "n": [
      "بحث معمّق",
      "Deep research"
    ],
    "d": [
      "بحث متعدد المصادر مع تقاطع",
      "Multi-source research with cross-checking"
    ],
    "x": [
      "أجرِ بحثًا معمّقًا متعدد المصادر حول: ",
      "Do a deep multi-source research on: "
    ],
    "k": [
      "deep",
      "research",
      "deep research",
      "thorough research",
      "بحث معمّق",
      "بحث عميق",
      "most",
      "thorough",
      "command."
    ]
  },
  {
    "c": "/write",
    "n": [
      "كتابة",
      "Write"
    ],
    "d": [
      "يكتب نصًا كاملًا متقنًا",
      "Writes a polished, complete text"
    ],
    "x": [
      "اكتب لي: ",
      "Write for me: "
    ],
    "k": [
      "write",
      "draft",
      "compose",
      "اكتب",
      "صياغة",
      "اكتب لي",
      "opens",
      "blank",
      "document",
      "chatgpt"
    ]
  },
  {
    "c": "/rewrite",
    "n": [
      "إعادة صياغة",
      "Rewrite"
    ],
    "d": [
      "يعيد الصياغة بأسلوب أفضل",
      "Rewrites it in a better voice"
    ],
    "x": [
      "أعد صياغة النص التالي بأسلوب أفضل: ",
      "Rewrite the following in a better voice: "
    ],
    "k": [
      "rewrite",
      "rephrase",
      "better wording",
      "أعد صياغة",
      "صياغة أفضل",
      "while",
      "preserving",
      "meaning"
    ]
  },
  {
    "c": "/edit",
    "n": [
      "تحرير",
      "Edit"
    ],
    "d": [
      "يحسّن الصياغة ويحذف الحشو",
      "Polishes the wording and cuts the filler"
    ],
    "x": [
      "حرّر النص التالي: ",
      "Edit the following: "
    ],
    "k": [
      "edit",
      "proofread",
      "polish",
      "تحرير",
      "مراجعة لغوية",
      "most",
      "granular",
      "writing",
      "commands."
    ]
  },
  {
    "c": "/translate",
    "n": [
      "ترجمة",
      "Translate"
    ],
    "d": [
      "ينقل المعنى بلغة أخرى بسلاسة",
      "Carries the meaning into another language smoothly"
    ],
    "x": [
      "ترجم ما يلي إلى: ",
      "Translate the following into: "
    ],
    "k": [
      "translate",
      "in english",
      "in spanish",
      "in german",
      "ترجم",
      "ترجمة",
      "multi-lingual",
      "translation"
    ]
  },
  {
    "c": "/code",
    "n": [
      "كود",
      "Code"
    ],
    "d": [
      "يكتب كودًا جاهزًا للتشغيل",
      "Writes ready to run code"
    ],
    "x": [
      "اكتب كودًا ينفّذ: ",
      "Write code that: "
    ],
    "k": [
      "code",
      "function",
      "script in",
      "bug in",
      "كود",
      "برمجة",
      "دالة",
      "خطأ برمجي",
      "auto-generates",
      "logic",
      "snippets"
    ]
  },
  {
    "c": "/image",
    "n": [
      "صورة",
      "Image"
    ],
    "d": [
      "يولّد وصف صورة مفصّل",
      "Generates a detailed image prompt"
    ],
    "x": [
      "اكتب وصفًا مفصّلًا لتوليد صورة عن: ",
      "Write a detailed image prompt for: "
    ],
    "k": [
      "image",
      "picture",
      "illustration",
      "logo",
      "draw me",
      "صورة",
      "رسم",
      "تصميم",
      "direct",
      "generation",
      "commands"
    ]
  },
  {
    "c": "/image_edit",
    "n": [
      "تعديل صورة",
      "Edit image"
    ],
    "d": [
      "يصف تعديلًا على صورة موجودة",
      "Describes an edit on an existing image"
    ],
    "x": [
      "عدّل الصورة بحيث: ",
      "Edit the image so that: "
    ],
    "k": [
      "image",
      "edit",
      "edit the image",
      "change the image",
      "modify the image",
      "تعديل صورة",
      "takes",
      "existing",
      "modification"
    ]
  },
  {
    "c": "/canvas",
    "n": [
      "لوحة",
      "Canvas"
    ],
    "d": [
      "يبني لوحة عمل تعاونية",
      "Builds a shared canvas"
    ],
    "x": [
      "أنشئ لوحة عن: ",
      "Create a canvas about: "
    ],
    "k": [
      "canvas",
      "workspace",
      "shared board",
      "لوحة",
      "مساحة عمل",
      "multi-user",
      "code",
      "editor"
    ]
  },
  {
    "c": "/study",
    "n": [
      "دراسة",
      "Study"
    ],
    "d": [
      "يبني خطة تعلّم متدرجة",
      "Builds a progressive study plan"
    ],
    "x": [
      "ابنِ لي خطة تعلّم حول: ",
      "Build a study plan for: "
    ],
    "k": [
      "study",
      "learn",
      "revision",
      "exam prep",
      "دراسة",
      "أتعلم",
      "مذاكرة",
      "activates",
      "mode"
    ]
  },
  {
    "c": "/notes",
    "n": [
      "ملاحظات",
      "Notes"
    ],
    "d": [
      "ينظّم الملاحظات بعناوين",
      "Organises the notes with headings"
    ],
    "x": [
      "نظّم الملاحظات التالية بعناوين واضحة: ",
      "Organise the following notes with clear headings: "
    ],
    "k": [
      "notes",
      "organise my notes",
      "organize my notes",
      "ملاحظات",
      "نظم ملاحظاتي",
      "study"
    ]
  },
  {
    "c": "/search",
    "n": [
      "بحث",
      "Search"
    ],
    "d": [
      "يبحث في الويب بمصادر موثقة",
      "Searches the web with cited sources"
    ],
    "x": [
      "ابحث في الويب عن: ",
      "Search the web for: "
    ],
    "k": [
      "search",
      "look up online",
      "web search",
      "find online",
      "بحث",
      "ابحث في الويب",
      "triggers",
      "live",
      "web"
    ]
  },
  {
    "c": "/presentation",
    "n": [
      "عرض تقديمي",
      "Presentation"
    ],
    "d": [
      "يبني هيكل عرض بست شرائح",
      "Builds a six slide deck outline"
    ],
    "x": [
      "ابنِ هيكل عرض تقديمي عن: ",
      "Build a presentation outline about: "
    ],
    "k": [
      "presentation",
      "slides",
      "deck",
      "عرض تقديمي",
      "شرائح",
      "عرض",
      "outline"
    ]
  },
  {
    "c": "/spreadsheet",
    "n": [
      "جدول بيانات",
      "Spreadsheet"
    ],
    "d": [
      "يبني أعمدة جدول مع صيغ",
      "Builds table columns with formulas"
    ],
    "x": [
      "أنشئ جدول بيانات يحوي: ",
      "Create a spreadsheet with the columns: "
    ],
    "k": [
      "spreadsheet",
      "excel",
      "csv",
      "sheet",
      "جدول بيانات",
      "إكسل",
      "builds",
      "table",
      "columns",
      "formulas"
    ]
  },
  {
    "c": "/pdf",
    "n": [
      "تقرير PDF",
      "PDF report"
    ],
    "d": [
      "يهيّئ تقريرًا جاهزًا للطباعة",
      "Prepares a print-ready report"
    ],
    "x": [
      "أعدّ تقريرًا جاهزًا للطباعة عن: ",
      "Prepare a print-ready report about: "
    ],
    "k": [
      "pdf",
      "print ready",
      "paginate",
      "تقرير",
      "ملف pdf",
      "prepares",
      "print-ready",
      "report"
    ]
  },
  {
    "c": "/email",
    "n": [
      "إيميل",
      "Email"
    ],
    "d": [
      "يكتب رسالة بريد احترافية",
      "Writes a professional email"
    ],
    "x": [
      "اكتب لي إيميل عن: ",
      "Write an email about: "
    ],
    "k": [
      "email",
      "mail",
      "reply to",
      "e-mail",
      "بريد",
      "إيميل",
      "رسالة",
      "formats",
      "emails"
    ]
  },
  {
    "c": "/resume",
    "n": [
      "سيرة ذاتية",
      "Resume"
    ],
    "d": [
      "يكتب سيرة ذاتية مركّزة",
      "Writes a focused resume"
    ],
    "x": [
      "اكتب لي سيرة ذاتية عن: ",
      "Write a resume for: "
    ],
    "k": [
      "resume",
      "cv",
      "job application",
      "سيرة ذاتية",
      "سيرة",
      "writes",
      "focused"
    ]
  },
  {
    "c": "/math",
    "n": [
      "حساب",
      "Math"
    ],
    "d": [
      "يحل المسألة خطوة بخطوة",
      "Solves the problem step by step"
    ],
    "x": [
      "حلّ المسألة التالية خطوة بخطوة: ",
      "Solve the following step by step: "
    ],
    "k": [
      "math",
      "calculate",
      "formula",
      "solve",
      "رياضيات",
      "حساب",
      "معادلة",
      "solves",
      "problem",
      "step"
    ]
  },
  {
    "c": "/visualize",
    "n": [
      "تصوّر بصري",
      "Visualize"
    ],
    "d": [
      "يشرح الفكرة برسم أو مخطط",
      "Explains the idea with a diagram"
    ],
    "x": [
      "صوّر الفكرة التالية برسم أو مخطط: ",
      "Visualise the following idea with a diagram: "
    ],
    "k": [
      "visualize",
      "visualise",
      "visual explanation",
      "رسم توضيحي",
      "وضح بصري",
      "turn",
      "ideas",
      "visual",
      "explanations"
    ]
  },
  {
    "c": "/mindmap",
    "n": [
      "خريطة ذهنية",
      "Mind map"
    ],
    "d": [
      "يرتب الأفكار في خريطة ذهنية",
      "Arranges the ideas in a mind map"
    ],
    "x": [
      "اربط الأفكار التالية في خريطة ذهنية: ",
      "Connect the following ideas in a mind map: "
    ],
    "k": [
      "mindmap",
      "mind map",
      "خريطة ذهنية",
      "mind",
      "map"
    ]
  },
  {
    "c": "/diagram",
    "n": [
      "مخطط",
      "Diagram"
    ],
    "d": [
      "يرسم مخططًا توضيحيًا",
      "Draws an explanatory diagram"
    ],
    "x": [
      "ارسم مخططًا يوضح: ",
      "Draw a diagram that shows: "
    ],
    "k": [
      "diagram",
      "explain with a picture",
      "مخطط",
      "رسم بياني",
      "draw",
      "concept"
    ]
  },
  {
    "c": "/flowchart",
    "n": [
      "مخطط تدفق",
      "Flowchart"
    ],
    "d": [
      "يرسم خطوات العملية",
      "Draws the steps of the process"
    ],
    "x": [
      "ارسم مخطط تدفق لعملية: ",
      "Draw a flowchart for the process of: "
    ],
    "k": [
      "flowchart",
      "flow chart",
      "process diagram",
      "مخطط تدفق",
      "step-by-step"
    ]
  },
  {
    "c": "/roadmap",
    "n": [
      "خارطة طريق",
      "Roadmap"
    ],
    "d": [
      "يبني خارطة مراحل مرتبة",
      "Builds an ordered roadmap of stages"
    ],
    "x": [
      "ابنِ خارطة طريق مرتبة لِ: ",
      "Build a roadmap for: "
    ],
    "k": [
      "roadmap",
      "milestones",
      "خارطة طريق",
      "learning",
      "execution"
    ]
  },
  {
    "c": "/dashboard",
    "n": [
      "لوحة مؤشرات",
      "Dashboard"
    ],
    "d": [
      "يصمم لوحة مؤشرات ومقاييس",
      "Designs a dashboard with the right metrics"
    ],
    "x": [
      "صمّم لوحة مؤشرات لـ: ",
      "Design a dashboard for: "
    ],
    "k": [
      "dashboard",
      "kpi",
      "metrics board",
      "لوحة مؤشرات",
      "مؤشرات",
      "kpis"
    ]
  },
  {
    "c": "/timeline",
    "n": [
      "خط زمني",
      "Timeline"
    ],
    "d": [
      "يرتب الأحداث زمنيًا",
      "Arranges the events chronologically"
    ],
    "x": [
      "رتّب الأحداث التالية زمنيًا: ",
      "Arrange the following events into a timeline: "
    ],
    "k": [
      "timeline",
      "chronological",
      "خط زمني",
      "تسلسل زمني"
    ]
  },
  {
    "c": "/process",
    "n": [
      "شرح عملية",
      "Process"
    ],
    "d": [
      "يشرح الخطوات كاملة",
      "Explains the whole process"
    ],
    "x": [
      "اشرح عملية: ",
      "Explain the process of: "
    ],
    "k": [
      "process",
      "how it works",
      "explain the process",
      "عملية",
      "كيف يعمل",
      "explain",
      "complete"
    ]
  },
  {
    "c": "/journey",
    "n": [
      "رحلة المستخدم",
      "User journey"
    ],
    "d": [
      "يرسم رحلة المستخدم ونقاط الألم",
      "Maps the user journey and the pain points"
    ],
    "x": [
      "ارسم رحلة المستخدم لـ: ",
      "Map the user journey for: "
    ],
    "k": [
      "journey",
      "user flow",
      "customer journey",
      "رحلة",
      "رحلة المستخدم",
      "end-to-end"
    ]
  },
  {
    "c": "/ecosystem",
    "n": [
      "منظومة",
      "Ecosystem"
    ],
    "d": [
      "يحدد اللاعبين والعلاقات بينهم",
      "Identifies the players and how they relate"
    ],
    "x": [
      "حلل منظومة: ",
      "Map the ecosystem of: "
    ],
    "k": [
      "ecosystem",
      "the players",
      "منظومة",
      "all",
      "connected",
      "players"
    ]
  },
  {
    "c": "/architecture",
    "n": [
      "معمارية",
      "Architecture"
    ],
    "d": [
      "يصف بنية النظام ومكوناته",
      "Describes the system structure and its parts"
    ],
    "x": [
      "صمّم معمارية: ",
      "Design the architecture of: "
    ],
    "k": [
      "architecture",
      "system design",
      "معمارية",
      "تصميم النظام",
      "software",
      "system"
    ]
  },
  {
    "c": "/wireframe",
    "n": [
      "نموذج أولي",
      "Wireframe"
    ],
    "d": [
      "يرسم تخطيط الشاشة",
      "Sketches the screen layout"
    ],
    "x": [
      "ارسم نموذج الشاشة لـ: ",
      "Sketch the screen layout for: "
    ],
    "k": [
      "wireframe",
      "layout sketch",
      "نموذج أولي",
      "تخطيط",
      "website",
      "app",
      "layout"
    ]
  },
  {
    "c": "/mockup",
    "n": [
      "تصميم تجريبي",
      "Mockup"
    ],
    "d": [
      "يصف تصميمًا بصريًا واقعيًا",
      "Describes a realistic visual design"
    ],
    "x": [
      "صمّم نموذجًا بصريًا لـ: ",
      "Design a realistic mockup of: "
    ],
    "k": [
      "mockup",
      "realistic preview",
      "نموذج واقعي",
      "realistic",
      "product",
      "preview"
    ]
  },
  {
    "c": "/poster",
    "n": [
      "ملصق",
      "Poster"
    ],
    "d": [
      "يملأ تصميم ملصق",
      "Fills a poster layout with content"
    ],
    "x": [
      "صمّم ملصقًا عن: ",
      "Design a poster about: "
    ],
    "k": [
      "poster",
      "flyer",
      "ملصق",
      "إعلان مطبوع",
      "design"
    ]
  },
  {
    "c": "/cover",
    "n": [
      "غلاف",
      "Cover"
    ],
    "d": [
      "يصمم غلاف تقرير أو كتاب",
      "Designs a report or book cover"
    ],
    "x": [
      "صمّم غلافًا عن: ",
      "Design a cover for: "
    ],
    "k": [
      "cover",
      "book cover",
      "report cover",
      "غلاف",
      "book",
      "report"
    ]
  },
  {
    "c": "/infographic",
    "n": [
      "إنفوجرافيك",
      "Infographic"
    ],
    "d": [
      "يربط البيانات في صورة بصرية",
      "Turns the data into a visual picture"
    ],
    "x": [
      "حوّل البيانات التالية إلى إنفوجرافيك: ",
      "Turn the following data into an infographic: "
    ],
    "k": [
      "infographic",
      "visualise data",
      "إنفوجرافيك",
      "مخطط بيانات",
      "layout"
    ]
  },
  {
    "c": "/handwritten",
    "n": [
      "ملاحظات بخط اليد",
      "Handwritten notes"
    ],
    "d": [
      "ينسّق المحتوى كملاحظات بخط اليد",
      "Formats the content as handwritten notes"
    ],
    "x": [
      "نسّق ما يلي كملاحظات بخط اليد: ",
      "Format the following as handwritten notes: "
    ],
    "k": [
      "handwritten",
      "note style",
      "بخط اليد",
      "notebook-style",
      "notes"
    ]
  },
  {
    "c": "/storyboard",
    "n": [
      "ستوري بورد",
      "Storyboard"
    ],
    "d": [
      "يقسّم الفيديو إلى مشاهد",
      "Splits the video into scenes"
    ],
    "x": [
      "قسّم الفيديو التالي إلى مشاهد: ",
      "Split the following video into scenes: "
    ],
    "k": [
      "storyboard",
      "scenes",
      "ستوري بورد",
      "لوحة مشاهد",
      "scene-by-scene"
    ]
  },
  {
    "c": "/comic",
    "n": [
      "قصة مصورة",
      "Comic"
    ],
    "d": [
      "يشرح الموضوع عبر لوحات مصورة",
      "Explains the topic through comic panels"
    ],
    "x": [
      "اشرح الموضوع التالي عبر لوحات مصورة: ",
      "Explain the following through comic panels: "
    ],
    "k": [
      "comic",
      "panels",
      "قصة مصورة",
      "explain",
      "through"
    ]
  },
  {
    "c": "/carousel",
    "n": [
      "منشور متسلسل",
      "Carousel"
    ],
    "d": [
      "يبني منشورًا متعدد الصور",
      "Builds a multi-slide carousel post"
    ],
    "x": [
      "جهّز منشورًا متسلسلًا عن: ",
      "Prepare a carousel post about: "
    ],
    "k": [
      "carousel",
      "slides post",
      "منشور متسلسل",
      "instagram",
      "linkedin"
    ]
  },
  {
    "c": "/socialvisual",
    "n": [
      "منشور بصري",
      "Social visual"
    ],
    "d": [
      "يصمم منشورًا بصريًا للمنصات",
      "Designs a visual post for the social platforms"
    ],
    "x": [
      "صمّم منشورًا بصريًا عن: ",
      "Design a social visual about: "
    ],
    "k": [
      "socialvisual",
      "social post",
      "instagram graphic",
      "منشور بصري",
      "social",
      "media",
      "graphic"
    ]
  },
  {
    "c": "/adcreative",
    "n": [
      "فكرة إعلانية",
      "Ad concept"
    ],
    "d": [
      "يبدع فكرة إعلانية متكاملة",
      "Creates a complete advertising concept"
    ],
    "x": [
      "ابتكر فكرة إعلانية عن: ",
      "Create an advertising concept for: "
    ],
    "k": [
      "adcreative",
      "ad concept",
      "advertising idea",
      "فكرة إعلانية",
      "advertising",
      "concept"
    ]
  },
  {
    "c": "/thumbnail",
    "n": [
      "صورة مصغّرة",
      "Thumbnail"
    ],
    "d": [
      "يصمم صورة مصغّرة جذابة",
      "Designs an attractive thumbnail"
    ],
    "x": [
      "صمّم صورة مصغّرة عن: ",
      "Design a thumbnail for: "
    ],
    "k": [
      "thumbnail",
      "youtube thumb",
      "صورة مصغّرة",
      "youtube",
      "concept"
    ]
  },
  {
    "c": "/viralhook",
    "n": [
      "خطاف جنائي الانتشار",
      "Viral hook"
    ],
    "d": [
      "يكتب خطافًا يوقف التمرير",
      "Writes a scroll-stopping hook"
    ],
    "x": [
      "اكتب خطافًا يوقف التمرير عن: ",
      "Write a scroll-stopping hook for: "
    ],
    "k": [
      "viralhook",
      "scroll stopping",
      "viral hook",
      "خطاف",
      "جذب الانتباه",
      "scroll-stopping",
      "hook"
    ]
  },
  {
    "c": "/hook",
    "n": [
      "خطاف",
      "Hook"
    ],
    "d": [
      "يقترح عدة خطوط افتتاحية",
      "Suggests several opening lines"
    ],
    "x": [
      "اقترح خطوطًا افتتاحية قوية لـ: ",
      "Suggest strong opening lines for: "
    ],
    "k": [
      "hook",
      "opening line",
      "first line",
      "خطاف",
      "سطر افتتاحي",
      "opening",
      "lines"
    ]
  },
  {
    "c": "/retention",
    "n": [
      "إبقاء المشاهد",
      "Retention"
    ],
    "d": [
      "يحسّن لحظات إبقاء المشاهد",
      "Improves the moments that keep the audience"
    ],
    "x": [
      "حسّن لحظات إبقاء المشاهد في: ",
      "Improve the audience-retention moments in: "
    ],
    "k": [
      "retention",
      "keep the audience",
      "إبقاء المشاهد",
      "الاحتفاظ",
      "improve",
      "audience"
    ]
  },
  {
    "c": "/storytelling",
    "n": [
      "سرد قصصي",
      "Storytelling"
    ],
    "d": [
      "يبني قصة متكاملة بإيقاع",
      "Builds a complete story with rhythm"
    ],
    "x": [
      "اكتب قصة عن: ",
      "Write a story about: "
    ],
    "k": [
      "storytelling",
      "story",
      "narrative",
      "قصة",
      "سرد"
    ]
  },
  {
    "c": "/script",
    "n": [
      "سكربت",
      "Script"
    ],
    "d": [
      "يكتب سكربتًا كاملاً",
      "Writes a complete script"
    ],
    "x": [
      "اكتب سكربتًا عن: ",
      "Write a script about: "
    ],
    "k": [
      "script",
      "full script",
      "سكربت",
      "نص"
    ]
  },
  {
    "c": "/script30",
    "n": [
      "سكربت ٣٠ ثانية",
      "30-second script"
    ],
    "d": [
      "يكتب سكربتًا في نصف دقيقة",
      "Writes a script that fits in 30 seconds"
    ],
    "x": [
      "اكتب سكربتًا مدته ٣٠ ثانية عن: ",
      "Write a 30-second script about: "
    ],
    "k": [
      "script30",
      "30 second",
      "short script",
      "ثلاثين ثانية",
      "second",
      "script"
    ]
  },
  {
    "c": "/narration",
    "n": [
      "تعليق صوتي",
      "Narration"
    ],
    "d": [
      "يكتب نص تعليق صوتي",
      "Writes the voice-over text"
    ],
    "x": [
      "اكتب نص تعليق صوتي عن: ",
      "Write the voice-over text about: "
    ],
    "k": [
      "narration",
      "voice over",
      "تعليق صوتي",
      "script"
    ]
  },
  {
    "c": "/podcast",
    "n": [
      "حلقة بودكاست",
      "Podcast episode"
    ],
    "d": [
      "يبني حلقة بودكاست كاملة",
      "Builds a full podcast episode"
    ],
    "x": [
      "جهّز حلقة بودكاست عن: ",
      "Prepare a podcast episode about: "
    ],
    "k": [
      "podcast",
      "episode",
      "بودكاست",
      "حلقات",
      "outline"
    ]
  },
  {
    "c": "/youtube",
    "n": [
      "فيديو يوتيوب",
      "YouTube video"
    ],
    "d": [
      "يبني فيديو يوتيوب طويلًا",
      "Builds a long-form YouTube video"
    ],
    "x": [
      "اكتب سيناريو فيديو يوتيوب عن: ",
      "Write a YouTube video script about: "
    ],
    "k": [
      "youtube",
      "long form video",
      "يوتيوب",
      "long-form",
      "format"
    ]
  }
];

  const norm = s => String(s || '')
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ');

  /* the exact string to paste into the chosen AI program */
  function invocation(cmd, tool, lang) {
    const c = cmd.c;
    const t = TOOLS[tool] || TOOLS.chatgpt;
    if (t.slash) return c + ' ';
    return (lang === 1 ? cmd.x[1] : cmd.x[0]);
  }

  /* which commands fit the prompt the user is writing right now */
  function find(text, limit) {
    const t = norm(text);
    if (!t.trim()) return [];
    const out = [];
    for (const s of LIST) {
      let score = 0;
      for (const k of (s.k || [])) {
        const nk = norm(k);
        if (nk.length < 3) continue;
        if (t.includes(nk)) score += nk.length >= 7 ? 3 : 2;
      }
      if (score > 0) out.push({ id: s.c, score });
    }
    out.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    return out.slice(0, limit || 6);
  }

  const byId = {};
  LIST.forEach(s => { byId[s.c] = s; });

  return { list: LIST, tools: TOOLS, byId, invocation, find, norm };
})();
