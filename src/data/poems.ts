// EXPORTS: IXPoem, POEMS, getPoem, DYNASTIES, AUTHORS, GENRES
// 诗词原文、注释、创作背景均为真实经典内容；
// 「创作背景 / 意境解读」为编辑整理供参考，页面内会明确标注为示例内容。
export interface IXPoem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  genre: string;
  image?: string; // 卡片配图（public/images 下）
  text: string[];
  excerpt?: boolean; // 长诗节选标记
  keyLine: string;
  annotation: { word: string; meaning: string }[];
  background: string;
  interpretation: string;
  moods: string[];
  tags: string[];
}

export const POEMS: IXPoem[] = [
  {
    id: 'jing-ye-si',
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    genre: '五言绝句',
    image: 'poem-jing-ye-si.png',
    text: ['床前明月光，疑是地上霜。', '举头望明月，低头思故乡。'],
    keyLine: '举头望明月，低头思故乡。',
    annotation: [
      { word: '疑', meaning: '仿佛、好像' },
      { word: '举头', meaning: '抬头' },
    ],
    background:
      '此诗约作于开元十四年（726 年）李白旅居扬州期间，是诗人在异乡夜宿时因月光而触发的思乡之作，也是流传最广的唐诗之一。',
    interpretation:
      '诗人以月光起兴，由「疑霜」到「望月」再到「思乡」，动作与心境层层推进，把瞬间的乡愁写得克制而深远——明月成为联结他乡与故乡的桥梁。',
    moods: ['moon'],
    tags: ['思乡', '明月', '静夜'],
  },
  {
    id: 'chun-jiang',
    title: '春江花月夜',
    author: '张若虚',
    dynasty: '唐',
    genre: '七言古诗',
    excerpt: true,
    image: 'poem-chun-jiang.png',
    text: [
      '春江潮水连海平，海上明月共潮生。',
      '滟滟随波千万里，何处春江无月明。',
      '江畔何人初见月？江月何年初照人？',
      '人生代代无穷已，江月年年望相似。',
    ],
    keyLine: '江畔何人初见月？江月何年初照人？',
    annotation: [
      { word: '滟滟', meaning: '波光荡漾的样子' },
      { word: '代代', meaning: '一代又一代' },
    ],
    background:
      '张若虚传世诗作仅两首，《春江花月夜》为其代表作。全诗以春江月夜为背景，将景物、哲思与离情融为一体，被誉为「诗中的诗，顶峰上的顶峰」。',
    interpretation:
      '诗人由春江月夜的美景生发出对宇宙与人生的追问：江月「年年望相似」，人生却「代代无穷已」——情与景、哲思与离愁在月下交织成一片。',
    moods: ['moon', 'landscape'],
    tags: ['江月', '哲思', '春江'],
  },
  {
    id: 'shan-ju',
    title: '山居秋暝',
    author: '王维',
    dynasty: '唐',
    genre: '五言律诗',
    image: 'poem-shan-ju.png',
    text: [
      '空山新雨后，天气晚来秋。',
      '明月松间照，清泉石上流。',
      '竹喧归浣女，莲动下渔舟。',
      '随意春芳歇，王孙自可留。',
    ],
    keyLine: '明月松间照，清泉石上流。',
    annotation: [
      { word: '暝', meaning: '日落、天色将晚' },
      { word: '喧', meaning: '喧闹，此处指竹林中浣女归来的笑语声' },
      { word: '王孙', meaning: '原指贵族子弟，此处借指归隐之人' },
    ],
    background:
      '此诗写于王维晚年隐居辋川别业时期。他以「诗中有画」的手法，描绘了山居秋日黄昏的清幽景致，寄托归隐自适的情怀。',
    interpretation:
      '颔联「明月松间照，清泉石上流」以光与声、动与静的对仗，画出山中黄昏的明净画面；尾联「王孙自可留」直抒归隐之志。',
    moods: ['landscape'],
    tags: ['山水', '归隐', '空山'],
  },
  {
    id: 'wang-lu',
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐',
    genre: '七言绝句',
    image: 'poem-wang-lu.png',
    text: [
      '日照香炉生紫烟，遥看瀑布挂前川。',
      '飞流直下三千尺，疑是银河落九天。',
    ],
    keyLine: '飞流直下三千尺，疑是银河落九天。',
    annotation: [
      { word: '香炉', meaning: '指庐山西北的香炉峰' },
      { word: '九天', meaning: '古代传说天有九重，此处指极高的天空' },
    ],
    background:
      '此诗作于李白游庐山时。他以极度夸张的想象描绘庐山瀑布的雄奇，是咏瀑布诗中的名篇。',
    interpretation:
      '诗人以「挂」「落」两个动词将瀑布写活，「三千尺」与「银河」的比喻，让眼前的实景获得神游天外的气魄。',
    moods: ['grand'],
    tags: ['瀑布', '想象', '壮美'],
  },
  {
    id: 'jin-jiu',
    title: '将进酒',
    author: '李白',
    dynasty: '唐',
    genre: '乐府古诗',
    excerpt: true,
    image: 'poem-jiang-jin-jiu.png',
    text: [
      '君不见黄河之水天上来，奔流到海不复回。',
      '君不见高堂明镜悲白发，朝如青丝暮成雪。',
      '人生得意须尽欢，莫使金樽空对月。',
      '天生我材必有用，千金散尽还复来。',
    ],
    keyLine: '天生我材必有用，千金散尽还复来。',
    annotation: [
      { word: '将', meaning: '请' },
      { word: '金樽', meaning: '精美的酒器' },
      { word: '青丝', meaning: '黑发' },
    ],
    background:
      '《将进酒》是李白借乐府旧题创作的名篇，约作于天宝年间离开长安之后。全诗以劝酒为线索，抒发对人生短促的感慨与自信豪放的情怀。',
    interpretation:
      '诗以「君不见」两度发问，将黄河奔海与人生易老对照，随后转入「天生我材必有用」的自我肯定，悲而不伤、狂而有骨。',
    moods: ['grand'],
    tags: ['豪情', '饮酒', '人生'],
  },
  {
    id: 'feng-qiao',
    title: '枫桥夜泊',
    author: '张继',
    dynasty: '唐',
    genre: '七言绝句',
    image: 'poem-feng-qiao.png',
    text: [
      '月落乌啼霜满天，江枫渔火对愁眠。',
      '姑苏城外寒山寺，夜半钟声到客船。',
    ],
    keyLine: '姑苏城外寒山寺，夜半钟声到客船。',
    annotation: [
      { word: '枫桥', meaning: '在今苏州阊门外' },
      { word: '乌啼', meaning: '乌鸦啼叫' },
      { word: '姑苏', meaning: '苏州的别称' },
    ],
    background:
      '安史之乱后，诗人途经苏州夜泊枫桥，写下这首羁旅诗。诗中以渔火、钟声等意象营造清冷意境，流传极广。',
    interpretation:
      '前三句铺陈月落、乌啼、霜天、江枫、渔火等视觉与听觉意象，末句「夜半钟声」以声写静，使整夜的愁绪有了着落。',
    moods: ['autumn'],
    tags: ['羁旅', '夜泊', '钟声'],
  },
  {
    id: 'jiang-xue',
    title: '江雪',
    author: '柳宗元',
    dynasty: '唐',
    genre: '五言绝句',
    image: 'poem-jiang-xue.png',
    text: ['千山鸟飞绝，万径人踪灭。', '孤舟蓑笠翁，独钓寒江雪。'],
    keyLine: '孤舟蓑笠翁，独钓寒江雪。',
    annotation: [
      { word: '绝', meaning: '尽、无' },
      { word: '蓑笠', meaning: '蓑衣与斗笠' },
      { word: '径', meaning: '小路' },
    ],
    background:
      '此诗作于柳宗元被贬永州之后。他以极简的笔法画出大雪覆盖的寒江，寄托孤高自守的心境。',
    interpretation:
      '前两句以「绝」「灭」写天地之空寂，后两句以极小的「孤舟」「独钓」点出人物，画面极简而意境极深，是「诗中有画」的典范。',
    moods: ['autumn'],
    tags: ['孤寂', '雪景', '独钓'],
  },
  {
    id: 'deng-gao',
    title: '登高',
    author: '杜甫',
    dynasty: '唐',
    genre: '七言律诗',
    image: 'poem-deng-gao.png',
    text: [
      '风急天高猿啸哀，渚清沙白鸟飞回。',
      '无边落木萧萧下，不尽长江滚滚来。',
      '万里悲秋常作客，百年多病独登台。',
      '艰难苦恨繁霜鬓，潦倒新停浊酒杯。',
    ],
    keyLine: '无边落木萧萧下，不尽长江滚滚来。',
    annotation: [
      { word: '渚', meaning: '水中小块陆地' },
      { word: '落木', meaning: '落叶' },
      { word: '繁霜鬓', meaning: '两鬓白发繁多' },
      { word: '潦倒', meaning: '衰颓失意' },
    ],
    background:
      '此诗作于大历二年（767 年）秋，杜甫在夔州重九登高时所作。全诗八句皆对，被后人誉为「古今七律第一」。',
    interpretation:
      '前半写景：风、天、猿、渚、沙、鸟与落木长江，构成苍凉阔大的秋景；后半抒情：万里、百年、多病、独登，层层加重身世之悲。',
    moods: ['autumn', 'grand'],
    tags: ['悲秋', '登高', '苍凉'],
  },
  {
    id: 'shui-diao',
    title: '水调歌头·明月几时有',
    author: '苏轼',
    dynasty: '宋',
    genre: '词',
    excerpt: true,
    image: 'poem-shui-diao.png',
    text: [
      '明月几时有？把酒问青天。',
      '不知天上宫阙，今夕是何年。',
      '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
      '起舞弄清影，何似在人间。',
      '……但愿人长久，千里共婵娟。',
    ],
    keyLine: '但愿人长久，千里共婵娟。',
    annotation: [
      { word: '把酒', meaning: '端起酒杯' },
      { word: '琼楼玉宇', meaning: '指月宫中的楼阁' },
      { word: '婵娟', meaning: '指月亮' },
    ],
    background:
      '此词写于熙宁九年（1076 年）中秋，苏轼在密州任上，与弟弟苏辙已七年未聚。词以咏月为线索，表达对亲人的思念与超然的人生态度。',
    interpretation:
      '上阕由问月而欲「乘风归去」，下阕转出「但愿人长久，千里共婵娟」的豁达祝愿，把个人离愁升华为对普天下人的祝福。',
    moods: ['moon'],
    tags: ['中秋', '怀人', '豁达'],
  },
  {
    id: 'tian-jing',
    title: '天净沙·秋思',
    author: '马致远',
    dynasty: '元',
    genre: '曲',
    image: 'poem-tian-jing-sha.png',
    text: [
      '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。',
      '夕阳西下，断肠人在天涯。',
    ],
    keyLine: '夕阳西下，断肠人在天涯。',
    annotation: [
      { word: '昏鸦', meaning: '黄昏时的乌鸦' },
      { word: '断肠人', meaning: '形容极度悲伤的人，此处指漂泊天涯的游子' },
    ],
    background:
      '《天净沙·秋思》是元代散曲中的名篇，马致远以九个名词意象并列，勾勒出秋日黄昏游子漂泊的画面，被后人称为「秋思之祖」。',
    interpretation:
      '前三句以九组名词意象密集铺陈，不着一字抒情而秋意自浓；末句「断肠人在天涯」点醒全篇，让所有景物都染上游子的悲凉。',
    moods: ['autumn'],
    tags: ['羁旅', '秋思', '游子'],
  },
  {
    id: 'huan-xi',
    title: '浣溪沙·一曲新词酒一杯',
    author: '晏殊',
    dynasty: '宋',
    genre: '词',
    image: 'poem-huan-xi.png',
    text: [
      '一曲新词酒一杯，去年天气旧亭台。',
      '夕阳西下几时回？',
      '无可奈何花落去，似曾相识燕归来。',
      '小园香径独徘徊。',
    ],
    keyLine: '无可奈何花落去，似曾相识燕归来。',
    annotation: [
      { word: '香径', meaning: '落花飘香的小路' },
      { word: '徘徊', meaning: '来回走动' },
    ],
    background:
      '此词为晏殊的代表作之一。词人在暮春时节独游小园，由眼前景物联想到时光流转，抒写对年华易逝的怅惘。',
    interpretation:
      '「无可奈何花落去，似曾相识燕归来」对仗工整，以花落、燕归写出自然规律与人事无常的对照；末句「独徘徊」把怅惘落到具体的身影上。',
    moods: ['spring'],
    tags: ['惜春', '流年', '小园'],
  },
  {
    id: 'niao-ming-jian',
    title: '鸟鸣涧',
    author: '王维',
    dynasty: '唐',
    genre: '五言绝句',
    image: 'poem-niao-ming-jian.png',
    text: ['人闲桂花落，夜静春山空。', '月出惊山鸟，时鸣春涧中。'],
    keyLine: '月出惊山鸟，时鸣春涧中。',
    annotation: [
      { word: '涧', meaning: '山间流水的沟壑' },
      { word: '闲', meaning: '安静、悠闲' },
    ],
    background:
      '此诗是王维《皇甫岳云溪杂题》之一，写春夜山涧的幽静，以动写静，是「诗中有画」的代表作。',
    interpretation:
      '桂花落、鸟鸣声都是极细微的动景，正因春山之夜足够寂静，这些声响才被听见——诗人用「动」反衬「静」，写出空灵之境。',
    moods: ['spring', 'landscape'],
    tags: ['春夜', '空灵', '以动写静'],
  },
  {
    id: 'huang-he',
    title: '黄鹤楼',
    author: '崔颢',
    dynasty: '唐',
    genre: '七言律诗',
    image: 'poem-huang-he-lou.png',
    text: [
      '昔人已乘黄鹤去，此地空余黄鹤楼。',
      '黄鹤一去不复返，白云千载空悠悠。',
      '晴川历历汉阳树，芳草萋萋鹦鹉洲。',
      '日暮乡关何处是？烟波江上使人愁。',
    ],
    keyLine: '日暮乡关何处是？烟波江上使人愁。',
    annotation: [
      { word: '历历', meaning: '清晰可数' },
      { word: '萋萋', meaning: '草木茂盛的样子' },
      { word: '乡关', meaning: '故乡' },
    ],
    background:
      '崔颢游武昌时登黄鹤楼写下此诗。相传李白见此诗后叹服，称「眼前有景道不得，崔颢题诗在上头」（一说为后世附会），此诗被后世推为唐人七律的压卷之作。',
    interpretation:
      '诗以仙人乘鹤的传说起笔，写楼空云悠的怅惘；后两联由远眺晴川芳草，转入「日暮乡关」的乡愁，虚实相生。',
    moods: ['landscape', 'autumn'],
    tags: ['登楼', '乡愁', '怀古'],
  },
  {
    id: 'wang-yue',
    title: '望岳',
    author: '杜甫',
    dynasty: '唐',
    genre: '五言古诗',
    image: 'poem-wang-yue.png',
    text: [
      '岱宗夫如何？齐鲁青未了。',
      '造化钟神秀，阴阳割昏晓。',
      '荡胸生曾云，决眦入归鸟。',
      '会当凌绝顶，一览众山小。',
    ],
    keyLine: '会当凌绝顶，一览众山小。',
    annotation: [
      { word: '岱宗', meaning: '指泰山' },
      { word: '钟', meaning: '聚集' },
      { word: '荡胸', meaning: '云气涤荡胸襟，使心胸开阔' },
      { word: '会当', meaning: '定要' },
    ],
    background:
      '此诗是杜甫早年游齐赵时所作，写他遥望泰山时的感受，气势雄浑，是咏泰山的名篇。',
    interpretation:
      '诗以问句起，从「青未了」的绵延写到「割昏晓」的雄奇，最后以「会当凌绝顶，一览众山小」表达俯瞰群山的豪情，青年杜甫的胸襟尽在其中。',
    moods: ['grand'],
    tags: ['泰山', '壮志', '登临'],
  },
  {
    id: 'tengwang',
    title: '滕王阁序',
    author: '王勃',
    dynasty: '唐',
    genre: '骈文',
    excerpt: true,
    image: 'poem-tengwang.png',
    text: [
      '落霞与孤鹜齐飞，秋水共长天一色。',
      '渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。',
    ],
    keyLine: '落霞与孤鹜齐飞，秋水共长天一色。',
    annotation: [
      { word: '落霞', meaning: '晚霞' },
      { word: '孤鹜', meaning: '孤独的野鸭' },
      { word: '彭蠡', meaning: '鄱阳湖的古称' },
    ],
    background:
      '唐高宗上元二年（675 年）重阳，王勃路过洪州（今南昌），恰逢都督阎伯屿重修滕王阁落成设宴。王勃即席挥毫写下《秋日登洪府滕王阁饯别序》，即《滕王阁序》，成为骈文绝唱。',
    interpretation:
      '「落霞与孤鹜齐飞，秋水共长天一色」以四六对仗将黄昏江天之美凝为千古名句；后文由盛景转兴亡之叹，「关山难越，谁悲失路之人」寄寓身世感慨。',
    moods: ['grand', 'landscape'],
    tags: ['滕王阁', '壮阔', '骈文'],
  },
  {
    id: 'pipa',
    title: '琵琶行',
    author: '白居易',
    dynasty: '唐',
    genre: '乐府古诗',
    excerpt: true,
    image: 'poem-pipa.png',
    text: [
      '千呼万唤始出来，犹抱琵琶半遮面。',
      '转轴拨弦三两声，未成曲调先有情。',
      '同是天涯沦落人，相逢何必曾相识。',
    ],
    keyLine: '同是天涯沦落人，相逢何必曾相识。',
    annotation: [
      { word: '始', meaning: '才' },
      { word: '转轴拨弦', meaning: '调弦试音的动作' },
      { word: '沦落', meaning: '流落、漂泊失意' },
    ],
    background:
      '元和十年（815 年），白居易因上书言事被贬为江州司马。次年在浔阳江头送客，夜遇一位漂泊的琵琶女，听其身世有感，写下这首长诗，借他人之酒杯浇自己之块垒。',
    interpretation:
      '诗人以「大珠小珠落玉盘」等一连串比喻写尽琵琶声，再由琵琶女的「老大嫁作商人妇」联想到自己「同是天涯沦落人」，乐与哀、声与情交融成千古名篇。',
    moods: ['autumn'],
    tags: ['琵琶', '天涯沦落', '江头'],
  },
  {
    id: 'shi-zhi-sai-shang',
    title: '使至塞上',
    author: '王维',
    dynasty: '唐',
    genre: '五言律诗',
    image: 'poem-shi-zhi-sai-shang.png',
    text: [
      '单车欲问边，属国过居延。',
      '征蓬出汉塞，归雁入胡天。',
      '大漠孤烟直，长河落日圆。',
      '萧关逢候骑，都护在燕然。',
    ],
    keyLine: '大漠孤烟直，长河落日圆。',
    annotation: [
      { word: '单车', meaning: '轻车简从' },
      { word: '征蓬', meaning: '随风远飞的蓬草，诗人自喻漂泊' },
      { word: '孤烟', meaning: '边塞的烽烟' },
      { word: '长河', meaning: '黄河' },
    ],
    background:
      '开元二十五年（737 年），王维奉命以监察御史身份出使边塞，慰问将士、察访军情，途中写下此诗。当时诗人政治上受排挤，出塞之行带有失意与孤寂的意味。',
    interpretation:
      '前四句写行程与心境，以「征蓬」「归雁」自喻漂泊无依；后四句「大漠孤烟直，长河落日圆」以直线与圆勾勒边塞的苍茫壮阔，构图极简而气象万千，是写边塞的千古名句。',
    moods: ['grand', 'landscape'],
    tags: ['大漠', '边塞', '壮阔'],
  },
  {
    id: 'qing-yu-an',
    title: '青玉案·元夕',
    author: '辛弃疾',
    dynasty: '宋',
    genre: '词',
    excerpt: true,
    image: 'poem-qing-yu-an.png',
    text: [
      '东风夜放花千树，更吹落、星如雨。',
      '宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。',
      '蛾儿雪柳黄金缕，笑语盈盈暗香去。',
      '众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。',
    ],
    keyLine: '蓦然回首，那人却在，灯火阑珊处。',
    annotation: [
      { word: '花千树', meaning: '形容元宵灯火如繁花开满树' },
      { word: '玉壶', meaning: '一说指月亮，一说指精美的灯' },
      { word: '阑珊', meaning: '零落、稀疏' },
    ],
    background:
      '此词写元宵节灯月交辉、游人如织的热闹盛景。末句笔锋一转，写热闹之外独自立于灯火零落处的「那人」，一说寄寓词人自甘寂寞、不随流俗的人格追求。',
    interpretation:
      '上片极写元夕灯火之盛、游人之欢；下片「众里寻他千百度」写遍寻不得的怅惘，末句「蓦然回首，那人却在，灯火阑珊处」豁然开朗，成为千古名句。',
    moods: ['spring', 'moon'],
    tags: ['元宵', '灯火', '寻觅'],
  },
  {
    id: 'wu-ti',
    title: '无题·相见时难别亦难',
    author: '李商隐',
    dynasty: '唐',
    genre: '七言律诗',
    image: 'poem-wu-ti.png',
    text: [
      '相见时难别亦难，东风无力百花残。',
      '春蚕到死丝方尽，蜡炬成灰泪始干。',
      '晓镜但愁云鬓改，夜吟应觉月光寒。',
      '蓬山此去无多路，青鸟殷勤为探看。',
    ],
    keyLine: '春蚕到死丝方尽，蜡炬成灰泪始干。',
    annotation: [
      { word: '丝', meaning: '双关「思」，指思念' },
      { word: '蜡炬', meaning: '蜡烛' },
      { word: '蓬山', meaning: '神话中的海上仙山，喻指对方居所' },
      { word: '青鸟', meaning: '神话中为西王母传信的使者' },
    ],
    background:
      '李商隐的《无题》多以男女之情寄托人生感慨。此诗写离别之痛与至死不渝的相思，是「无题」诗中最著名的一首，历来有多种解读。',
    interpretation:
      '首句「相见时难别亦难」写尽离别的艰难，颔联以「春蚕丝尽」「蜡炬成灰」双关比喻至死不渝的深情，意象缠绵而决绝，是传诵千古的爱情名句。',
    moods: ['autumn', 'moon'],
    tags: ['离别', '相思', '至死不渝'],
  },
];

export const getPoem = (id: string) => POEMS.find((p) => p.id === id);

export const DYNASTIES = [...new Set(POEMS.map((p) => p.dynasty))];
export const AUTHORS = [...new Set(POEMS.map((p) => p.author))];
export const GENRES = [...new Set(POEMS.map((p) => p.genre))];
