// EXPORTS: StyleId, STYLE_OPTIONS, ATMOSPHERE_OPTIONS, RATIO_OPTIONS,
// SOUND_OPTIONS, IXWork, FEATURED_WORKS, COMMUNITY_WORKS, ALL_WORKS, getWork,
// getStyleName, getStyleMeta, IMAGE_BY_STYLE, workImageCandidates
export type StyleId = 'digital' | 'cinematic' | 'ink' | 'surreal';

export const STYLE_OPTIONS: { id: StyleId; name: string; desc: string }[] = [
  { id: 'digital', name: '东方数字绘画', desc: '细腻的数字笔触，青绿山水与光影层次' },
  { id: 'cinematic', name: '写实电影感', desc: '电影级光影与景深，身临其境的画面' },
  { id: 'ink', name: '水墨意境', desc: '笔墨晕染与留白，写意的诗意表达' },
  { id: 'surreal', name: '超现实数字艺术', desc: '梦幻意象与粒子辉光，超越现实' },
];

export const ATMOSPHERE_OPTIONS: { id: string; name: string }[] = [
  { id: '清幽', name: '清幽' },
  { id: '浪漫', name: '浪漫' },
  { id: '苍茫', name: '苍茫' },
  { id: '壮阔', name: '壮阔' },
  { id: '空灵', name: '空灵' },
];

export const RATIO_OPTIONS: { id: string; name: string }[] = [
  { id: '16:9', name: '16:9 横屏' },
  { id: '9:16', name: '9:16 竖屏' },
  { id: '1:1', name: '1:1 方形' },
];

export const SOUND_OPTIONS: { id: string; name: string; desc: string }[] = [
  { id: '朗诵', name: '诗词朗诵', desc: '专业配音逐句诵读' },
  { id: '配乐', name: '氛围配乐', desc: '与意境匹配的器乐' },
  { id: '静音', name: '无声音', desc: '纯影像呈现' },
];

export interface IXWork {
  id: string;
  poemId: string;
  title: string;
  style: StyleId;
  mood: string;
  ratio: string;
  sound: string;
  image: string;
  creator: string;
  likes: number;
}

export const FEATURED_WORKS: IXWork[] = [
  { id: 'w-chun-jiang', poemId: 'chun-jiang', title: '春江月夜·水墨长卷', style: 'ink', mood: 'moon', ratio: '16:9', sound: '朗诵 + 配乐', image: 'work-jianghua.jpg', creator: '云舟', likes: 1286 },
  { id: 'w-shan-ju', poemId: 'shan-ju', title: '空山新雨·松间月', style: 'digital', mood: 'landscape', ratio: '16:9', sound: '氛围配乐', image: 'work-shanju.jpg', creator: '青梧', likes: 946 },
  { id: 'w-jin-jiu', poemId: 'jin-jiu', title: '黄河天上来·将进酒', style: 'cinematic', mood: 'grand', ratio: '16:9', sound: '朗诵 + 配乐', image: 'work-jinjiu.jpg', creator: '墨白', likes: 2103 },
  { id: 'w-shui-diao', poemId: 'shui-diao', title: '千里共婵娟·云上宫阙', style: 'surreal', mood: 'moon', ratio: '9:16', sound: '朗诵 + 配乐', image: 'work-shuidiao.jpg', creator: '闻钟', likes: 1672 },
  { id: 'w-jiang-xue', poemId: 'jiang-xue', title: '寒江独钓·江雪', style: 'ink', mood: 'autumn', ratio: '16:9', sound: '氛围配乐', image: 'work-jiangxue.jpg', creator: '松间照', likes: 854 },
  { id: 'w-wang-lu', poemId: 'wang-lu', title: '飞流直下·庐山瀑布', style: 'digital', mood: 'grand', ratio: '16:9', sound: '氛围配乐', image: 'work-pubu.jpg', creator: '小满', likes: 1108 },
];

export const COMMUNITY_WORKS: IXWork[] = [
  { id: 'c-feng-qiao', poemId: 'feng-qiao', title: '枫桥夜泊·客船灯火', style: 'cinematic', mood: 'autumn', ratio: '16:9', sound: '氛围配乐', image: 'work-fengqiao.jpg', creator: '半山', likes: 432 },
  { id: 'c-huan-xi', poemId: 'huan-xi', title: '小园香径·燕归来', style: 'surreal', mood: 'spring', ratio: '1:1', sound: '无声音', image: 'work-huanxi.jpg', creator: '素弦', likes: 289 },
  { id: 'c-jin-jiu', poemId: 'jin-jiu', title: '君不见·黄河之水', style: 'cinematic', mood: 'grand', ratio: '16:9', sound: '朗诵', image: 'work-jinjiu.jpg', creator: '长风', likes: 671 },
  { id: 'c-jiang-xue', poemId: 'jiang-xue', title: '独钓寒江·一蓑烟雨', style: 'ink', mood: 'autumn', ratio: '16:9', sound: '无声音', image: 'work-jiangxue.jpg', creator: '白鹭', likes: 195 },
  { id: 'c-shan-ju', poemId: 'shan-ju', title: '松间明月·清泉流', style: 'digital', mood: 'landscape', ratio: '16:9', sound: '氛围配乐', image: 'work-shanju.jpg', creator: '归云', likes: 342 },
  { id: 'c-niao-ming', poemId: 'niao-ming-jian', title: '人闲桂花落·春涧', style: 'surreal', mood: 'spring', ratio: '1:1', sound: '氛围配乐', image: 'mood-spring.png', creator: '拾光', likes: 158 },
  { id: 'c-feng-qiao-2', poemId: 'feng-qiao', title: '姑苏城外·夜半钟声', style: 'ink', mood: 'autumn', ratio: '16:9', sound: '氛围配乐', image: 'work-fengqiao.jpg', creator: '晚亭', likes: 224 },
  { id: 'c-wang-lu', poemId: 'wang-lu', title: '遥望香炉·紫烟生', style: 'cinematic', mood: 'grand', ratio: '16:9', sound: '朗诵', image: 'work-pubu.jpg', creator: '行云', likes: 306 },
];

export const ALL_WORKS: IXWork[] = [...FEATURED_WORKS, ...COMMUNITY_WORKS];

export const getWork = (id: string) => ALL_WORKS.find((w) => w.id === id);

export const getStyleMeta = (id: StyleId) => STYLE_OPTIONS.find((s) => s.id === id);
export const getStyleName = (id: StyleId) => getStyleMeta(id)?.name ?? id;

// 生成影像时按视觉风格映射的本地示例素材（模拟结果）
export const IMAGE_BY_STYLE: Record<StyleId, string[]> = {
  digital: ['work-shanju.jpg', 'work-pubu.jpg'],
  cinematic: ['work-jinjiu.jpg', 'work-fengqiao.jpg'],
  ink: ['work-jianghua.jpg', 'work-jiangxue.jpg'],
  surreal: ['work-shuidiao.jpg', 'work-huanxi.jpg'],
};

const IMAGE_BY_MOOD: Record<string, string[]> = {
  moon: ['work-shuidiao.jpg', 'work-jianghua.jpg', 'work-deng-huo.png'],
  landscape: ['work-shanju.jpg', 'work-pubu.jpg'],
  spring: ['mood-spring.png', 'work-huanxi.jpg'],
  autumn: ['work-fengqiao.jpg', 'work-jiangxue.jpg'],
  grand: ['work-jinjiu.jpg', 'work-da-mo.png', 'work-pubu.jpg'],
};

export const workImageCandidates = (style: StyleId, mood?: string) => [
  ...new Set([...(IMAGE_BY_STYLE[style] ?? IMAGE_BY_STYLE.ink), ...(mood ? IMAGE_BY_MOOD[mood] ?? [] : [])]),
];
