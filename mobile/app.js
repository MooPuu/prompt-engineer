/* =========================================================================
   Prompt Engineer — Mobile app logic
   (i18n + prompt engine + UI). Engine functions are kept behaviour-identical
   to the desktop app so both produce the exact same prompt text.
   ========================================================================= */
const $ = id => document.getElementById(id);
let LANG = 'ar';
const t = k => (M[LANG] && M[LANG][k] !== undefined ? M[LANG][k] : (M.ar[k] !== undefined ? M.ar[k] : k));
const tx = x => (Array.isArray(x) ? x[(LANG === 'en' ? 1 : 0)] : x);

/* ================= i18n ================= */
const M = {
ar:{
'app.title':'مهندس البرومبت','app.sub':'برومبت مثالي في ثوانٍ',
'home.hello':'مرحبًا بك 👋','home.greet':'لنصنع برومبتًا مثاليًا',
'hero.quality':'تقييم جودة البرومبت',
'st.words':'كلمات','st.chars':'الأحرف','st.secs':'أقسام','st.tech':'مفاتيح تقنية',
'act.auto':'أكمل تلقائيًا','act.copy':'نسخ','act.download':'تحميل','act.clear':'مسح',
'sec.h':'حقول البرومبت',
'sec.task':'المهمة الأساسية','sec.task.d':'ماذا تريد من الذكاء الاصطناعي أن يفعل؟',
'sec.role':'الدور (Role)','sec.role.d':'من يتقمّص الشخصية؟',
'sec.context':'السياق والخلفية','sec.context.d':'معلومات تساعد على فهم الموقف',
'sec.audience':'الجمهور المستهدف','sec.audience.d':'من سيقرأ الناتج؟',
'sec.style':'النبرة والصيغة','sec.style.d':'أسلوب الإجابة وشكلها',
'sec.constraints':'القيود وما يجب تجنّبه','sec.constraints.d':'شروط يجب احترامها',
'sec.toggles':'مفاتيح التحسين','sec.toggles.d':'تقنيات هندسة البرومبت',
'sec.examples':'أمثلة مرجعية (Few-Shot)','sec.examples.d':'مثال واحد يضبط الأسلوب',
'lb.task':'اكتب مهمتك بوضوح','ph.task':'مثال: اكتب لي مقالًا كاملًا عن فوائد المشي اليومي…',
'hint.task':'💡 كلما كانت المهمة أدق، كانت النتيجة أقرب لما تتوقعه. تجنب «ساعدني في هذا».',
'lb.role':'الشخصية المهنية','ph.role':'مثال: خبير تسويق رقمي، مهندس برمجيات، مدرّس، محرر لغوي',
'lb.context':'سطر لكل نقطة','ph.context':'المشروع: متجر قهوة\nالجمهور: أعمار 25-40\nالمدة: 3 أيام',
'lb.audience':'وصف الجمهور','ph.audience':'مثال: طلاب جامعيات، مديرو تسويق، مبتدئون في البرمجة',
'lb.tone':'النبرة والأسلوب','lb.fmt':'صيغة التسليم','lb.length':'الطول المطلوب','lb.lang':'لغة الإجابة',
'opt.select':'— اختر —','opt.short':'قصير (100–150)','opt.medium':'متوسط (300–500)',
'opt.long':'طويل (600–1000)','opt.deep':'مفصّل وشامل',
'opt.ar':'العربية','opt.en':'English','opt.same':'نفس لغة الطلب',
'lb.constraints':'الشروط المطلوبة (سطر لكل متطلب)',
'ph.constraints':'استخدم مصادر موثوقة\nلا تتجاوز 5 عناوين فرعية\nأضف أمثلة واقعية',
'lb.avoid':'ما يجب تجنّبه','ph.avoid':'لا تستخدم مصطلحات معقّدة\nلا تختلق أرقامًا أو إحصاءات',
'tg.ask':'اسأل قبل البدء 🙋','tg.ask.d':'يطرح سؤالًا محددًا بدل التخمين.',
'tg.cot':'تفكير خطوة بخطوة 🧩','tg.cot.d':'يحلّل المهمة في مراحل قبل الإجابة.',
'tg.self':'مراجعة ذاتية ✅','tg.self.d':'يتحقق من المتطلبات قبل التسليم.',
'tg.direct':'إجابة مباشرة 🎯','tg.direct.d':'يبدأ بالقيمة فورًا بلا مقدمات.',
'tg.sources':'اذكر المصادر 📎','tg.sources.d':'روابط ومراجع للمعلومات غير الشائعة.',
'tg.alts':'2–3 بدائل ومقارنة 🧪','tg.alts.d':'خيارات مع مزايا وعيوب وتوصية.',
'tg.balanced':'وجهات نظر متوازنة ⚖️','tg.balanced.d':'الرأي المؤيد والمعارض ثم موقف محايد.',
'tg.simple':'بسّط اللغة (ELI5) 🧒','tg.simple.d':'شرح مفهوم للمبتدئ بلا تعقيد.',
'tg.plan':'خطة تنفيذ قابلة للقياس 🗓️','tg.plan.d':'خطوات بمواعيد ومعايير نجاح.',
'tg.few':'تفعيل الأمثلة 🎯','tg.few.d':'تعطي النموذج نموذجًا يقلّده.',
'lb.in1':'مثال 1 — المدخل','ph.in1':'السلعة: قهوة مختصة',
'lb.out1':'مثال 1 — المخرجات المتوقعة','ph.out1':'قهوة مختصة تُحمّص طازجة…',
'lb.in2':'مثال 2 — المدخل','ph.in2':'السلعة: ساعة ذكية',
'lb.out2':'مثال 2 — المخرجات المتوقعة','ph.out2':'ساعة ذكية تتابع صحتك…',
'pv.title':'📝 البرومبت الناتج','pv.copy':'نسخ البرومبت','pv.txt':'تحميل .txt',
'mode.text':'وضع نص','mode.img':'وضع صورة',
'preview.start':'ابدأ بكتابة المهمة… وسيظهر البرومبت الكامل هنا فورًا.',
'pre.task':'⚠️ (اكتب مهمتك أولاً)',
'q.title':'تقييم جودة البرومبت','q.score':'جاهزية','q.checks':'المعايير (12)','q.tap':'اضغط للانتقال',
'q.good':'ممتاز! برومبتك جاهز للاستخدام مباشرة.',
'q.mid':'جيد — أضف بضعة حقول لرفع الجودة.',
'q.low':'ابدأ بكتابة المهمة لرفع التقييم.',
'presets.h':'قوالب جاهزة','presets.sub':'اختر قالبًا ليتم تعبئة الحقول تلقائيًا، ثم عد لتبويب البناء لتعديل أي حقل.',
'img.h':'وضع توليد الصور',
'img.note':'اكتب وصف المشهد أسفله — أو استخدم مهمة تبويب البناء — ثم انسخ البرومبت الجاهز لـ Midjourney / DALL·E / Stable Diffusion.',
'lb.imgTask':'وصف المشهد','img.out':'🖼️ برومبت الصورة','img.start':'اكتب وصف المشهد… وسيظهر برومبت الصورة هنا.',
'lb.imgStyle':'الأسلوب الفني','lb.imgAr':'أبعاد الصورة',
'lb.imgArCustom':'أبعاد مخصصة (تتجاوز الاختيار)','ph.imgArCustom':'مثال: 7:5 أو 1920x1080',
'lb.imgNeg':'عناصر يجب تجنّبها','ph.imgNeg':'blurry, extra fingers, text, watermark, low quality',
'ai.title':'🤖 برامج مقترحة',
'ai.sub':'اضغط أي بطاقة لفتح الموقع الرسمي + البديل المجاني مفتوح المصدر.',
'ai.official':'🔗 الموقع الرسمي','ai.alt':'🔓 بديل مفتوح المصدر','ai.both':'فتح الاثنين',
'nav.build':'البناء','nav.quality':'الجودة','nav.presets':'القوالب','nav.image':'الصورة','nav.tools':'الأدوات',
'd.lang':'اللغة','d.links':'روابط','d.desktop':'نسخة الحاسوب','d.apk':'تحميل APK للأندرويد','d.star':'نجمة على GitHub',
'ft.note':'© Mahdi Kareem — جميع الحقوق محفوظة','ft.web':'الويب: moopuu.github.io/prompt-engineer',
'msg.copy':'تم نسخ البرومبت ✅','msg.dl':'تم تحميل الملف ⬇️','msg.clear':'تم مسح كل الحقول ↺',
'msg.auto':'تمت التعبئة التلقائية ✨','msg.preset':'تم تطبيق القالب: ','msg.lang':'تم تغيير اللغة 🌍',
'ask.reset':'مسح كل الحقول والبرومبت الحالي؟',
'tone.pro':'💼 احترافي','tone.friendly':'😊 ودّي','tone.edu':'🎓 تعليمي','tone.creative':'🎨 إبداعي',
'tone.concise':'⚡ مختصر','tone.sales':'📢 مقنع','tone.sci':'🔬 علمي','tone.academic':'🎓 أكاديمي',
'tone.witty':'🤣 ساخر ذكي','tone.motivate':'🔥 تحفيزي','tone.literary':'📖 أدبي شاعري','tone.convo':'💬 حواري مهذّب',
'tone.doc':'📋 توثيقي تقريري','tone.optimistic':'☀️ متفائل','tone.playful':'🎲 مرح وخفيف',
'tone.empathy':'💗 متعاطف','tone.bold':'🦁 جريء وحاسم',
'fmt.bullets':'نقاط','fmt.table':'جدول','fmt.code':'كود','fmt.para':'فقرات','fmt.img':'🖼️ صورة',
'fmt.html':'🌐 HTML','fmt.csv':'📄 CSV','fmt.sql':'🗃️ SQL','fmt.email':'✉️ إيميل','fmt.script':'🎬 سكربت',
'fmt.slides':'📽️ عرض تقديمي','fmt.pdf':'📕 تقرير PDF'
},
en:{
'app.title':'Prompt Engineer','app.sub':'A perfect prompt in seconds',
'home.hello':'Hello 👋','home.greet':"Let's craft a perfect prompt",
'hero.quality':'Prompt quality score',
'st.words':'Words','st.chars':'Chars','st.secs':'Sections','st.tech':'Tech keys',
'act.auto':'Auto-fill','act.copy':'Copy','act.download':'Download','act.clear':'Clear',
'sec.h':'Prompt fields',
'sec.task':'Main task','sec.task.d':'What should the AI actually do?',
'sec.role':'Role','sec.role.d':'Who plays the persona?',
'sec.context':'Context & background','sec.context.d':'Details that frame the situation',
'sec.audience':'Target audience','sec.audience.d':'Who will read the output?',
'sec.style':'Tone & format','sec.style.d':'How the answer sounds and looks',
'sec.constraints':'Constraints & avoid','sec.constraints.d':'Rules that must be respected',
'sec.toggles':'Enhancement switches','sec.toggles.d':'Prompt engineering techniques',
'sec.examples':'Few-shot examples','sec.examples.d':'One example locks the style',
'lb.task':'Describe your task clearly','ph.task':'e.g. Write a full article about the benefits of daily walking…',
'hint.task':'💡 The more precise the task, the closer the result. Avoid "help me with this".',
'lb.role':'Professional persona','ph.role':'e.g. digital marketing expert, software engineer, teacher…',
'lb.context':'One line per point','ph.context':'Project: coffee shop\nAudience: ages 25-40\nDeadline: 3 days',
'lb.audience':'Describe the audience','ph.audience':'e.g. university students, marketing managers, beginner devs',
'lb.tone':'Tone & style','lb.fmt':'Output format','lb.length':'Requested length','lb.lang':'Answer language',
'opt.select':'— Select —','opt.short':'Short (100–150)','opt.medium':'Medium (300–500)',
'opt.long':'Long (600–1000)','opt.deep':'Deep & comprehensive',
'opt.ar':'العربية','opt.en':'English','opt.same':'Same language as the task',
'lb.constraints':'Requirements (one per line)',
'ph.constraints':'Use reliable sources\nNo more than 5 subheadings\nAdd real examples',
'lb.avoid':'What to avoid','ph.avoid':'No complex jargon\nNever invent numbers or stats',
'tg.ask':'Ask before starting 🙋','tg.ask.d':'Raises one specific question instead of guessing.',
'tg.cot':'Step-by-step thinking 🧩','tg.cot.d':'Analyses the task in stages before answering.',
'tg.self':'Self-review ✅','tg.self.d':'Checks the requirements before delivering.',
'tg.direct':'Direct answer 🎯','tg.direct.d':'Starts with value, no preamble.',
'tg.sources':'Cite sources 📎','tg.sources.d':'Links & references for uncommon claims.',
'tg.alts':'2–3 alternatives 🧪','tg.alts.d':'Options with pros, cons and a recommendation.',
'tg.balanced':'Balanced views ⚖️','tg.balanced.d':'For and against, then a neutral position.',
'tg.simple':'Simplify (ELI5) 🧒','tg.simple.d':'Beginner-friendly explanation, no jargon.',
'tg.plan':'Measurable action plan 🗓️','tg.plan.d':'Steps with timing and success criteria.',
'tg.few':'Enable examples 🎯','tg.few.d':'Gives the model a pattern to imitate.',
'lb.in1':'Example 1 — Input','ph.in1':'Item: speciality coffee',
'lb.out1':'Example 1 — Expected output','ph.out1':'Freshly roasted speciality coffee…',
'lb.in2':'Example 2 — Input','ph.in2':'Item: smart watch',
'lb.out2':'Example 2 — Expected output','ph.out2':'A smart watch that tracks your health…',
'pv.title':'📝 Generated prompt','pv.copy':'Copy prompt','pv.txt':'Download .txt',
'mode.text':'Text mode','mode.img':'Image mode',
'preview.start':'Start writing your task… the full prompt will appear here instantly.',
'pre.task':'⚠️ (write your main task first)',
'q.title':'Prompt quality score','q.score':'readiness','q.checks':'Criteria (12)','q.tap':'Tap to jump',
'q.good':'Excellent — your prompt is ready to use as is.',
'q.mid':'Good — add a few fields to raise the quality.',
'q.low':'Start writing the task to raise the score.',
'presets.h':'Ready-made presets','presets.sub':'Pick a preset to fill the fields automatically, then return to the Build tab to adjust anything.',
'img.h':'Image generation mode',
'img.note':'Write the scene below — or reuse the task from the Build tab — then copy the ready prompt for Midjourney / DALL·E / Stable Diffusion.',
'lb.imgTask':'Scene description','img.out':'🖼️ Image prompt','img.start':'Write a scene… the image prompt will appear here.',
'lb.imgStyle':'Art style','lb.imgAr':'Image dimensions',
'lb.imgArCustom':'Custom dimensions (overrides the choice)','ph.imgArCustom':'e.g. 7:5 or 1920x1080',
'lb.imgNeg':'Elements to avoid','ph.imgNeg':'blurry, extra fingers, text, watermark, low quality',
'ai.title':'🤖 Recommended AI tools',
'ai.sub':'Tap any card to open the official site + the free open-source alternative.',
'ai.official':'🔗 Official site','ai.alt':'🔓 Open-source alternative','ai.both':'Open both',
'nav.build':'Build','nav.quality':'Quality','nav.presets':'Presets','nav.image':'Image','nav.tools':'Tools',
'd.lang':'Language','d.links':'Links','d.desktop':'Desktop version','d.apk':'Download Android APK','d.star':'Star on GitHub',
'ft.note':'© Mahdi Kareem — All rights reserved','ft.web':'Web: moopuu.github.io/prompt-engineer',
'msg.copy':'Prompt copied ✅','msg.dl':'File downloaded ⬇️','msg.clear':'All fields cleared ↺',
'msg.auto':'Auto-filled ✨','msg.preset':'Preset applied: ','msg.lang':'Language changed 🌍',
'ask.reset':'Clear all fields and the current prompt?',
'tone.pro':'💼 Professional','tone.friendly':'😊 Friendly','tone.edu':'🎓 Educational','tone.creative':'🎨 Creative',
'tone.concise':'⚡ Concise','tone.sales':'📢 Persuasive','tone.sci':'🔬 Scientific','tone.academic':'🎓 Academic',
'tone.witty':'🤣 Witty','tone.motivate':'🔥 Motivational','tone.literary':'📖 Literary','tone.convo':'💬 Conversational',
'tone.doc':'📄 Documentary','tone.optimistic':'☀️ Optimistic','tone.playful':'🎲 Playful',
'tone.empathy':'💗 Empathetic','tone.bold':'🦁 Bold',
'fmt.bullets':'Bullets','fmt.table':'Table','fmt.code':'Code','fmt.para':'Paragraphs','fmt.img':'🖼️ Image',
'fmt.html':'🌐 HTML','fmt.csv':'📄 CSV','fmt.sql':'🗃️ SQL','fmt.email':'✉️ Email','fmt.script':'🎬 Script',
'fmt.slides':'📽️ Slides','fmt.pdf':'📕 PDF report'
}
};

/* ================= State ================= */
const FLAGS = {ask:false, cot:false, self:false, few:false, img:false,
               direct:false, sources:false, alts:false, balanced:false, simple:false, plan:false};
let CURRENT='', CURRENT_IMG='';

/* ================= Image style / size data (same values as desktop) ================= */
const IMG_STYLES = [
 {n:['📷 تصوير','📷 Photography'], i:[
  ['photorealistic, ultra detailed, 8k, sharp focus','واقعي فوتوغرافي','Photorealistic'],
  ['portrait photography, 85mm lens, f/1.8, bokeh background, soft natural light','بورتريه احترافي','Portrait'],
  ['product photography, studio lighting, soft shadows, seamless background, commercial','تصوير منتجات','Product shot'],
  ['cinematic shot, dramatic lighting, film still, anamorphic lens flare, color graded','لقطة سينمائية','Cinematic'],
  ['aerial drone photography, top-down view, golden hour, high detail','لقطة جوية درون','Aerial drone'],
  ['vintage 1970s film photo, kodak portra 400, film grain, warm tones','طابع فيلم قديم','Vintage film'],
  ['national geographic style wildlife photography, natural light, long lens','تصوير طبيعة وحياة برية','Wildlife'],
  ['street photography, candid moment, urban, natural light, 35mm','تصوير شارع واقعي','Street photo'],
  ['macro photography, extreme close-up, tiny details, shallow depth of field, dew drops','تصوير ماكرو (تقريب عالي)','Macro'],
  ['long exposure, silky water, light trails, night city, tripod, dreamy motion','تعريض طويل (مسارات ضوئية)','Long exposure'],
  ['black and white photography, high contrast monochrome, dramatic shadows, timeless','أبيض وأسود درامي','Black & white'],
  ['food photography, overhead flat lay, appetizing styling, natural window light','تصوير طعام شهي','Food photography'],
  ['underwater photography, caustic light, blue tones, wide angle, marine life','تصوير تحت الماء','Underwater']]},
 {n:['🖌️ فنون','🖌️ Fine art'], i:[
  ['oil painting, visible brush strokes, canvas texture, classical','لوحة زيتية','Oil painting'],
  ['watercolor painting, soft edges, paper texture, gentle washes','ألوان مائية','Watercolor'],
  ['ink drawing, cross-hatching, high contrast black and white, sketchbook','رسم بالحبر','Ink drawing'],
  ['epic fantasy art, concept art, artstation trending, highly detailed','فن فانتازي ملحمي','Fantasy art'],
  ['manga style, black and white, screentone, dynamic lines','مانغا أبيض وأسود','Manga'],
  ['impressionist painting, soft light, loose brushwork, pastel palette','انطباعية (Impressionism)','Impressionist'],
  ['surrealist painting, dreamlike scene, melting shapes, symbolic, Salvador Dali mood','سريالية حالمية (Surrealism)','Surrealist'],
  ['pop art, bold outlines, halftone dots, vivid primary colors, Andy Warhol style','فن البوب (Pop Art)','Pop art'],
  ['ukiyo-e japanese woodblock print, flat colors, flowing waves, elegant linework','الأوكييو-ي الياباني (Ukiyo-e)','Ukiyo-e'],
  ['charcoal drawing, soft shading, textured paper, expressive strokes','رسم بالفحم','Charcoal'],
  ['street graffiti, spray paint, vibrant mural, bold lettering, urban wall','جرافيتي جداري','Graffiti']]},
 {n:['💻 رقمي وتصيير','💻 Digital & 3D'], i:[
  ['digital illustration, vibrant colors, clean shapes, modern','رسم رقمي','Digital illustration'],
  ['3D render, octane render, cinematic lighting, physically based materials','ثلاثي الأبعاد (3D)','3D render'],
  ['anime style, clean line art, cel shading, studio quality','أنمي','Anime'],
  ['pixar style 3D character, expressive, soft global illumination','أسلوب بيكسار ثلاثي الأبعاد','Pixar style'],
  ['pixel art, 16-bit retro game style, vibrant palette, crisp pixels','بكسل آرت (8/16-bit)','Pixel art'],
  ['cyberpunk, neon lights, futuristic city, rain, night, high contrast','سايبربانك','Cyberpunk'],
  ['bauhaus, bold geometric shapes, flat vector poster, limited palette','بوسترات باوهاوس','Bauhaus'],
  ['isometric 3d render, clean design, soft ambient occlusion, pastel colors','ثلاثي الأبعاد أيزومتري','Isometric 3D'],
  ['minimalist, flat design, vector illustration, simple shapes','مينيمال فلات','Minimal flat'],
  ['low poly, faceted, geometric, soft gradients, modern','لو بولي (Low Poly)','Low poly'],
  ['claymation, stop motion, clay texture, playful, soft studio light','ستوب موشن صيني (Clay)','Claymation'],
  ['vaporwave, retro grid horizon, pastel pink and teal, 80s synthwave aesthetic','ريتروويڤ/بيبور (Vaporwave)','Vaporwave'],
  ['glitch art, chromatic aberration, datamosh, distorted pixels, digital error','جلتش آرت (Glitch)','Glitch art'],
  ['voxel art, blocky 3d cubes, minecraft-like, clean isometric pixels','فوكسل آرت (Voxel)','Voxel art'],
  ['layered papercraft, cut paper art, soft drop shadows, craft texture, pastel layers','فن الورق المقصوص (Papercraft)','Papercraft'],
  ['holographic iridescent gradients, chrome reflections, glossy futuristic surfaces','هولوغرامي/كروم','Holographic']]},
 {n:['🎨 رسوميات وتصميم','🎨 Graphics & design'], i:[
  ['minimal logo design, vector, symmetrical mark, clean geometry, white background','تصميم شعار (Logo)','Logo design'],
  ['clean infographic, flat icons, data visualization, organized layout, brand colors','إنفوجرافيك منظم','Infographic'],
  ['comic book panel, bold ink outlines, ben-day dots, dynamic action, vibrant colors','قصص مصورة (كوميكس)','Comic panel'],
  ['single line art, continuous line drawing, elegant minimal, negative space','رسم بخط واحد (Line Art)','Line art'],
  ['art deco, geometric ornaments, gold and black palette, luxurious symmetry','أرت ديكو (Art Deco)','Art deco'],
  ['retro travel poster, screen print texture, limited palette, bold typography shapes','بوستر سفر ريترو','Retro poster']]}
];
const IMG_SIZES = [
 {n:['🖥️ أفقي','🖥️ Landscape'], i:[
  ['21:9','21:9 — ألترا واسع سينمائي','21:9 — Ultra-wide cinematic'],
  ['16:9','16:9 — عريض (يوتيوب/شاشة)','16:9 — Widescreen'],
  ['16:10','16:10 — خلفية سطح مكتب','16:10 — Desktop wallpaper'],
  ['3:1','3:1 — بانر ويب عريض','3:1 — Wide web banner'],
  ['2:1','2:1 — بانوراما','2:1 — Panorama'],
  ['3:2','3:2 — صورة كلاسيكية','3:2 — Classic photo'],
  ['4:3','4:3 — شاشة كلاسيكية','4:3 — Classic screen'],
  ['5:4','5:4 — شبه مربع عريض','5:4 — Wide squarish'],
  ['2.4:1','2.4:1 — أنامور픽 سينمائي','2.4:1 — Anamorphic'],
  ['1.91:1','1.91:1 — صورة مشاركة رابط (OG)','1.91:1 — Link preview (OG)'],
  ['5:3','5:3 — عريض معتدل','5:3 — Moderate wide'],
  ['14:9','14:9 — عريض متعدد الشاشات','14:9 — Multi-screen wide'],
  ['17:9','17:9 — DCI سينمائي','17:9 — DCI cinematic']]},
 {n:['📱 مربع وعمودي','📱 Square & portrait'], i:[
  ['1:1','1:1 — مربع (إنستغرام)','1:1 — Square (Instagram)'],
  ['4:5','4:5 — بوست سوشيال ميديا','4:5 — Social post'],
  ['3:4','3:4 — بورتريه رأسي','3:4 — Portrait'],
  ['2:3','2:3 — بوستر رأسي','2:3 — Vertical poster'],
  ['9:16','9:16 — ستوري/ريلز/تيك توك','9:16 — Story / Reels / TikTok'],
  ['5:6','5:6 — بوست عمودي مضغوط','5:6 — Compact vertical'],
  ['7:10','7:10 — غلاف كتاب/مانغا','7:10 — Book / manga cover'],
  ['1:2','1:2 — عمودي طويل (إنفوجرافيك)','1:2 — Tall vertical']]},
 {n:['📐 مقاسات بكسل','📐 Exact pixels'], i:[
  ['1080x1080','1080×1080 — بوست مربع HD','1080×1080 — HD square'],
  ['1080x1350','1080×1350 — بوست 4:5 رأسي','1080×1350 — 4:5 portrait post'],
  ['1080x1920','1080×1920 — ستوري Full HD','1080×1920 — Full HD story'],
  ['1920x1080','1920×1080 — Full HD أفقي','1920×1080 — Full HD landscape'],
  ['3840x2160','3840×2160 — 4K Ultra HD','3840×2160 — 4K Ultra HD'],
  ['1200x630','1200×630 — صورة مشاركة رابط','1200×630 — Link preview'],
  ['2480x3508','2480×3508 — A4 للطباعة (300DPI)','2480×3508 — A4 print (300 DPI)']]}
];

/* ================= Engine (identical output to desktop) ================= */
function lines(s){ return s.split('\n').map(x=>x.trim()).filter(Boolean); }
function bullets(arr,mark){ return arr.map(x=>(mark||'- ')+x).join('\n'); }
function getChips(boxId){ return Array.prototype.map.call(document.querySelectorAll('#'+boxId+' input:checked'), i=>i.value); }
function setChips(boxId,vals){ document.querySelectorAll('#'+boxId+' input').forEach(inp=>{ inp.checked = vals.indexOf(inp.value)>=0; }); }
function setFlag(k,v){
  FLAGS[k]=v;
  document.querySelectorAll('.tg[data-tg="'+k+'"]').forEach(el=>el.classList.toggle('on',v));
}
function readV(){
  return {
    task:$('task').value.trim(), role:$('role').value.trim(), context:$('context').value.trim(),
    audience:$('audience').value.trim(), constraints:$('constraints').value.trim(), avoid:$('avoid').value.trim(),
    length:$('length').value, lang:$('lang').value,
    tone:getChips('toneChips'), fmt:getChips('fmtChips'),
    in1:$('in1').value.trim(), out1:$('out1').value.trim(), in2:$('in2').value.trim(), out2:$('out2').value.trim()
  };
}
function sizeLine(val){
  const v=(val||'').trim() || '16:9';
  const m=v.match(/^(\d+)\s*[x×]\s*(\d+)$/i);
  if(m){
    const w=+m[1], h=+m[2];
    const gcd=(a,b)=> b?gcd(b,a%b):a;
    const d=gcd(w,h);
    return '- resolution: '+w+'x'+h+' px  ·  aspect ratio: --ar '+(w/d)+':'+(h/d);
  }
  return '- aspect ratio: --ar '+v;
}
function buildImage(v){
  const s=[];
  s.push('# AI IMAGE PROMPT');
  if(v.role) s.push('Art direction level: '+v.role+'.');
  s.push('\n## SUBJECT / وصف المشهد');
  s.push(v.task||t('pre.task'));
  if(v.context){ s.push('\n## CONTEXT / السياق'); s.push(bullets(lines(v.context))); }
  if(v.audience){ s.push('\n## AUDIENCE / من تُعرض الصورة'); s.push(v.audience); }
  s.push('\n## STYLE & TECHNICAL / الأسلوب والتقنيات');
  s.push('- '+$('imgStyle').value);
  s.push('- professional composition, balanced framing, high detail, coherent lighting');
  if(v.tone.length) s.push('- mood/atmosphere: '+v.tone.map(k=>TONE[k]?TONE[k][1]:k).join(', '));
  const arCustom = ($('imgArCustom').value||'').trim();
  s.push(sizeLine(arCustom || $('imgAr').value));
  s.push('- quality: high detail, sharp focus, no artifacts');
  s.push('\n## NEGATIVE PROMPT / ما يجب ألا يظهر في الصورة');
  s.push($('imgNeg').value.trim() || 'blurry, extra limbs, distorted hands, text, watermark, low quality, jpeg artifacts');
  if(v.avoid){ s.push('\n## EXCLUDE / ممنوع أن يظهر'); s.push(bullets(lines(v.avoid).map(x=>'✗ '+x))); }
  s.push('\n## INSTRUCTIONS');
  s.push('1. Generate a single image that matches SUBJECT and STYLE exactly.');
  s.push('2. Keep one clear focal point and a clean, balanced composition.');
  s.push('3. If any part of the description is written in Arabic, translate it into precise English visual terms first, then generate.');
  s.push('4. Never render any text, letters or watermarks inside the image.');
  return s.join('\n');
}
function buildText(v){
  const en = v.lang==='en';
  const H = (ar,x)=> '## '+(en?x:ar);
  const i = en?1:0;
  const s=[];
  s.push(H('الدور','ROLE'));
  s.push((v.role || (en?'You are a highly skilled expert assistant':'أنت مساعد ذكي وخبير محترف في مهمتك'))+'.');
  s.push(en ? 'Approach every task with accuracy, structure and professional rigor.'
            : 'تعامل مع كل مهمة بدقة، ومنهجية، ومهنية عالية.');
  s.push('\n'+H('المهمة','TASK'));
  s.push(v.task || t('pre.task'));
  if(v.context){ s.push('\n'+H('السياق والخلفية','CONTEXT')); s.push(bullets(lines(v.context))); }
  if(v.audience){
    s.push('\n'+H('الجمهور المستهدف','AUDIENCE'));
    s.push(en? 'Write for this audience: '+v.audience+'.' : 'قدّم الإجابة بهذا الجمهور في بالك: '+v.audience+'.');
  }
  const req=[];
  if(v.fmt.length) req.push(en? 'Format: '+v.fmt.map(k=>FMT[k]?FMT[k][1]:k).join(' + ')
                              : 'الصيغة: '+v.fmt.map(k=>FMT[k]?FMT[k][0]:k).join(' + '));
  if(v.length) req.push(en? 'Length: '+LEN_EN[v.length] : 'الطول: '+LEN_AR[v.length]);
  req.push(en? 'Language: English'
            : (v.lang==='ar'?'لغة الإجابة: العربية الفصحى المبسّطة':'لغة الإجابة: نفس لغة المهمة المكتوبة'));
  s.push('\n'+H('متطلبات الإخراج','OUTPUT REQUIREMENTS'));
  s.push(bullets(req));
  if(v.tone.length){
    s.push('\n'+H('النبرة والأسلوب','TONE'));
    s.push('- '+v.tone.map(k=>TONE[k]?TONE[k][i]:k).join('\n- '));
  }
  if(v.constraints){
    s.push('\n'+H('القيود والمتطلبات','CONSTRAINTS'));
    s.push(lines(v.constraints).map((x,n)=>(n+1)+'. '+x).join('\n'));
  }
  if(v.avoid){ s.push('\n'+H('ما يجب تجنّبه','DO NOT')); s.push(bullets(lines(v.avoid).map(x=>'✗ '+x))); }
  const method=[];
  if(FLAGS.cot){
    method.push(en
      ? 'Analyze the task step by step before writing the final answer: show a short analysis separated by a divider, then give the final answer separately.'
      : 'حلّل المهمة خطوة بخطوة قبل كتابة الناتج النهائي: اعرض التحليل باختصار في فاصل، ثم قدّم الإجابة النهائية منفصلة عنه.');
  }
  if(FLAGS.ask){
    method.push(en
      ? 'If any necessary information is missing, ask one specific, clear question instead of guessing, then wait for my answer before continuing.'
      : 'إذا كانت أي معلومة ضرورية ناقصة، اطرح سؤالًا واحدًا محددًا وواضحًا بدل التخمين، ثم انتظر الرد قبل المتابعة.');
  }
  if(v.in1||v.out1){
    method.push(en ? 'Follow the style and level of detail shown in the examples below in every output.'
                   : 'التزم بأسلوب الأمثلة المرفقة أدناه في كل ناتج تقدّمه.');
  }
  if(FLAGS.direct){
    method.push(en ? 'Start with the actual answer immediately — no greetings, no "Sure!", no repeated summary.'
                   : 'ابدأ مباشرة بالإجابة الفعلية — بلا تحيات، بلا "بالتأكيد!"، وبلا ملخص مكرر.');
  }
  if(FLAGS.sources){
    method.push(en ? 'Cite sources or references for non-obvious claims, and clearly mark anything that is an assumption.'
                   : 'اذكر المصادر أو المراجع للمعلومات غير الشائعة، ووضّح بوضوح أي معلومة هي افتراض.');
  }
  if(FLAGS.alts){
    method.push(en ? 'Provide 2 to 3 alternatives in a comparison table (pros / cons) and end with your recommended option.'
                   : 'قدّم من 2 إلى 3 بدائل في جدول مقارنة (المزايا / العيوب) واختم بخياراتك الموصى بها.');
  }
  if(FLAGS.balanced){
    method.push(en ? 'Present the supporting view and the opposing view before concluding with a balanced position.'
                   : 'اعرض الحجة المؤيدة والحجة المعارضة قبل أن تستنتج موقفًا محايدًا ومتوازنًا.');
  }
  if(FLAGS.simple){
    method.push(en ? 'Simplify the language for a beginner: short sentences, no jargon, explain any term at first use.'
                   : 'بسّط اللغة لمستوى المبتدئ: جمل قصيرة، بلا مصطلحات معقدة، واشرح كل مصطلح عند أول ظهور له.');
  }
  if(FLAGS.plan){
    method.push(en ? 'End with a numbered action plan: step, duration, owner and a clear success criterion for each.'
                   : 'اختم بخطة تنفيذ مرقّمة: الخطوة، المدة، المسؤول، ومعيار نجاح واضح لكل خطوة.');
  }
  if(method.length){
    s.push('\n'+H('طريقة العمل','METHOD'));
    s.push(method.map((x,n)=>(n+1)+'. '+x).join('\n'));
  }
  if(FLAGS.few && (v.in1||v.out1||v.in2||v.out2)){
    s.push('\n'+H('أمثلة مرجعية','FEW-SHOT EXAMPLES'));
    let n=1;
    if(v.in1||v.out1){ s.push('\n'+(en?'### Example ':'### المثال ')+n+'\n'+(en?'Input':'المدخل')+':\n'+(v.in1||'—')+'\n'+(en?'Expected output':'المخرجات المتوقعة')+':\n'+(v.out1||'—')); n++; }
    if(v.in2||v.out2){ s.push('\n'+(en?'### Example ':'### المثال ')+n+'\n'+(en?'Input':'المدخل')+':\n'+(v.in2||'—')+'\n'+(en?'Expected output':'المخرجات المتوقعة')+':\n'+(v.out2||'—')); }
  }
  s.push('\n'+H('معايير النجاح','SUCCESS CRITERIA'));
  s.push(bullets(en? [
    '✅ The task is fully completed with nothing omitted.',
    '✅ Accuracy: no invented facts, no unsupported claims.',
    '✅ Every constraint and output requirement above is respected.',
    '✅ Clarity: short sentences, logical structure, zero filler.',
    '✅ Ready to use directly on the first attempt.'
  ] : [
    '✅ تحقيق المهمة المطلوبة بالكامل دون حذف جزء منها.',
    '✅ الدقة: لا معلومات مخترعة ولا اجتهادات بلا أساس.',
    '✅ الالتزام بكل القيود ومتطلبات الإخراج أعلاه.',
    '✅ الوضوح: جمل قصيرة، تنظيم منطقي، بلا حشو أو كلام عام.',
    '✅ جاهزية مباشرة للاستخدام من أول محاولة.'
  ]));
  const fin=[];
  if(FLAGS.self){
    fin.push(en
      ? 'Before delivering the final result, review your own work and verify that every requirement above is met, fix any error or contradiction, then output only the final version.'
      : 'قبل تقديم النتيجة النهائية: راجع عملك بنفسك وتأكد أن جميع متطلباتي مستوفاة، وصحّح أي خطأ أو تعارض، ثم قدّم النسخة النهائية فقط.');
  }
  fin.push(en ? 'Deliver the result in a single complete message, well organized and ready to use.'
              : 'قدّم النتيجة في رسالة واحدة مكتملة، منظّمة، وجاهزة للاستخدام مباشرة.');
  fin.push(en? 'Start now.' : 'ابدأ الآن.');
  s.push('\n'+H('تعليمات أخيرة','FINAL INSTRUCTIONS'));
  s.push(fin.map((x,n)=>(n+1)+'. '+x).join('\n'));
  return s.join('\n');
}

/* ================= Render ================= */
function render(){
  const v=readV();
  CURRENT = buildText(v);
  const empty = !v.task && !v.role && !v.context && !v.audience && !v.constraints && !v.avoid &&
                !v.tone.length && !v.fmt.length && !v.length && !FLAGS.few;
  $('preview').textContent = empty ? t('preview.start') : CURRENT;
  $('preview').style.direction = (v.lang==='en' ? 'ltr' : 'rtl');
  const words = CURRENT.split(/\s+/).filter(Boolean).length;
  $('stWords').textContent = words;
  $('stChars').textContent = CURRENT.length;
  $('stSecs').textContent = (CURRENT.match(/^## /gm)||[]).length;

  /* image prompt (always available on its tab) */
  CURRENT_IMG = buildImage(v);
  $('imgPrev').textContent = v.task ? CURRENT_IMG : t('img.start');
  $('imgPrev').style.direction = 'ltr';

  /* hero card */
  const activeFlags = Object.keys(FLAGS).filter(k=>k!=='img' && FLAGS[k]).length;
  const tech = activeFlags + (v.tone.length?1:0) + (v.constraints?1:0);
  $('heroWords').textContent = words;
  $('heroSecs').textContent = (CURRENT.match(/^## /gm)||[]).length;
  $('heroTech').textContent = tech+'/12';

  updateDone(v);
  score(v);
}
function updateDone(v){
  const set=(id,on)=>{ const el=$(id); if(el) el.classList.toggle('on',!!on); };
  set('d-task', v.task.length>0);
  set('d-role', v.role.length>3);
  set('d-context', v.context.length>5);
  set('d-audience', v.audience.length>3);
  set('d-style', v.tone.length>0 || v.fmt.length>0 || v.length!=='');
  set('d-constraints', v.constraints.length>5 || v.avoid.length>5);
  set('d-toggles', Object.keys(FLAGS).filter(k=>k!=='img' && k!=='few' && FLAGS[k]).length>0);
  set('d-examples', FLAGS.few && !!(v.in1||v.out1));
  const filled = [v.task.length>0, v.role.length>0, v.context.length>0, v.audience.length>0,
                  v.tone.length>0, v.fmt.length>0, v.constraints.length>0, v.avoid.length>0]
                 .filter(Boolean).length;
  $('fillCount').textContent = filled+'/8';
}

/* ================= Quality score ================= */
const CHECKS=[
  {w:20,t:['المهمة محددة وواضحة','Task is specific & clear'],d:['اكتب جملة تصف النتيجة المطلوبة بدقة','Describe the desired result in one precise sentence'],ok:v=>v.task.length>=20,f:'task'},
  {w:12,t:['الدور مُعرَّف','Role defined'],d:['منح الشخصية يرفع عمق الإجابة','A persona makes the answer deeper'],ok:v=>v.role.length>3,f:'role'},
  {w:10,t:['سياق وخلفية','Context & background'],d:['معلومات عن المشروع/الموقف','Details about the project / situation'],ok:v=>v.context.length>5,f:'context'},
  {w:8,t:['جمهور مستهدف','Target audience'],d:['من سيقرأ الناتج؟','Who will read the output?'],ok:v=>v.audience.length>3,f:'audience'},
  {w:10,t:['صيغة التسليم','Output format'],d:['نقاط، جدول، JSON، Markdown…','Bullets, table, JSON, Markdown…'],ok:v=>v.fmt.length>0,f:'fmtChips'},
  {w:8,t:['الطول محدّد','Length defined'],d:['حدد حجم الإجابة المتوقع','Set the expected answer size'],ok:v=>v.length!=='',f:'length'},
  {w:8,t:['النبرة والأسلوب','Tone & style'],d:['اختر نبرة واحدة على الأقل','Pick at least one tone'],ok:v=>v.tone.length>0,f:'toneChips'},
  {w:10,t:['قيود ومتطلبات','Constraints'],d:['سطر لكل متطلب','One line per requirement'],ok:v=>v.constraints.length>5,f:'constraints'},
  {w:5,t:['ما يجب تجنّبه','Things to avoid'],d:['حدّد الأخطاء التي لا تريدها','List the mistakes you do not want'],ok:v=>v.avoid.length>5,f:'avoid'},
  {w:5,t:['تفكير خطوة بخطوة','Step-by-step reasoning'],d:['مفيد للمهام المعقدة','Helpful for complex tasks'],ok:()=>FLAGS.cot,f:'cot'},
  {w:4,t:['مراجعة ذاتية','Self-review'],d:['يتحقق من الناتج قبل التسليم','Checks the output before delivery'],ok:()=>FLAGS.self,f:'self'},
  {w:10,t:['أمثلة مرجعية','Few-shot examples'],d:['مثال واحد يضبط الأسلوب','One example locks the style'],ok:v=>FLAGS.few&&(v.in1||v.out1),f:'few'}
];
function score(v){
  const box=$('checks'); box.innerHTML='';
  let got=0,total=0;
  CHECKS.forEach(c=>{
    total+=c.w; const pass=c.ok(v); if(pass) got+=c.w;
    const d=document.createElement('div');
    d.className='chk'+(pass?' done':'');
    d.innerHTML='<span class="ic">'+(pass?'✓':'○')+'</span><div><div class="t">'+tx(c.t)+'</div>'+(pass?'':'<div class="d">'+tx(c.d)+'</div>')+'</div>';
    d.onclick=()=>focusField(c.f);
    box.appendChild(d);
  });
  const p=Math.round(got/total*100);
  const col = p>=80?'#16a34a':p>=50?'#f59e0b':'#f4566f';
  $('ring').style.background='conic-gradient('+col+' '+p+'%, #edf0fa 0)';
  $('score').textContent=p+'%';
  $('heroScore').textContent=p+'%';
  $('heroBar').style.width=p+'%';
  $('scoreTip').textContent = p>=80 ? t('q.good') : (p>=50 ? t('q.mid') : t('q.low'));
}
function focusField(f){
  const tgEl = document.querySelector('.tg[data-tg="'+f+'"]');
  if(tgEl){ jumpTo(tgEl); return; }
  let el=null;
  if(f==='fmtChips'||f==='toneChips') el=document.querySelector('#'+f+' input');
  else el=$(f);
  if(el) jumpTo(el);
}
function jumpTo(el){
  goTab('m-home');
  const card = el.closest('.scard');
  if(card) card.classList.add('open');
  requestAnimationFrame(()=>{
    el.scrollIntoView({behavior:'smooth', block:'center'});
    const target = card || el;
    target.style.transition='box-shadow .3s';
    target.style.boxShadow='0 0 0 3px rgba(61,99,245,.45)';
    setTimeout(()=>{ target.style.boxShadow=''; }, 1100);
  });
}

/* ================= UI helpers ================= */
function toast(msg){
  const el=$('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(window.__tt); window.__tt=setTimeout(()=>el.classList.remove('show'), 2200);
}
function copy(text){
  const done=()=>toast(t('msg.copy'));
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text,done));
  } else fallbackCopy(text,done);
}
function fallbackCopy(text,cb){
  const ta=document.createElement('textarea'); ta.value=text;
  ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta);
  ta.select(); try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta); cb();
}
function download(name,content){
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(a.href),1500);
  toast(t('msg.dl'));
}
function openLink(u){
  const a=document.createElement('a'); a.href=u; a.target='_blank'; a.rel='noopener';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

/* ================= Tabs / drawer / accordion ================= */
function goTab(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active', p.id===id));
  document.querySelectorAll('#bnav button').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  window.scrollTo({top:0, behavior:'smooth'});
}
function closeDrawer(){ $('drawer').classList.remove('open'); $('scrim').classList.remove('open'); }
function openDrawer(){ $('drawer').classList.add('open'); $('scrim').classList.add('open'); }

/* ================= Presets ================= */
function renderPresets(){
  const box=$('presets'); box.innerHTML='';
  PRESETS.forEach((p,i)=>{
    const b=document.createElement('button');
    b.className='pcard'; b.type='button'; b.dataset.i=i;
    b.innerHTML='<b></b>'; b.querySelector('b').textContent=tx(p.name);
    b.onclick=()=>applyPreset(i);
    box.appendChild(b);
  });
}
function applyPreset(i){
  const s=PRESETS[i].set;
  if(s.role!==undefined) $('role').value=tx(s.role);
  if(s.audience!==undefined) $('audience').value=tx(s.audience);
  if(s.tone!==undefined) setChips('toneChips',s.tone);
  if(s.fmt!==undefined) setChips('fmtChips',s.fmt);
  if(s.length!==undefined) $('length').value=s.length;
  if(s.constraints!==undefined) $('constraints').value=tx(s.constraints);
  if(s.avoid!==undefined) $('avoid').value=tx(s.avoid);
  if(s.flags) Object.keys(s.flags).forEach(k=>setFlag(k,s.flags[k]));
  render();
  toast(t('msg.preset')+tx(PRESETS[i].name));
  goTab('m-home');
}

/* ================= AI tools ================= */
function renderAi(){
  const grid=$('aiGrid'); grid.innerHTML='';
  AI_TOOLS.forEach(tool=>{
    const card=document.createElement('div');
    card.className='ai-card';
    const off=tx(tool.n), oss=tx(tool.an);
    card.innerHTML =
      '<div class="ai-top"><span class="ai-ic">'+tool.e+'</span><b>'+off+'</b></div>'+
      '<div class="ai-d">'+tx(tool.d)+'</div>'+
      '<div class="ai-links">'+
        '<a class="off" href="'+tool.u+'" target="_blank" rel="noopener">'+t('ai.official')+'</a>'+
        '<a class="oss" href="'+tool.au+'" target="_blank" rel="noopener">'+t('ai.alt')+'</a>'+
        '<button class="both" type="button">'+t('ai.both')+'</button>'+
      '</div>';
    card.querySelector('.both').onclick=()=>{ openLink(tool.u); setTimeout(()=>openLink(tool.au), 350); };
    card.style.cursor='pointer';
    card.onclick=(e)=>{ if(e.target.closest('a')||e.target.closest('button')) return;
                        openLink(tool.u); setTimeout(()=>openLink(tool.au), 350); };
    grid.appendChild(card);
  });
}

/* ================= Image selects ================= */
function buildImgSelects(){
  const st=$('imgStyle'), ar=$('imgAr');
  const prevStyle=st.value, prevAr=ar.value;
  st.innerHTML=''; ar.innerHTML='';
  IMG_STYLES.forEach(g=>{
    const og=document.createElement('optgroup'); og.label=tx(g.n);
    g.i.forEach(it=>{ const o=document.createElement('option'); o.value=it[0]; o.textContent=tx(it.slice(1)); og.appendChild(o); });
    st.appendChild(og);
  });
  IMG_SIZES.forEach(g=>{
    const og=document.createElement('optgroup'); og.label=tx(g.n);
    g.i.forEach(it=>{ const o=document.createElement('option'); o.value=it[0]; o.textContent=tx(it.slice(1)); og.appendChild(o); });
    ar.appendChild(og);
  });
  if(prevStyle) st.value=prevStyle;
  if(prevAr) ar.value=prevAr;
}

/* ================= i18n ================= */
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(e=>{ e.textContent=t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(e=>{ e.placeholder=t(e.dataset.i18nPh); });
  document.documentElement.lang=LANG;
  document.documentElement.dir=(LANG==='en'?'ltr':'rtl');
  document.title = LANG==='en'
    ? 'Prompt Engineer — Mobile'
    : 'مهندس البرومبت — واجهة الهاتف';
}
function setLang(lg, silent){
  if(lg!=='ar' && lg!=='en') lg='ar';
  LANG=lg;
  try{ localStorage.setItem('pe_lang', lg); }catch(e){}
  document.querySelectorAll('.lang-seg button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lg));
  applyI18n();
  buildImgSelects();
  renderPresets(); renderAi(); render();
  if(!silent) toast(t('msg.lang'));
}

/* ================= Actions ================= */
function wire(){
  document.querySelectorAll('.tg').forEach(el=>{
    el.addEventListener('click',()=>{ const k=el.dataset.tg; setFlag(k,!FLAGS[k]); render(); });
  });
  document.querySelectorAll('.panel input,.panel textarea,.panel select').forEach(el=>{
    el.addEventListener('input',render); el.addEventListener('change',render);
  });
  /* scene sync between Build tab and Image tab */
  $('task').addEventListener('input',()=>{ $('imgTask').value=$('task').value; });
  $('imgTask').addEventListener('input',()=>{ $('task').value=$('imgTask').value; });

  /* accordion */
  document.querySelectorAll('.scard .s-head').forEach(h=>{
    h.addEventListener('click',()=>h.parentElement.classList.toggle('open'));
  });

  /* bottom nav */
  document.querySelectorAll('#bnav button').forEach(b=>{
    b.addEventListener('click',()=>goTab(b.dataset.tab));
  });

  /* drawer */
  $('btnMenu').addEventListener('click',openDrawer);
  $('scrim').addEventListener('click',closeDrawer);
  document.querySelectorAll('.lang-seg button').forEach(b=>{
    b.addEventListener('click',()=>{ setLang(b.dataset.lang); closeDrawer(); });
  });

  /* quick actions */
  $('qAuto').onclick=()=>{
    const v=readV();
    if(v.role.length<3) $('role').value = LANG==='en'
      ? 'A highly skilled expert in the field of this task, precise, practical and organized'
      : 'خبير محترف متخصص في المجال المطابق للمهمة، دقيق، عملي، ومنظم';
    if(v.audience.length<3) $('audience').value = LANG==='en'
      ? 'An interested reader looking for practical, direct content'
      : 'قارئ مهتم يريد محتوى عمليًا ومباشرًا';
    if(!v.tone.length) setChips('toneChips',['pro']);
    if(!v.fmt.length) setChips('fmtChips',['md']);
    if(!v.length) $('length').value='medium';
    if(v.constraints.length<5) $('constraints').value = LANG==='en'
      ? 'Stick to the provided information, no guessing\nOrganize the answer with clear headings\nAdd practical examples where needed'
      : 'التزم بالمعلومات المتوفرة فقط دون إضافة تخمينات\nنظّم الإجابة بعناوين واضحة\nقدّم أمثلة عملية عند الحاجة';
    if(v.avoid.length<5) $('avoid').value = LANG==='en'
      ? 'Do not repeat the same idea in different words\nNo generic filler sentences'
      : 'لا تكرر نفس الفكرة بصياغات مختلفة\nلا تستخدم جملًا عامّة بلا قيمة';
    setFlag('ask',true); setFlag('self',true);
    render(); toast(t('msg.auto'));
  };
  $('qCopy').onclick=()=>copy(CURRENT);
  $('btnCopy').onclick=()=>copy(CURRENT);
  $('qDl').onclick=()=>download('prompt.txt',CURRENT);
  $('btnTxt').onclick=()=>download('prompt.txt',CURRENT);
  $('btnImgCopy').onclick=()=>copy(CURRENT_IMG);
  $('btnImgTxt').onclick=()=>download('image-prompt.txt',CURRENT_IMG);
  $('qReset').onclick=()=>{
    if(!confirm(t('ask.reset'))) return;
    ['task','role','context','audience','constraints','avoid','in1','out1','in2','out2','imgNeg','imgArCustom'].forEach(k=>$(k).value='');
    $('imgTask').value='';
    $('length').value=''; $('lang').value=(LANG==='en'?'en':'ar');
    setChips('toneChips',[]); setChips('fmtChips',[]);
    ['ask','cot','self','few','img','direct','sources','alts','balanced','simple','plan'].forEach(k=>setFlag(k,false));
    render(); toast(t('msg.clear'));
  };
}

/* ================= Init ================= */
(function init(){
  let lg='ar'; try{ lg=localStorage.getItem('pe_lang')||'ar'; }catch(e){}
  wire();
  setLang(lg, true);
  goTab('m-home');
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
})();
