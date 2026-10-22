/* =========================================================================
   Prompt Engineer — Mobile app logic
   (i18n + prompt engine + UI). Engine functions are kept behaviour-identical
   to the desktop app so both produce the exact same prompt text.
   ========================================================================= */
const $ = id => document.getElementById(id);
let LANG = 'ar';
const t = k => (I18N[LANG] && I18N[LANG][k] !== undefined ? I18N[LANG][k] : (I18N.en[k] !== undefined ? I18N.en[k] : (I18N.ar[k] !== undefined ? I18N.ar[k] : k)));
/* Arabic is index 0, every other shipped language is index 1. The old
   check compared against 'en' only, so French, Spanish, Turkish ... fell back
   to Arabic. The ?? guard means a one-element array can never leak the word
   "undefined" into a field. */
const tx = x => (Array.isArray(x) ? (x[(LANG === 'ar' ? 0 : 1)] ?? x[0] ?? '') : x);
const pname = (p,i) => t('preset.'+i);

/* ================= i18n ================= */
/* I18N + LANGS come from the shared i18n.js file */
/* ================= State ================= */
const FLAGS = {ask:false, cot:false, self:false, few:false, img:false, phased:false,
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
  ['claymation, stop motion, clay texture, playful, soft studio light','ستوب موشن طيني (Clay)','Claymation'],
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
  ['2.4:1','2.4:1 — أنامورفيك سينمائي','2.4:1 — Anamorphic'],
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
/* "Technique keys used": counts the toggles and nothing else, so the numerator
   can never exceed the denominator. Both numbers are derived from the markup. */
const TECH_MAX = document.querySelectorAll('.tg[data-tg]:not([data-tg="phased"]):not([data-tg="img"])').length;

function setFlag(k,v){
  FLAGS[k]=v;
  document.querySelectorAll('.tg[data-tg="'+k+'"]').forEach(el=>{el.classList.toggle('on',v);el.setAttribute('aria-checked',v?'true':'false');});
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
  return applyModelTuning(s.join('\n'));
}
/* Reshape the finished prompt for the target model.
   Claude: wrap every section in an XML-ish tag, the shape it parses best.
   DeepSeek: ask for the reasoning explicitly before the answer.
   Llama: drop the quoted padding and the extra blank lines. */
function applyModelTuning(text){
  const en = (typeof LANG!=='undefined') ? LANG!=='ar' : true;
  const M = MODEL_TUNE[TARGET_MODEL] || MODEL_TUNE.auto;
  if(TARGET_MODEL==='claude'){
    const out=[]; let tag=null, buf=[];
    const flush=()=>{ if(tag!==null && buf.length){ out.push('<'+tag+'>'); out.push(...buf); out.push('</'+tag+'>'); } tag=null; buf=[]; };
    for(const ln of text.split('\n')){
      const h=/^##\s+(.+)$/.exec(ln);
      if(h){ flush(); tag=h[1].trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')||'section'; continue; }
      buf.push(ln);
    }
    flush();
    return out.join('\n');
  }
  if(TARGET_MODEL==='deepseek'){
    return (en ? 'Think step by step before answering. State the reasoning in a short section, then give the final answer in a separate section.'
               : 'فكّر خطوة بخطوة قبل الإجابة. اعرض التحليل في قسم قصير، ثم قدّم الإجابة النهائية في قسم منفصل.') + '\n\n' + text;
  }
  if(TARGET_MODEL==='perplexity'){
    const head = en ? 'Answer directly and precisely. Follow the constraints exactly and list the sources you relied on at the end.'
                    : 'أجب مباشرةً ودقة. التزم بالقيود تمامًا، واذكر المصادر التي اعتمدت عليها في النهاية.';
    const tail = en ? '\n\nSOURCES:\n- (list each source with its title and URL)'
                    : '\n\nالمصادر:\n- (اذكر كل مصدر مع عنوانه ورابطه)';
    return head + '\n\n' + text + tail;
  }
  if(TARGET_MODEL==='gemini'){
    /* Gemini reads labelled, numbered blocks very well */
    const lines=text.split('\n');
    const out=[]; let n=0; let section='';
    for(const ln of lines){
      const h=/^##\s+(.+)$/.exec(ln);
      if(h){ section=h[1].trim(); n=0; out.push(ln); continue; }
      if(/^\s*[-•]/.test(ln) && section){ n++; out.push(ln.replace(/^(\s*)[-•]/, (m,sp)=>sp+n+'. ')); continue; }
      out.push(ln);
    }
    const head = en ? 'Answer the following task. Keep the sections in order and number every list.'
                    : 'أجب عن المهمة التالية. حافظ على ترتيب الأقسام، وترقّم كل قائمة.';
    return head + '\n\n' + out.join('\n');
  }
  if(TARGET_MODEL==='qwen'){
    const head = en ? 'First state a short plan as a numbered list, then carry it out. Do not repeat the plan in the answer.'
                    : 'ابدأ بخطة مختصرة في قائمة مرقّمة، ثم نفّذها. لا تكرّر الخطة في الإجابة.';
    return head + '\n\n' + text;
  }
  if(TARGET_MODEL==='replicate'){
    const head = en ? 'Self-contained request. The task, the required inputs and the exact shape of the expected output are described below. Follow the output shape exactly and return nothing else.'
                    : 'طلب ذاتي الاكتفاء. المهمة والمدخلات المطلوبة وشكل المخرجات المتوقّع مشروحة أدناه. اتّبع شكل المخرجات تمامًا ولا تُعِد شيئًا غيره.';
    return head + '\n\n' + text;
  }
  if(TARGET_MODEL==='meta' || TARGET_MODEL==='llama'){
    let out = text.split('\n').filter(l=>!l.startsWith('> ')).join('\n').replace(/\n{3,}/g,'\n\n');
    if(M.strict){
      out += '\n\n' + (en ? 'Begin the answer immediately. No preamble, no summary of the task, no closing remarks.'
                            : 'ابدأ الإجابة فورًا. بلا مقدمة، وبلا تلخيص للمهمة، وبلا خاتمة.');
    }
    return out;
  }
  if(TARGET_MODEL==='universal'){
    const head = en ? 'TASK — what must be produced.\nINPUTS — the material you may use.\nCONSTRAINTS — the rules you may not break.\nOUTPUT — the exact format and the audience.\n\nFollow the four labels below in that order.'
                    : 'المهمة — ما الذي يجب إنتاجه.\nالمدخلات — المادة المتاحة لك.\nالقيود — القواعد التي لا يجوز كسرها.\nالمخرج — الشكل المطلوب والجمهور المستهدف.\n\nاتّبع العلامات الأربع أدناه بهذا الترتيب.';
    return head + '\n\n' + text;
  }
  return text;
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
  if(ADDED_SKILLS.size && window.PE_SKILLS){
    s.push('\n'+H('المهارات','SKILLS'));
    s.push(Array.from(ADDED_SKILLS)
      .map(id=>{ const sk=window.PE_SKILLS.byId[id]; return sk?sk.s[i]:''; })
      .filter(Boolean).join('\n'));
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
  if(FLAGS.few && (v.in1||v.out1||v.in2||v.out2)){
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
    if(FLAGS.few && (v.in1||v.out1)){ s.push('\n'+(en?'### Example ':'### المثال ')+n+'\n'+(en?'Input':'المدخل')+':\n'+(v.in1||'—')+'\n'+(en?'Expected output':'المخرجات المتوقعة')+':\n'+(v.out1||'—')); n++; }
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
  return applyModelTuning(s.join('\n'));
}

/* ================= Render ================= */
/* ================= Dynamic variables ================= */
const VAR_RE = /\[([^\]\n]{1,60})\]/g;
function collectVars(){
  const seen = new Map();
  ['task','role','context','audience','constraints','avoid','in1','out1','in2','out2','imgTask','imgNeg','imgArCustom']
    .forEach(id=>{
      const el=$(id); if(!el) return;
      for(const m of (el.value||'').matchAll(VAR_RE)) if(!seen.has(m[1])) seen.set(m[1],'');
    });
  return [...seen.keys()];
}
function renderVarBar(){
  const bar=$('varBar'); if(!bar) return;
  const names=collectVars();
  const prev={};
  document.querySelectorAll('#varFields input').forEach(i=>prev[i.dataset.var]=i.value);
  bar.hidden = names.length===0;
  const cnt=$('varCount'); if(cnt) cnt.textContent = names.length;
  const box=$('varFields'); box.innerHTML='';
  names.forEach(name=>{
    const wrap=document.createElement('label'); wrap.className='varf';
    const sp=document.createElement('span'); sp.className='varf-n'; sp.textContent='['+name+']';
    const inp=document.createElement('input'); inp.type='text'; inp.dataset.var=name;
    inp.placeholder=name; inp.value=prev[name]||'';
    inp.addEventListener('input',()=>render());
    wrap.appendChild(sp); wrap.appendChild(inp); box.appendChild(wrap);
  });
}
function substituteVars(text){
  if(!text) return text;
  const vals={};
  document.querySelectorAll('#varFields input').forEach(i=>vals[i.dataset.var]=i.value);
  return text.replace(VAR_RE,(all,name)=> (vals[name] && vals[name].trim()) ? vals[name].trim() : all);
}

function render(){
  /* the [placeholders] are filled in before the prompt is assembled */
  ['task','role','context','audience','constraints','avoid','in1','out1','in2','out2','imgTask','imgNeg','imgArCustom']
    .forEach(id=>{ const el=$(id); if(el) el.value = substituteVars(el.value); });
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
  const activeFlags = Object.keys(FLAGS).filter(k=>k!=='img' && k!=='phased' && FLAGS[k]).length;
  const tech = activeFlags;
  $('heroWords').textContent = words;
  $('heroSecs').textContent = (CURRENT.match(/^## /gm)||[]).length;
  $('heroTech').textContent = tech+'/'+TECH_MAX;

  if(typeof renderGaps==='function') renderGaps();
  if(typeof renderTokens==='function') renderTokens();
  if(typeof renderVarBar==='function') renderVarBar();
  if(typeof renderSkills==='function' && $('m-skills') && $('m-skills').classList.contains('active')) renderSkills();
  if(typeof renderSuggestions==='function') renderSuggestions();
  if(typeof renderSkills==='function' && $('m-skills') && $('m-skills').classList.contains('active')){
    renderSkills();
    if(typeof renderCommands==='function') renderCommands();
  }
  if(typeof renderPhases==='function') renderPhases();
  if(typeof fillModelSelect==='function') fillModelSelect();
  if(typeof modelTune==='function') modelTune();
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
  {w:10,t:['أمثلة مرجعية','Few-shot examples'],d:['مثال واحد يضبط الأسلوب','One example locks the style'],ok:v=>FLAGS.few&&(v.in1||v.out1||v.in2||v.out2),f:'few'}
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
  $('scoreTip').innerHTML = p>=80 ? t('q.good') : (p>=50 ? t('q.mid') : t('q.low'));
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
  const done=()=>{ toast(t('msg.copy')); saveHistory(); };
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


/* ================= Target model tuning ================= */
const MODEL_TUNE = {
  perplexity: { label:{ar:'بيربلكسيتي', en:'Perplexity'},
            note:{ar:'إجابة مباشرة وموثّقة مع ذكر المصادر.', en:'A direct, well-sourced answer with the references attached.'},
            sourced: true },
  gemini: { label: {ar:'جيميناي', en:'Gemini'},
            note:  {ar:'عناوين واضحة ونقاط مرقّمة مع مخطّط منظّم.', en:'Clear headings and numbered points with a tidy schema.'},
            numbered: true },
  qwen:   { label: {ar:'كوين', en:'Qwen'},
            note:  {ar:'خطة أولًا ثم تنفيذ، مع وسم واضح لكل مرحلة.', en:'Plan first, then execute, with a clear label per stage.'},
            planFirst: true },
  llama:  { label: {ar:'لاما محلي', en:'Local Llama'},
            note:  {ar:'تعليمات قصيرة ومباشرة بلا حشو.', en:'Short, direct imperatives with no padding.'},
            terse: true },
  meta:   { label: {ar:'ميتا (لاما)', en:'Meta (Llama)'},
            note:  {ar:'أوامر مباشرة بلا مقدمات، مع تحديد صارم للمطلوب.', en:'Direct imperatives, no preamble, with a strict definition of done.'},
            terse: true, strict: true },
  claude: { label: {ar:'Claude', en:'Claude'},
            note:  {ar:'البنية مُنسّقة بوسوم XML كما يفضّل Claude.', en:'XML-style tagged structure, the way Claude prefers it.'},
            wrap:  true },
  chatgpt:{ label: {ar:'ChatGPT', en:'ChatGPT'},
            note:  {ar:'فقرات مرتّبة ومراحل واضحة، لا وسوم.', en:'Ordered paragraphs and clear stages, no tags.'} },
  deepseek:{label: {ar:'DeepSeek', en:'DeepSeek'},
            note:  {ar:'توجيه صريح للتفكير خطوة بخطوة قبل الإجابة.', en:'Explicit step-by-step reasoning guidance before the answer.'},
            reason: true },
  auto:   { label: {ar:'تلقائي', en:'Auto'},
            note:  {ar:'', en:''} },
  universal:{ label:{ar:'شامل لكل برامج الذكاء', en:'Whole AI apps'},
            note:  {ar:'صياغة محايدة وشفافة تناسب أي برنامج ذكاء اصطناعي.', en:'A neutral, transparent formulation that suits any AI app.'},
            universal: true }
};
let TARGET_MODEL='auto';
function fillModelSelect(){
  const sel=$('targetModel'); if(!sel) return;
  /* keep the user's choice: another handler may call render() before our own
     change listener runs, and rebuilding the options used to reset the select */
  const cur = sel.value || TARGET_MODEL;
  const keys = Object.keys(MODEL_TUNE);
  if(sel.options.length !== keys.length){
    sel.innerHTML='';
    keys.forEach(k=>{ const o=document.createElement('option'); o.value=k; sel.appendChild(o); });
  }
  /* always refresh the labels -- they are localised and must follow the UI language */
  keys.forEach((k,idx)=>{ if(sel.options[idx]) sel.options[idx].textContent = t('mdl.'+k); });
  if(MODEL_TUNE[cur]) sel.value=cur; else sel.value=TARGET_MODEL;
}
function modelTune(){
  const m=MODEL_TUNE[TARGET_MODEL]||MODEL_TUNE.auto;
  const note=$('modelNote');
  if(note) note.textContent = t('mdl.note.'+TARGET_MODEL) || '';
  return m;
}

/* ================= Intent gap analyser ================= */
/* Looks for the requirements a strong prompt usually carries and reports
   the ones that are missing, each with a one-click fix. */
const GAP_RULES = [
  { id:'lang',  ar:'لم تحدد لغة البرمجة أو إطار العمل', en:'You did not name the programming language or framework',
    fix:'lang', when: v => /\b(code|coding|program|script|function|api|bug|debug|\u0628\u0631\u0645\u062c|\u0643\u0648\u062f|\u062f\u0627\u0644\u0629|\u062a\u0637\u0628\u064a\u0642|\u062e\u0627\u0644\u0642|\u062f\u0627\u0644\u0629)/i.test(v.task) },
  { id:'aud',   ar:'لم تذكر الجمهور المستهدف', en:'You did not say who the output is for',
    fix:'audience', when: v => v.task.length>12 && !v.audience.trim() },
  { id:'len',   ar:'لم تحدد الطول أو العمق المطلوب', en:'You did not say how long or how deep the answer should be',
    fix:'length', when: v => v.task.length>12 && !v.length },
  { id:'cons',  ar:'لا توجد قيود — قد يخرج الرد عن المطلوب', en:'No constraints, so the answer may drift',
    fix:'constraints', when: v => v.task.length>12 && !v.constraints.trim() },
  { id:'short', ar:'المهمة قصيرة جدًا', en:'The task is too short to act on',
    fix:'task', when: v => v.task.length>0 && v.task.length<25 },
  { id:'fmt',   ar:'لم تختار صيغة الإخراج', en:'No output format chosen',
    fix:'fmt', when: v => v.task.length>12 && !v.fmt.length },
  { id:'lang_out', ar:'لغة الإجابة غير محددة', en:'The answer language is not set',
    fix:'lang', when: v => v.task.length>12 && v.lang==='same' }
];
function findGaps(){
  const v=readV();
  return GAP_RULES.filter(r=>{ try{ return r.when(v); }catch(e){ return false; } });
}
function renderGaps(){
  const box=$('gapList'); if(!box) return;
  const gaps=findGaps();
  const ar=LANG==='ar';
  box.innerHTML='';
  if(!gaps.length){
    box.innerHTML='<div class="gap-ok">'+(ar?'✓ لا ثغرات ظاهرة في المواصفات':'✓ No gaps detected in the spec')+'</div>';
    return;
  }
  gaps.forEach(g=>{
    const row=document.createElement('div'); row.className='gap';
    const ic=document.createElement('span'); ic.className='gap-ic'; ic.textContent='⚠';
    const tx=document.createElement('span'); tx.className='gap-t'; tx.textContent=(ar?g.ar:g.en);
    const btn=document.createElement('button'); btn.className='gap-fix'; btn.type='button';
    btn.textContent=(ar?'أضف':'Add');
    btn.onclick=()=>applyGapFix(g);
    row.appendChild(ic); row.appendChild(tx); row.appendChild(btn);
    box.appendChild(row);
  });
}
function applyGapFix(g){
  const ar=LANG==='ar';
  const FILL={
    lang:{field:'task', value:'using Python'},
    audience:{field:'audience', value: ar?'متخصصون في المجال، يقرؤون للقرار العملي':'Practitioners in the field, reading to make a decision'},
    length:{field:'length', value:'medium'},
    constraints:{field:'constraints', value: ar?'التزم بمطلوب المهمة دون إضافة خارجها\nوضّح الخطوة التالية بعد كل نقطة':'Stay within the scope of the task and add nothing outside it\nState the next step after every point'},
    task:{field:'task', value:''},
    fmt:{field:'fmtChips', value:['md']},
    lang_out:{field:'lang', value:'en'}
  };
  const f=FILL[g.fix]; if(!f) return;
  if(f.field==='fmtChips'){ setChips('fmtChips', f.value); }
  else { const el=$(f.field); if(el) el.value=f.value; }
  render();
  toast(t('gap.fixed'));
}

/* ================= Phased response ================= */
const PHASES=[{"key":"plan","ar":{"title":"البحث والتحليل","goal":"ابحث عن المادة وحلّل المطلوب قبل الكتابة","body":"حلل المهمة بعمق: ابحث في المعطيات المتاحة،حدّد المصادر والأفكار الرئيسة، ووضّح زاوية الطرح والجمهور المستهدف. لا تكتب النص النهائي بعد — أخرج بحثًا منظّمًا وخطة تنفيذ."},"en":{"title":"Research & analysis","goal":"Gather the material and analyse the brief before writing","body":"Analyse the task in depth: work through the material you were given, identify the key sources and ideas, and clarify the angle and the target audience. Do not write the final text yet — produce a structured research brief and a plan."}},{"key":"outline","ar":{"title":"الهيكل والمخطط","goal":"ابنِ مخططًا تفصيليًا قبل صياغة النص","body":"بناءً على البحث السابق، ضع مخططًا تفصيليًا: العناوين الرئيسة، وما تحت كل عنوان، وترتيب النقاط، والأمثلة التي ستُستعمل. أخرج المخطط فقط."},"en":{"title":"Outline & structure","goal":"Build a detailed outline before any prose","body":"Building on the research above, produce a detailed outline: the main headings, what sits under each one, the order of the points, and the examples that will be used. Output the outline only."}},{"key":"draft","ar":{"title":"الصياغة","goal":"اكتب المسودّة كاملة","body":"اكتب المسودّة كاملة وفق المخطط، مع الالتزام بالقيود وبأسلوب المأمور. لا تحذف أي شرط، وإن نقص شيء فاذكره في نهاية المسودّة."},"en":{"title":"The draft","goal":"Write the complete first draft","body":"Write the full draft following the outline, honouring every constraint and the requested style. Do not drop a requirement; if something is missing, note it at the end of the draft."}},{"key":"expand","ar":{"title":"التفصيل والإثراء","goal":"وسّع المسودّة وأضف العمق","body":"وسّع المسودّة: أضف التفاصيل والأمثلة والشواهد، ووسّع الأقسام الضعيفة، لكن لا تغيّر الاتجاه العام ولا تضف استنتاجات لم تطلبها."},"en":{"title":"Expand & enrich","goal":"Deepen the draft without drifting","body":"Expand the draft: add the detail, the examples and the supporting points, and thicken the weaker sections — but do not change the overall direction and do not add conclusions you were not asked for."}},{"key":"review","ar":{"title":"المراجعة والتدقيق","goal":"راجع المسودّة مقابل كل شرط","body":"راجع المسودّة حصرًا مقابل قائمة المتطلبات: اذكر ما استوفى الشرط، وما لم يستوفِه، مع تحديد المشكلة. لا تعِد كتابة النص في هذه المرحلة — أعطِ تقرير مراجعة فقط."},"en":{"title":"Review & audit","goal":"Audit the draft against every requirement","body":"Review the draft strictly against the requirement list: state which requirements are met, which are not, and where the gap is. Do not rewrite the text in this stage — produce a review report only."}},{"key":"final","ar":{"title":"التنقيح النهائي","goal":"سلّم النسخة النهائية جاهزة","body":"طبّق ملاحظات المراجعة، وانقح الأسلوب، ووحّد المفردات والعلامات، ثم سلّم النسخة النهائية وحدها دون شرح ولا مقدمات."},"en":{"title":"Final polish","goal":"Deliver the finished text","body":"Apply the review notes, polish the prose, unify the vocabulary and the punctuation, then deliver the final version alone — no commentary, no preamble."}}];
/* stages the user edited by hand, kept across re-renders */
const PHASE_EDITS = {};

function phasePlan(n){
  n = Math.max(1, Math.min(6, n|0));
  switch(n){
    case 1: return ['all'];
    case 2: return [2,5];        /* draft -> final            */
    case 3: return [0,2,5];      /* research -> draft -> final */
    case 4: return [0,1,2,5];    /* research -> outline -> draft -> final */
    case 5: return [0,1,2,4,5];  /* ... -> review -> final    */
    default: return [0,1,2,3,4,5];
  }
}
function buildPhases(n){
  const v=readV();
  const plan=phasePlan(n);
  if(plan[0]==='all'){
    const ar1 = LANG==='ar';
    return [{ n:1,
      title: ar1?PHASES[2].ar.title:PHASES[2].en.title,
      goal:  ar1?'البرومبت كاملًا في رسالة واحدة':'The complete prompt in a single message',
      text: CURRENT || (ar1?'اكتب مهمتك أولًا.':'Write your task first.') }];
  }
  const ctx=[];
  if(v.task) ctx.push('TASK: '+v.task);
  if(v.role) ctx.push('ROLE: '+v.role);
  if(v.audience) ctx.push('AUDIENCE: '+v.audience);
  if(v.context) ctx.push('CONTEXT: '+v.context);
  if(v.constraints) ctx.push('REQUIREMENTS:\n'+v.constraints);
  if(v.avoid) ctx.push('DO NOT:\n'+v.avoid);
  const head=ctx.join('\n\n');
  const ar = LANG==='ar';
  return plan.map((idx,k)=>{
    const p=PHASES[idx];
    const isFirst=k===0, isLast=k===plan.length-1;
    const link=isFirst?'':'\n\nCONTINUE FROM THE PREVIOUS STAGE. Do not restart it.\n';
    const close=isLast?'\n\nDeliver this stage only. The next stage continues from your output.':'';
    return { n:k+1,
      title: ar?p.ar.title:p.en.title,
      goal: ar?p.ar.goal:p.en.goal,
      text: (isFirst?head+'\n\n':'')+link+(ar?p.ar.body:p.en.body)+close };
  });
}
function renderPhases(){
  const list=$('phaseList'); if(!list) return;
  const bar=$('phaseBar');
  if(bar){ bar.hidden = !FLAGS.phased; if(!FLAGS.phased) delete bar.dataset.shown; }
  if(!FLAGS.phased){ list.innerHTML=''; return; }
  /* bring the stage options into view: the key lives far above the bar */
  if(bar && !bar.dataset.shown){
    bar.dataset.shown='1';
    try{ bar.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
  }
  const n=Number(($('phaseCountSel')||{}).value||1);
  const phases=buildPhases(n);
  list.innerHTML='';
  phases.forEach((ph,i)=>{
    const box=document.createElement('div'); box.className='phase';
    const h=document.createElement('div'); h.className='phase-h';
    h.innerHTML='<span class="phase-n">'+(i+1)+'</span><b></b><span class="phase-goal"></span>';
    h.querySelector('b').textContent=ph.title;
    h.querySelector('.phase-goal').textContent=ph.goal;
    /* the full stage text in a text box, under the copy button */
    const ta=document.createElement('textarea');
    ta.className='phase-txt'; ta.rows=6; ta.spellcheck=false;
    ta.value = (PHASE_EDITS[ph.n]!==undefined) ? PHASE_EDITS[ph.n] : ph.text;
    ta.addEventListener('input',()=>{ PHASE_EDITS[ph.n]=ta.value; });
    const b=document.createElement('button'); b.className='btn small ghost phase-cp'; b.type='button';
    b.innerHTML="<svg class=\"hi\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M8.25 7.5V6.10822C8.25 4.97324 9.09499 4.01015 10.2261 3.91627C10.5994 3.88529 10.9739 3.85858 11.3495 3.83619M15.75 18H18C19.2426 18 20.25 16.9926 20.25 15.75V6.10822C20.25 4.97324 19.405 4.01015 18.2739 3.91627C17.9006 3.88529 17.5261 3.85858 17.1505 3.83619M15.75 18.75V16.875C15.75 15.011 14.239 13.5 12.375 13.5H10.875C10.2537 13.5 9.75 12.9963 9.75 12.375V10.875C9.75 9.01104 8.23896 7.5 6.375 7.5H5.25M17.1505 3.83619C16.8672 2.91757 16.0116 2.25 15 2.25H13.5C12.4884 2.25 11.6328 2.91757 11.3495 3.83619M17.1505 3.83619C17.2152 4.04602 17.25 4.26894 17.25 4.5V5.25H11.25V4.5C11.25 4.26894 11.2848 4.04602 11.3495 3.83619M6.75 7.5H4.875C4.25368 7.5 3.75 8.00368 3.75 8.625V20.625C3.75 21.2463 4.25368 21.75 4.875 21.75H14.625C15.2463 21.75 15.75 21.2463 15.75 20.625V16.5C15.75 11.5294 11.7206 7.5 6.75 7.5Z\"/></svg> ' + t('ph.copy');"
    b.onclick=()=>copy(ta.value);
    box.appendChild(h); box.appendChild(b); box.appendChild(ta);
    list.appendChild(box);
  });
}

/* ================= Themes ================= */
const MOBILE_THEMES = [
  {code:'light', label:'فاتح',  icon:'☀️', bg:'#EFF1F9'},
  {code:'dark',  label:'داكن',  icon:'🌙', bg:'#0b0f1a'},
];
function setTheme(code, fromSwitch){
  if(!MOBILE_THEMES.some(x=>x.code===code)) code='light';
  document.documentElement.setAttribute('data-theme', code);
  const m=document.querySelector('meta[name="theme-color"]');
  const th=MOBILE_THEMES.find(x=>x.code===code);
  if(m && th) m.content=th.bg;
  document.querySelectorAll('#themeRow button[data-theme]').forEach(b=>{
    const on=b.dataset.theme===code;
    b.classList.toggle('active', on);
    b.setAttribute('aria-checked', on?'true':'false');
  });
  const sw=document.getElementById('btnThemeAnim');
  if(sw){
    const isDay=code==='light';
    sw.classList.toggle('active', code!=='oled');
    sw.setAttribute('aria-checked', code!=='oled'?'true':'false');
    sw.setAttribute('aria-pressed', isDay?'false':'true');
  }
  if(!fromSwitch) syncThemeAnim();
  try{ localStorage.setItem('pe_theme', code); }catch(e){}
}
function renderThemeRow(){
  const box=$('themeRow'); if(!box) return;
  box.innerHTML='';

  /* the animated night / day switch */
  const sw=document.createElement('button');
  sw.type='button'; sw.className='theme-btn theme-anim-btn'; sw.id='btnThemeAnim';
  sw.setAttribute('role','radio'); sw.setAttribute('aria-checked','false');
  sw.innerHTML='<span class="th-ic th-anim"><span class="theme-anim" id="themeAnim"></span></span>';
  sw.addEventListener('click',()=>toggleDayNight());
  box.appendChild(sw);

}

/* ---------------- the animated night / day switch ----------------
   The Lottie is a real switch: the handle slides to the left for the night
   theme and back to the right for the day theme.
   Frame 30  = the sun on the right, the day theme
   Frame 200 = the moon on the left, the night theme               */
const THEME_FRAMES = {day: 30, night: 115};
/* the handle slides from the right to the left between frames 30 and 115:
   playing only that part keeps the switch snappy */
const THEME_SPEED = 2.2;
let themeAnim=null;
let themeAnimBusy=false;
function themeIsDay(){ return document.documentElement.getAttribute('data-theme')==='light'; }
function initThemeAnim(){
  const box=document.getElementById('themeAnim');
  if(!box || typeof lottie==='undefined' || !window.PE_ANIM || !window.PE_ANIM.darkmode) return;
  try{
    themeAnim=lottie.loadAnimation({
      container:box, renderer:'svg', loop:false, autoplay:false,
      animationData:window.PE_ANIM.darkmode
    });
    themeAnim.setSpeed(1);
    themeAnim.goToAndStop(themeIsDay()?THEME_FRAMES.day:THEME_FRAMES.night, true);
  }catch(e){ console.warn('the theme animation failed to load', e); }
}
function syncThemeAnim(){
  if(!themeAnim) return;
  try{ themeAnim.goToAndStop(themeIsDay()?THEME_FRAMES.day:THEME_FRAMES.night, true); }catch(e){}
}
function playThemeAnim(toDark, done){
  if(!themeAnim){ if(done) done(); return; }
  const from = toDark ? THEME_FRAMES.day : THEME_FRAMES.night;
  const to   = toDark ? THEME_FRAMES.night : THEME_FRAMES.day;
  let finished = false;
  const finish = ()=>{ if(finished) return; finished = true; if(done) done(); };
  const onComplete = ()=>{
    try{ themeAnim.removeEventListener('complete', onComplete); }catch(e){}
    finish();
  };
  try{
    themeAnim.setSpeed(THEME_SPEED);
    themeAnim.addEventListener('complete', onComplete);
    themeAnim.playSegments([from, to], true);
  }catch(e){ finish(); return; }
  /* the fallback: the length of the segment over the frame rate */
  const len = Math.abs(to - from);
  const dur = (len / (themeAnim.frameRate || 60)) * 1000 / THEME_SPEED + 450;
  setTimeout(finish, dur);
}
function toggleDayNight(){
  if(themeAnimBusy) return;
  const toDark = themeIsDay();
  themeAnimBusy = true;
  const sw=document.getElementById('btnThemeAnim'); if(sw) sw.disabled=true;
  playThemeAnim(toDark, ()=>{
    themeAnimBusy = false;
    if(sw) sw.disabled=false;
    setTheme(toDark?'dark':'light', true);
  });
}

/* ---------------- the paper plane above the progress bar ---------------- */
function placeHeroAnim(){
  const box=document.getElementById('heroAnim');
  const hero=document.querySelector('.hero'), bar=document.querySelector('.h-bar');
  if(!box || !hero || !bar) return;
  const hb=hero.getBoundingClientRect(), bb=bar.getBoundingClientRect();
  /* the bottom of the plane sits just above the line of the progress bar */
  box.style.bottom = Math.round(hb.bottom - bb.top + 8) + 'px';
}
function initHeroAnim(){
  const box=document.getElementById('heroAnim');
  if(!box || typeof lottie==='undefined' || !window.PE_ANIM || !window.PE_ANIM.paperplane) return;
  try{
    lottie.loadAnimation({
      container:box, renderer:'svg', loop:true, autoplay:true,
      animationData:window.PE_ANIM.paperplane
    });
  }catch(e){ console.warn('the hero animation failed to load', e); }
  placeHeroAnim();
  window.addEventListener('resize', placeHeroAnim);
  window.addEventListener('orientationchange', placeHeroAnim);
}

/* ================= Tabs / drawer / accordion ================= */
function goTab(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active', p.id===id));
  document.querySelectorAll('#bnav button').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  if(id==='m-history' && typeof renderHistory==='function') renderHistory();
  if(id==='m-presets' && typeof renderPresets==='function') renderPresets();
  if(id==='m-skills' && typeof renderSkills==='function') renderSkills();
  window.scrollTo({top:0, behavior:'smooth'});
}
function closeDrawer(){ $('drawer').classList.remove('open'); $('scrim').classList.remove('open'); $('drawer').setAttribute('hidden',''); $('btnMenu').setAttribute('aria-expanded','false'); }
function openDrawer(){ $('drawer').classList.add('open'); $('scrim').classList.add('open'); $('drawer').removeAttribute('hidden'); $('btnMenu').setAttribute('aria-expanded','true'); }

/* ================= The prompt history ================= */
function readHistory(){
  try{ return JSON.parse(localStorage.getItem('pe_hist')||'[]'); }catch(e){ return []; }
}
function saveHistory(){
  const v=readV();
  const list=readHistory();
  const title=(v.task||t('msg.noTitle')).slice(0,80);
  if(!CURRENT) return;
  list.unshift({ t:Date.now(), task:title, p:CURRENT });
  try{ localStorage.setItem('pe_hist', JSON.stringify(list.slice(0,60))); }catch(e){}
}
function clearHistory(){
  try{ localStorage.removeItem('pe_hist'); }catch(e){}
  renderHistory();
}
function renderHistory(){
  const box=$('histList');
  if(!box) return;
  const all=readHistory();
  const q=($('histSearch')?$('histSearch').value:'').trim().toLowerCase();
  const list = q ? all.filter(it=>((it.task||'')+' '+(it.p||'')).toLowerCase().includes(q)) : all;
  box.innerHTML='';
  if(!all.length){
    box.innerHTML='<div class="empty">'+t('h.empty')+'</div>';
    return;
  }
  if(!list.length){
    box.innerHTML='<div class="empty">'+t('h.none')+'</div>';
    return;
  }
  list.forEach(it=>{
    const d=new Date(it.t);
    const el=document.createElement('div'); el.className='hitem';
    const head=document.createElement('div'); head.className='hhead';
    const txt=document.createElement('div'); txt.className='ht'; txt.textContent=it.task||t('msg.noTitle');
    const hm=document.createElement('span'); hm.className='hm';
    hm.textContent=d.toLocaleDateString(LANG==='ar'?'ar-EG':'en-GB')+' '+d.toLocaleTimeString(LANG==='ar'?'ar-EG':'en-GB',{hour:'2-digit',minute:'2-digit'});
    head.appendChild(txt); head.appendChild(hm);
    const body=document.createElement('div'); body.className='hbody'; body.textContent=it.p||'';
    const acts=document.createElement('div'); acts.className='hacts';
    const bView=document.createElement('button'); bView.className='btn small ghost'; bView.textContent=t('h.view');
    bView.onclick=()=>{ body.classList.toggle('open'); };
    const bCopy=document.createElement('button'); bCopy.className='btn small primary'; bCopy.textContent=t('h.copy');
    bCopy.onclick=()=>copy(it.p);
    const bDel=document.createElement('button'); bDel.className='btn small ghost'; bDel.textContent=t('h.delete');
    bDel.onclick=()=>{
      const keep=readHistory().filter(x=>x.t!==it.t);
      try{ localStorage.setItem('pe_hist', JSON.stringify(keep)); }catch(e){}
      renderHistory();
    };
    acts.appendChild(bView); acts.appendChild(bCopy); acts.appendChild(bDel);
    el.appendChild(head); el.appendChild(body); el.appendChild(acts);
    box.appendChild(el);
  });
}

/* ================= Suggestions ================= */
function suggestionSource(){
  const v=readV();
  return [v.task,v.context,v.role,v.audience,v.constraints].filter(Boolean).join(' ');
}
function buildSuggestions(){
  const out=[];
  const src=suggestionSource();
  if(!src.trim()) return out;

  /* 1. a skill that fits */
  if(window.PE_SKILLS){
    const f=window.PE_SKILLS.find(src,1);
    if(f.length){
      const s=window.PE_SKILLS.byId[f[0].id];
      if(s) out.push({ kind:'skill', id:s.id, title:s.n, text:s.s, action:'skill' });
    }
  }
  /* 2. the commands that fit */
  if(window.PE_COMMANDS){
    const f=window.PE_COMMANDS.find(src,3);
    f.forEach(x=>{
      const c=window.PE_COMMANDS.byId[x.id];
      if(c) out.push({ kind:'cmd', id:c.c, title:c.c+' · '+c.n, text:c.d, action:'cmd' });
    });
  }
  /* 3. the gaps in the prompt */
  try{
    findGaps().slice(0,3).forEach(g=>{
      out.push({ kind:'fix', id:g.id, title:g.fixText, text:g, action:'fix', fix:g.fix });
    });
  }catch(e){}
  /* 4. the tool that fits best */
  if(window.PE_BEST){
    const b=window.PE_BEST.find(src);
    if(b) out.push({ kind:'tool', id:b.id, title:b.best, text:b.d, action:'tool', link:b.link });
  }
  return out;
}
function renderSuggestions(){
  const box=$('sugList');
  if(!box) return;
  const pick = a => (typeof L === 'function') ? (L()===1 ? a[1] : a[0]) : tx(a);
  const list=buildSuggestions();
  box.innerHTML='';
  if(!list.length){
    const e=document.createElement('div');
    e.className='sug-empty';
    e.textContent=t('sug.empty');
    box.appendChild(e);
    return;
  }
  list.forEach(x=>{
    const el=document.createElement('div');
    el.className='sug-item sug-'+x.kind;
    const badge=document.createElement('span');
    badge.className='sug-badge';
    badge.textContent=t('sug.'+(x.kind==='cmd'?'cmd':x.kind));
    const body=document.createElement('div');
    body.className='sug-body';
    const title=document.createElement('div');
    title.className='sug-t';
    title.textContent=(typeof x.title==='string') ? x.title : pick(x.title);
    const text=document.createElement('div');
    text.className='sug-d';
    text.textContent=(typeof x.text==='string') ? x.text : pick(x.text);
    body.appendChild(title); body.appendChild(text);

    if(x.action==='skill'){
      /* copy it, or drop it straight into the prompt */
      const bCopy=document.createElement('button');
      bCopy.type='button'; bCopy.className='sug-btn';
      bCopy.textContent=t('sug.copy');
      bCopy.onclick=()=>{ copy(x.text); toast(t('msg.copy')); };
      const bAdd=document.createElement('button');
      bAdd.type='button'; bAdd.className='sug-btn primary';
      bAdd.textContent=t('sug.addto');
      bAdd.onclick=()=>{ addSkillToPrompt(x.id); renderSuggestions(); };
      const acts=document.createElement('div'); acts.className='sug-acts';
      acts.appendChild(bCopy); acts.appendChild(bAdd);
      body.appendChild(acts);
      el.appendChild(badge); el.appendChild(body);
    } else if(x.action==='cmd'){
      const C=window.PE_COMMANDS;
      const c=C.byId[x.id];
      const inv=C.invocation(c, CMD_TOOL, (typeof L==='function') ? (L()===1?1:0) : (LANG==='ar'?0:1));
      const bCopy=document.createElement('button');
      bCopy.type='button'; bCopy.className='sug-btn';
      bCopy.textContent=t('sug.copy');
      bCopy.onclick=()=>{ copy(inv + (($('task')&&$('task').value)||'')); toast(t('cmd.copied')); };
      const bAdd=document.createElement('button');
      bAdd.type='button'; bAdd.className='sug-btn primary';
      bAdd.textContent=t('sug.addto');
      bAdd.onclick=()=>{ addCommandToPrompt(x.id); renderSuggestions(); };
      const acts=document.createElement('div'); acts.className='sug-acts';
      acts.appendChild(bCopy); acts.appendChild(bAdd);
      body.appendChild(acts);
      el.appendChild(badge); el.appendChild(body);
    } else if(x.action==='fix'){
      const b=document.createElement('button');
      b.type='button'; b.className='sug-btn primary';
      b.textContent=t('sug.apply');
      b.onclick=()=>{ applyGap(x.fix); renderSuggestions(); };
      const acts=document.createElement('div'); acts.className='sug-acts';
      acts.appendChild(b);
      body.appendChild(acts);
      el.appendChild(badge); el.appendChild(body);
    } else {
      /* the tool: open it, then the free open-source alternatives */
      const a=document.createElement('a');
      a.className='sug-btn primary';
      a.href=x.link; a.target='_blank'; a.rel='noopener';
      a.textContent=t('sug.open');
      const acts=document.createElement('div'); acts.className='sug-acts';
      acts.appendChild(a);
      body.appendChild(acts);
      const open=document.createElement('div');
      open.className='sug-open';
      const oh=document.createElement('div');
      oh.className='sug-open-h';
      oh.textContent=t('sug.openmodels');
      open.appendChild(oh);
      const OPEN=(window.PE_BEST&&window.PE_BEST.open)||[];
      OPEN.forEach(m=>{
        const row=document.createElement('div');
        row.className='sug-open-row';
        const nm=document.createElement('b'); nm.textContent=m.n+' · '+m.o;
        const ds=document.createElement('span'); ds.textContent=pick(m.d);
        const links=document.createElement('span'); links.className='sug-open-links';
        const l1=document.createElement('a'); l1.href=m.u; l1.target='_blank'; l1.rel='noopener'; l1.textContent=t('sug.open');
        const l2=document.createElement('a'); l2.href=m.w; l2.target='_blank'; l2.rel='noopener'; l2.textContent=t('sug.download');
        links.appendChild(l1); links.appendChild(l2);
        row.appendChild(nm); row.appendChild(ds); row.appendChild(links);
        open.appendChild(row);
      });
      body.appendChild(open);
      el.appendChild(badge); el.appendChild(body);
    }
    box.appendChild(el);
  });
}
/* the skill instruction goes into the constraints, so it lands in the prompt */
function addSkillToPrompt(id){
  const s=window.PE_SKILLS && window.PE_SKILLS.byId[id];
  if(!s) return;
  const i=(typeof L==='function') ? (L()===1?1:0) : (LANG==='ar'?0:1);
  const el=$('constraints');
  if(el){
    const line=s.s[i];
    if(String(el.value).indexOf(line)<0)
      el.value=(el.value? String(el.value).replace(/\s+$/,'') + '\n' : '') + line;
    el.dispatchEvent(new Event('input',{bubbles:true}));
  }
  render();
}
/* the slash command goes in front of the task */
function addCommandToPrompt(id){
  const c=window.PE_COMMANDS && window.PE_COMMANDS.byId[id];
  if(!c) return;
  const el=$('task');
  if(el){
    if(String(el.value).indexOf(c.c)<0) el.value=c.c+' '+el.value;
    el.dispatchEvent(new Event('input',{bubbles:true}));
  }
  render();
}
/* the token banner under the generated prompt */
function tokenEstimate(text){
  if(!text) return 0;
  const cjk=(text.match(/[\u3000-\u9fff\u3040-\u30ff\uac00-\ud7af]/g)||[]).length;
  const rest=text.length-cjk;
  return Math.round(cjk+rest/4);
}
function renderTokens(){
  const v=readV();
  const input=[v.task,v.role,v.context,v.audience,v.constraints,v.avoid,v.in1,v.out1,v.in2,v.out2,v.imgTask,v.imgNeg].filter(Boolean).join(' ');
  const inTok=tokenEstimate(input);
  const promptTok=tokenEstimate(CURRENT);
  const outTok=Math.round(promptTok*1.8);
  const a=$('tokIn'), b=$('tokOut');
  if(a) a.textContent=inTok.toLocaleString('en-US');
  if(b) b.textContent=outTok.toLocaleString('en-US');
}
/* ================= Skills and commands ================= */
const ADDED_SKILLS = new Set();
let SKILL_CAT = 'all';
let CMD_TOOL = 'chatgpt';
let SK_TAB = 'skills';

function skillsSourceText(){
  return ['task','context','role','audience']
    .map(id=>{ const el=$(id); return el?el.value:''; }).join(' ');
}
function renderSkillCats(){
  const box=$('skillsCats');
  if(!box || !window.PE_SKILLS) return;
  const C=window.PE_SKILLS.cats;
  box.innerHTML='';
  const mk=(code,label)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='sk-cat'+(SKILL_CAT===code?' active':'');
    b.textContent=label;
    b.onclick=()=>{ SKILL_CAT=code; renderSkillCats(); renderSkills(); };
    box.appendChild(b);
  };
  mk('all', t('skills.all'));
  Object.keys(C).forEach(k=>mk(k, tx(C[k].n)));
}
function renderSkills(){
  const list=$('skillsList'), added=$('skillsAdded');
  if(!list || !window.PE_SKILLS) return;
  const S=window.PE_SKILLS;
  const pick = a => (typeof L === 'function') ? (L()===1 ? a[1] : a[0]) : tx(a);
  const src=skillsSourceText();
  const found=S.find(src, 60);
  const score={}; found.forEach(f=>{ score[f.id]=f.score; });
  /* the skills that fit the prompt come first, the rest keeps its order */
  const ordered=S.list.slice().sort((a,b)=>{
    const ha=score[a.id]||0, hb=score[b.id]||0;
    return hb-ha;
  });
  const hits=Object.keys(score).length;
  list.innerHTML='';
  ordered.forEach(s=>{
    const on=ADDED_SKILLS.has(s.id);
    const hit=!!score[s.id];
    const row=document.createElement('div');
    row.className='skill'+(on?' on':'')+(hit?' hit':'');
    row.innerHTML='<div class="skill-t"><b></b><span></span></div><button class="skill-btn" type="button"></button>';
    row.querySelector('.skill-t b').textContent=pick(s.n);
    row.querySelector('.skill-t span').textContent=pick(s.s);
    if(hit){
      const star=document.createElement('em');
      star.className='skill-star';
      star.textContent='★';
      row.querySelector('.skill-t').insertBefore(star, row.querySelector('.skill-t b'));
    }
    const b=row.querySelector('.skill-btn');
    b.textContent=on ? t('skills.remove') : t('skills.add');
    b.onclick=()=>toggleSkill(s.id);
    list.appendChild(row);
  });
  const cnt=$('skillsCount');
  if(cnt) cnt.textContent = S.list.length + ' · ' + hits + ' ' + t('skills.fit');
  added.innerHTML='';
  ADDED_SKILLS.forEach(id=>{
    const s=S.byId[id]; if(!s) return;
    const row=document.createElement('div');
    row.className='skill on';
    row.innerHTML='<div class="skill-t"><b></b><span></span></div><button class="skill-btn on" type="button"></button>';
    row.querySelector('.skill-t b').textContent=pick(s.n);
    row.querySelector('.skill-t span').textContent=pick(s.s);
    const b=row.querySelector('.skill-btn');
    b.textContent=t('skills.remove');
    b.onclick=()=>toggleSkill(id);
    added.appendChild(row);
  });
  const head=$('skillsAddedHead'); if(head) head.hidden = ADDED_SKILLS.size===0;
}
function toggleSkill(id){
  if(ADDED_SKILLS.has(id)) ADDED_SKILLS.delete(id); else ADDED_SKILLS.add(id);
  renderSkills();
  render();
}
function commandRow(c, big){
  const C=window.PE_COMMANDS;
  const row=document.createElement('div');
  row.className='skill cmd'+(big?' big':'');
  const inv=C.invocation(c, CMD_TOOL, LANG==='ar'?0:1);
  row.innerHTML='<div class="skill-t"><b></b><span></span><code></code></div><button class="skill-btn" type="button"></button>';
  row.querySelector('.skill-t b').textContent=c.c+' · '+tx(c.n);
  row.querySelector('.skill-t span').textContent=tx(c.d);
  row.querySelector('code').textContent=inv;
  const b=row.querySelector('.skill-btn');
  b.textContent=t('cmd.copy');
  b.onclick=()=>{
    const task=$('task')?$('task').value:'';
    copy(inv+task);
    toast(t('cmd.copied'));
  };
  return row;
}
function renderBests(){
  const box=$('bestList');
  if(!box || !window.PE_BEST) return;
  const B=window.PE_BEST;
  /* the desktop picks with L(), the mobile with tx() */
  const pick = a => (typeof L === 'function') ? (L()===1 ? a[1] : a[0]) : tx(a);
  box.innerHTML='';
  B.list.forEach(x=>{
    const el=document.createElement('div');
    el.className='best';
    const ic=document.createElement('span'); ic.className='best-ic'; ic.innerHTML=B.svg(x.ic);
    const body=document.createElement('div'); body.className='best-t';
    const title=document.createElement('div'); title.className='best-n';
    title.textContent = pick(x.n);
    const desc=document.createElement('div'); desc.className='best-d';
    desc.textContent = pick(x.d);
    const win=document.createElement('div'); win.className='best-w';
    const badge=document.createElement('span'); badge.className='best-badge';
    badge.textContent=t('best.winner');
    const model=document.createElement('b'); model.textContent=x.best;
    const org=document.createElement('i'); org.textContent=x.org;
    win.appendChild(badge); win.appendChild(model); win.appendChild(org);
    body.appendChild(title); body.appendChild(desc); body.appendChild(win);
    if(x.alt && x.alt.length){
      const alts=document.createElement('div'); alts.className='best-alt';
      alts.textContent = t('best.alt') + ': ' + pick(x.alt);
      body.appendChild(alts);
    }
    const link=document.createElement('a'); link.className='best-link';
    link.href=x.link; link.target='_blank'; link.rel='noopener';
    link.textContent=t('best.open');
    el.appendChild(ic); el.appendChild(body); el.appendChild(link);
    box.appendChild(el);
  });
  const upd=$('bestUpdated');
  if(upd) upd.textContent = t('best.updated') + ' ' + B.updated + ' · ' + B.source;
}
function renderCommands(){
  const box=$('cmdList');
  if(!box || !window.PE_COMMANDS) return;
  const C=window.PE_COMMANDS;
  const tb=$('cmdTools');
  tb.innerHTML='';
  Object.keys(C.tools).forEach(code=>{
    const b=document.createElement('button');
    b.type='button'; b.className='cmd-tool'+(CMD_TOOL===code?' active':'');
    b.textContent=C.tools[code].n[0];
    b.onclick=()=>{ CMD_TOOL=code; renderCommands(); };
    tb.appendChild(b);
  });
  const sug=$('cmdSuggest');
  sug.innerHTML='';
  const found=C.find(skillsSourceText(), 1);
  const head=$('cmdSuggestHead');
  if(found.length && C.byId[found[0].id]){
    head.hidden=false;
    sug.appendChild(commandRow(C.byId[found[0].id], true));
  } else head.hidden=true;
  box.innerHTML='';
  C.list.forEach(c=>box.appendChild(commandRow(c, false)));
}
function initSkills(){
  renderSkillCats();
  renderSkills();
  renderCommands();
  document.querySelectorAll('#skSkills ~ * .sk-tab, .skills-tabs .sk-tab').forEach(()=>{});
  document.querySelectorAll('.skills-tabs .sk-tab').forEach(b=>{
    if(b.dataset.bound) return;
    b.dataset.bound='1';
    b.addEventListener('click',()=>{
      SK_TAB=b.dataset.sktab;
      document.querySelectorAll('.skills-tabs .sk-tab').forEach(x=>x.classList.toggle('active', x===b));
      $('skSkills').hidden = SK_TAB!=='skills';
      $('skCommands').hidden = SK_TAB!=='commands';
      $('skBest').hidden = SK_TAB!=='best';
      if(SK_TAB==='commands') renderCommands();
      else if(SK_TAB==='best') renderBests();
      else renderSkills();
    });
  });
}

/* ================= Presets ================= */
let PRESET_CAT='all';
function renderPresetCats(){
  const box=$('presetCats');
  if(!box || !window.PE_SKILLS) return;
  const C=window.PE_SKILLS.cats;
  box.innerHTML='';
  const mk=(code,label)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='sk-cat'+(PRESET_CAT===code?' active':'');
    b.textContent=label;
    b.onclick=()=>{ PRESET_CAT=code; renderPresetCats(); renderPresets(); };
    box.appendChild(b);
  };
  mk('all', t('skills.all'));
  Object.keys(C).forEach(k=>mk(k, tx(C[k].n)));
}
function renderPresets(){
  const box=$('presets'); box.innerHTML='';
  PRESETS.forEach((p,i)=>{
    if(PRESET_CAT!=='all' && p.cat!==PRESET_CAT) return;
    const b=document.createElement('button');
    b.className='pcard'; b.type='button'; b.dataset.i=i;
    b.innerHTML='<b></b>'; b.querySelector('b').textContent=pname(p,i);
    b.onclick=()=>applyPreset(i);
    box.appendChild(b);
  });
}
function applyPreset(i){
  const s = PRESETS[i].set;
  if(s.task !== undefined) {
    $('task').value = tx(s.task);
    $('imgTask').value = $('task').value;
  }
  if(s.role !== undefined) $('role').value = tx(s.role);
  if(s.audience !== undefined) $('audience').value = tx(s.audience);
  if(s.tone !== undefined) setChips('toneChips', s.tone);
  if(s.fmt !== undefined) setChips('fmtChips', s.fmt);
  if(s.length !== undefined) $('length').value = s.length;
  if(s.constraints !== undefined) $('constraints').value = tx(s.constraints);
  if(s.avoid !== undefined) $('avoid').value = tx(s.avoid);

  /* reset every toggle first, then apply the ones this preset declares --
     otherwise a key switched on by the previous preset stayed on */
  Object.keys(FLAGS).forEach(k => setFlag(k, false));
  if(s.flags) Object.keys(s.flags).forEach(k => setFlag(k, !!s.flags[k]));

  render();
  toast(t('msg.preset') + tx(PRESETS[i].name));
  goTab(s.img ? 'm-image' : 'm-home');
}

/* ================= Ready templates for task & role (built from the presets) ================= */
const TPL_FIELDS = {
  task:{field:'task', btn:'tplBtn', panel:'tplPanel', list:'tplList', cnt:'tplCnt', msg:'msg.tasktpl'},
  role:{field:'role', btn:'roleTplBtn', panel:'roleTplPanel', list:'roleTplList', cnt:'roleTplCnt', msg:'msg.roletpl'}
};
function tplValue(p,kind){ return kind==='task' ? p.set.task : p.set.role; }
function tplTitle(p,kind){ return kind==='task' ? tx(p.name) : tx(p.set.role); }
function renderTaskTemplates(){
  Object.keys(TPL_FIELDS).forEach(kind=>{
    const cfg=TPL_FIELDS[kind], box=$(cfg.list); if(!box) return;
    box.innerHTML='';
    PRESETS.forEach((p,i)=>{
      const txt=tplValue(p,kind); if(!txt) return;
      const b=document.createElement('button');
      b.className='tpl-item'; b.type='button'; b.dataset.i=i; b.dataset.kind=kind;
      b.innerHTML='<b></b><span></span>';
      b.querySelector('b').textContent=tplTitle(p,kind);
      b.querySelector('span').textContent= kind==='task' ? tx(txt) : tx(p.name);
      b.onclick=()=>useTemplate(kind,i);
      box.appendChild(b);
    });
    const cnt=$(cfg.cnt); if(cnt) cnt.textContent=box.children.length;
  });
}
function useTemplate(kind,i){
  const cfg=TPL_FIELDS[kind];
  applyPreset(i);                        /* fills role, audience, tones, format, length, constraints… */
  const el=$(cfg.field);
  el.value=tx(tplValue(PRESETS[i],kind));
  el.dispatchEvent(new Event('input',{bubbles:true}));
  el.dispatchEvent(new Event('change',{bubbles:true}));
  document.querySelectorAll('.tpl-item[data-kind="'+kind+'"]')
          .forEach(x=>x.classList.toggle('active',Number(x.dataset.i)===i));
  toggleTemplatePanel(kind,false);
  toast(t(cfg.msg)+(kind==='task' ? tx(PRESETS[i].name) : tx(PRESETS[i].set.role)));
}
function toggleTemplatePanel(kind,force){
  const cfg=TPL_FIELDS[kind], p=$(cfg.panel), b=$(cfg.btn); if(!p) return;
  const open = force===undefined ? p.hidden : !!force;
  p.hidden=!open;
  if(b) b.setAttribute('aria-expanded',String(open));
}
function toggleTaskPanel(force){ toggleTemplatePanel('task',force); }

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
    /* Open the first tab inside the click gesture, then steer that same tab to
       the second URL. Calling window.open() from inside setTimeout() loses the
       user-activation and mobile browsers block it outright. */
    const openBoth = () => {
      const w = window.open(tool.u, '_blank');
      if (w) setTimeout(() => { try { w.location.href = tool.au; } catch(_) {} }, 350);
    };
    card.querySelector('.both').onclick = openBoth;
    card.querySelector('.oss').title = tool.ad || '';
    card.style.cursor='pointer';
    card.onclick=(e)=>{ if(e.target.closest('a')||e.target.closest('button')) return; openBoth(); };
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
function renderLangList(){
  const box=$('langList'); if(!box) return;
  box.innerHTML='';
  LANGS.filter(l=>I18N[l.code]).forEach(l=>{
    const b=document.createElement('button');
    b.type='button'; b.dataset.lang=l.code;
    b.className=l.code===LANG?'active':'';
    b.innerHTML='<span class="li-ic"></span><span class="li-name"></span><span class="li-en"></span>';
    b.querySelector('.li-ic').textContent=l.icon;
    b.querySelector('.li-name').textContent=l.native;
    b.querySelector('.li-en').textContent=l.en;
    b.onclick=()=>{ setLang(l.code); closeDrawer(); };
    box.appendChild(b);
  });
}
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(e=>{ e.textContent=t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(e=>{ e.placeholder=t(e.dataset.i18nPh); });
  const meta=LANGS.find(l=>l.code===LANG)||LANGS[0];
  document.documentElement.lang=LANG;
  document.documentElement.dir=meta.dir;
  document.documentElement.className='script-'+meta.script;
  document.title = LANG==='en'
    ? 'Prompt Engineer — Mobile'
    : 'مهندس البرومبت — واجهة الهاتف';
}
/* the answer-language <select> must offer every shipped language, not just ar/en.
   Built from LANGS so it can never fall out of sync with the dictionary. */
function fillAnswerLangs(){
  const sel=$('lang'); if(!sel) return;
  const cur=sel.value;
  sel.innerHTML='';
  const add=(v,label)=>{ const o=document.createElement('option'); o.value=v; o.textContent=label; sel.appendChild(o); };
  add('same', t('opt.same'));
  (typeof LANGS!=='undefined'?LANGS:[]).forEach(l=>add(l.code,l.native));
  sel.value = Array.prototype.some.call(sel.options, o=>o.value===cur) ? cur : 'same';
}

function setLang(lg, silent){
  if(!I18N[lg]) lg='ar';
  LANG=lg;
  try{ localStorage.setItem('pe_lang', lg); }catch(e){}
  document.querySelectorAll('#langList button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lg));
  applyI18n();
  buildImgSelects();
  renderLangList(); renderPresetCats(); renderPresets(); renderTaskTemplates(); renderAi(); render();
  if(typeof renderSkillCats==='function') renderSkillCats();
  if(typeof renderCommands==='function') renderCommands();
  if(typeof renderBests==='function') renderBests();
  fillAnswerLangs();
  if(!silent) toast(t('msg.lang'));
}

/* ================= Actions ================= */
function wire(){
  const tplBtn=$('tplBtn');
  if(tplBtn) tplBtn.addEventListener('click',()=>toggleTaskPanel());
  const roleBtn=$('roleTplBtn');
  if(roleBtn) roleBtn.addEventListener('click',()=>toggleTemplatePanel('role'));
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
    const card=h.parentElement;
    /* give the panel an id so aria-controls points at something real */
    const body=card.querySelector('.s-body');
    const id='card-body-'+(card.dataset.card||Math.random().toString(36).slice(2,8));
    if(body && !body.id){ body.id=id; h.setAttribute('aria-controls',id); }
    const open=card.classList.contains('open');
    h.setAttribute('aria-expanded', open?'true':'false');
    if(body && open) body.removeAttribute('hidden');
    h.addEventListener('click',()=>{
      const isOpen=card.classList.toggle('open');
      h.setAttribute('aria-expanded', isOpen?'true':'false');
      const b=card.querySelector('.s-body');
      if(b){ if(isOpen) b.removeAttribute('hidden'); else b.setAttribute('hidden',''); }
    });
  });

  /* bottom nav */
  document.querySelectorAll('#bnav button').forEach(b=>{
    b.addEventListener('click',()=>goTab(b.dataset.tab));
  });

  /* drawer */
  $('btnMenu').addEventListener('click',openDrawer);
  $('scrim').addEventListener('click',closeDrawer);

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
  const vc=$('btnVarsClear');
  if(vc) vc.onclick=()=>{ document.querySelectorAll('#varFields input').forEach(i=>i.value=''); render(); };
  const hs=$('histSearch');
  if(hs) hs.addEventListener('input',renderHistory);
  const hc=$('btnHistClear');
  if(hc) hc.onclick=clearHistory;
  $('qReset').onclick=()=>{
    if(!confirm(t('ask.reset'))) return;
    ['task','role','context','audience','constraints','avoid','in1','out1','in2','out2','imgNeg','imgArCustom'].forEach(k=>$(k).value='');
    $('imgTask').value='';
    $('length').value=''; fillAnswerLangs();
    setChips('toneChips',[]); setChips('fmtChips',[]);
    ['ask','cot','self','few','img','direct','sources','alts','balanced','simple','plan'].forEach(k=>setFlag(k,false));
    render(); toast(t('msg.clear'));
  };
}

/* ================= Init ================= */
(function init(){
  let lg='ar'; try{ lg=localStorage.getItem('pe_lang')||'ar'; }catch(e){}
  wire();
  renderThemeRow();
  renderPresetCats();
  initSkills();
  renderBests();
  const mSel=$('targetModel');
  if(mSel){
    fillModelSelect();
    mSel.addEventListener('change',()=>{
      TARGET_MODEL = mSel.value;
      try{ localStorage.setItem('pe_model', TARGET_MODEL); }catch(e){}
      const note=$('modelNote');
      if(note){ note.textContent = t('mdl.note.'+TARGET_MODEL) || ''; }
      render();
    });
    try{ const saved=localStorage.getItem('pe_model'); if(saved && MODEL_TUNE[saved]){ TARGET_MODEL=saved; mSel.value=saved; } }catch(e){}
  }
  const psel=$('phaseCountSel');
  if(psel){ for(let i=1;i<=6;i++){ const o=document.createElement('option'); o.value=String(i); o.textContent=String(i); psel.appendChild(o); }
    psel.value='3'; psel.addEventListener('change',renderPhases); }
  const pcopy=$('btnPhaseCopy');
  if(pcopy) pcopy.onclick=()=>{
    const phases=buildPhases(Number(psel.value));
    copy(phases.map(p=>'=== STAGE '+p.n+' ===\n'+p.text).join('\n\n'));
  };
  let th='light'; try{ th=localStorage.getItem('pe_theme')||'light'; }catch(e){}
  setTheme(th);
  initThemeAnim();
  initHeroAnim();
  setLang(lg, true);
  setTheme(th);   /* the switch label follows the language */  setTheme(th);   /* the switch label follows the language */
  goTab('m-home');
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
})();
