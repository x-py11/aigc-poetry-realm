import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Sparkles, Wand2, Play } from 'lucide-react';
import { POEMS, getPoem } from '@/data/poems';
import { getMood } from '@/data/moods';
import {
  STYLE_OPTIONS,
  ATMOSPHERE_OPTIONS,
  RATIO_OPTIONS,
  SOUND_OPTIONS,
  workImageCandidates,
  getStyleName,
  type StyleId,
} from '@/data/works';
import { addWork, getMyWorks, nextWorkId, nowIso, type IMyWork } from '@/lib/store';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionHeading from '@/components/SectionHeading';
import VerticalVerse from '@/components/VerticalVerse';
import { toast } from 'sonner';

const GENERATE_PHASES = ['解析诗境', '构建视觉结构', '渲染影像', '合成声音'];

const PROMPT_IDEAS = [
  '大漠孤烟直，长河落日圆｜苍茫水墨',
  '春江潮水连海平，海上明月共潮生｜青绿山水',
  '蓦然回首，那人却在，灯火阑珊处｜元宵灯夜',
  '春蚕到死丝方尽，蜡炬成灰泪始干｜烛影深红',
  '落霞与孤鹜齐飞，秋水共长天一色｜暮色长卷',
  '孤舟蓑笠翁，独钓寒江雪｜寒江留白',
];

export default function CreatePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initPoemId =
    params.get('poem') && getPoem(params.get('poem') as string) ? (params.get('poem') as string) : POEMS[0].id;
  const initPoem = getPoem(initPoemId) ?? POEMS[0];
  const [poemId, setPoemId] = useState(initPoemId);
  const [poemQuery, setPoemQuery] = useState('');
  const [prompt, setPrompt] = useState(() => `${initPoem.keyLine}｜${getStyleName('digital')}`);
  const [style, setStyle] = useState<StyleId>('digital');
  const [atmosphere, setAtmosphere] = useState(ATMOSPHERE_OPTIONS[0].id);
  const [ratio, setRatio] = useState(RATIO_OPTIONS[0].id);
  const [sound, setSound] = useState(SOUND_OPTIONS[0].id);
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(0);
  const [works, setWorks] = useState<IMyWork[]>(() => getMyWorks());
  const generateTimerRef = useRef<number | null>(null);

  const poem = getPoem(poemId) ?? POEMS[0];
  const mood = getMood(poem.moods[0] ?? 'landscape');
  const previewImage = mood ? mood.image : 'mood-landscape.png';

  useEffect(
    () => () => {
      if (generateTimerRef.current !== null) {
        window.clearInterval(generateTimerRef.current);
      }
    },
    [],
  );

  const filteredPoems = useMemo(() => {
    const kw = poemQuery.trim().toLowerCase();
    if (!kw) return POEMS;
    return POEMS.filter((p) => [p.title, p.author, p.dynasty, ...p.text].join(' ').toLowerCase().includes(kw));
  }, [poemQuery]);

  const handleGenerate = () => {
    if (generating) return;
    const promptText = prompt.trim();
    if (!promptText) {
      toast.error('请先输入一句诗境或画面描述');
      return;
    }

    setGenerating(true);
    setStage(0);
    let s = 0;
    generateTimerRef.current = window.setInterval(() => {
      s += 1;
      if (s < GENERATE_PHASES.length) {
        setStage(s);
      } else {
        if (generateTimerRef.current !== null) {
          window.clearInterval(generateTimerRef.current);
          generateTimerRef.current = null;
        }
        const candidates = workImageCandidates(style, poem.moods[0]);
        const seed = [...`${promptText}-${atmosphere}-${style}`].reduce(
          (sum, char) => sum + char.charCodeAt(0),
          0,
        );
        const image = candidates[seed % candidates.length] ?? candidates[0];
        const work: IMyWork = {
          id: nextWorkId(),
          poemId: poem.id,
          title: `${poem.title} · ${getStyleName(style)}`,
          style,
          mood: poem.moods[0] ?? 'landscape',
          ratio,
          sound: SOUND_OPTIONS.find((o) => o.id === sound)?.name ?? '氛围配乐',
          image,
          creator: '我',
          createdAt: nowIso(),
          published: false,
          prompt: promptText,
          atmosphere,
        };
        addWork(work);
        setWorks(getMyWorks());
        setGenerating(false);
        navigate(`/preview/${work.id}`);
      }
    }, 850);
  };

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3.5 py-1.5 text-xs transition-colors',
      active
        ? 'border-gold/60 bg-gold/10 text-gold'
        : 'border-white/10 bg-white/5 text-moon/55 hover:border-gold/40 hover:text-gold',
    );

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          返回诗词探索
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-primary/80">
              <span className="hairline-gold h-px w-8" aria-hidden="true" />
              AI 诗词影像创作
            </p>
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground sm:text-3xl">
              灵感即刻成片
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            输入一首诗或一句诗境，选择风格与比例，AI 将其转化为你的专属影像作品（原型为模拟生成）。
          </p>
        </div>

        {/* 创作工作台（深色沉浸，即梦风格） */}
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-moon/10 bg-gradient-to-b from-deep via-deep to-deep/95 shadow-2xl">
          <div className="p-6 sm:p-10">
            {/* 选择诗词 */}
            <section aria-label="选择诗词">
              <h2 className="mb-3 text-xs font-medium tracking-[0.22em] text-moon/40">选择诗词</h2>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-moon/30"
                    aria-hidden="true"
                  />
                  <Input
                    value={poemQuery}
                    onChange={(e) => setPoemQuery(e.target.value)}
                    placeholder="搜索诗词标题或作者…"
                    className="h-10 border-white/10 bg-white/5 pl-9 text-moon placeholder:text-moon/30 focus:border-gold/40 focus:ring-gold/20"
                    aria-label="搜索诗词"
                  />
                </div>
                <select
                  id="poem-select"
                  value={poem.id}
                  onChange={(e) => {
                    const id = e.target.value;
                    setPoemId(id);
                    const np = getPoem(id);
                    if (np) setPrompt(`${np.keyLine}｜${getStyleName(style)}`);
                  }}
                  className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-moon outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/20 sm:min-w-64"
                  aria-label="选择诗词"
                >
                  {filteredPoems.map((p) => (
                    <option key={p.id} value={p.id} className="bg-card text-foreground">
                      {p.title}（{p.author} · {p.dynasty}）
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-white/5 bg-white/3 px-4 py-3">
                <p className="font-serif text-sm font-semibold text-moon">{poem.title}</p>
                <p className="text-xs text-moon/40">
                  {poem.author} · {poem.dynasty} · {poem.genre}
                </p>
                <p className="ml-auto hidden font-serif text-xs text-moon/45 sm:block">{poem.text[0]}</p>
              </div>
            </section>

            {/* 提示词输入 */}
            <section className="mt-8" aria-label="提示词">
              <h2 className="mb-3 text-xs font-medium tracking-[0.22em] text-moon/40">输入提示词</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 font-serif text-[15px] leading-relaxed text-moon outline-none placeholder:text-moon/25 focus:border-gold/40 focus:ring-2 focus:ring-gold/20"
                placeholder="描述你想要的画面，例如：大漠孤烟直，长河落日圆｜苍茫水墨…"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {PROMPT_IDEAS.map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => setPrompt(idea)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-moon/55 transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </section>

            {/* 参数选择 */}
            <section className="mt-8 space-y-5" aria-label="参数选择">
              <div>
                <h2 className="mb-2.5 text-xs font-medium tracking-[0.22em] text-moon/40">视觉风格</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {STYLE_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id)}
                      aria-pressed={style === s.id}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-colors',
                        style === s.id
                          ? 'border-gold/50 bg-gold/10'
                          : 'border-white/10 bg-white/5 hover:border-gold/40',
                      )}
                    >
                      <p className={cn('text-sm font-medium', style === s.id ? 'text-gold' : 'text-moon')}>{s.name}</p>
                      <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-moon/40">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2.5 text-xs font-medium tracking-[0.22em] text-moon/40">意境氛围</h2>
                <div className="flex flex-wrap gap-2">
                  {ATMOSPHERE_OPTIONS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAtmosphere(a.id)}
                      aria-pressed={atmosphere === a.id}
                      className={chip(atmosphere === a.id)}
                    >
                      {a.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2.5 text-xs font-medium tracking-[0.22em] text-moon/40">画面比例</h2>
                <div className="flex flex-wrap gap-2">
                  {RATIO_OPTIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRatio(r.id)}
                      aria-pressed={ratio === r.id}
                      className={chip(ratio === r.id)}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2.5 text-xs font-medium tracking-[0.22em] text-moon/40">声音</h2>
                <div className="flex flex-wrap gap-2">
                  {SOUND_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSound(s.id)}
                      aria-pressed={sound === s.id}
                      className={chip(sound === s.id)}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <Button
              variant="ghost"
              size="lg"
              className="mt-8 h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-gold/90 via-gold to-amber-400 font-medium text-deep hover:from-gold hover:to-amber-300"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Wand2 className="size-4 animate-pulse" aria-hidden="true" />
                  正在生成…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" aria-hidden="true" />
                  生成诗词影像
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-moon/30">原型演示：生成过程为本地模拟，结果由示例素材呈现</p>
          </div>

          {/* 预览画布（深色沉浸） */}
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-t border-moon/10 bg-black/25">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700"
              style={{ backgroundImage: `url(${img(previewImage)})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-transparent to-deep/90" aria-hidden="true" />

            <div className="relative flex w-full flex-col items-center px-6 py-10">
              <div
                className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-moon/10 shadow-2xl"
                style={{ aspectRatio: ratio === '9:16' ? '9 / 16' : ratio === '1:1' ? '1 / 1' : '16 / 9', maxHeight: 520 }}
              >
                <Image
                  src={img(previewImage)}
                  alt={`${poem.title} · ${getStyleName(style)}风格预览`}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/30" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <VerticalVerse
                    lines={poem.keyLine.split(/[，。]/).filter(Boolean).slice(0, 4)}
                    className="gap-8"
                    lineClassName="text-xl sm:text-2xl"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div>
                    <p className="font-serif text-sm font-semibold text-moon">{poem.title}</p>
                    <p className="text-xs text-moon/60">
                      {getStyleName(style)} · {ATMOSPHERE_OPTIONS.find((a) => a.id === atmosphere)?.name ?? atmosphere}
                    </p>
                  </div>
                  <span className="rounded-full border border-moon/20 bg-deep/40 px-2.5 py-1 text-[11px] text-moon/70">
                    {ratio}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-moon/40">
                预览画面随诗词意境与视觉风格变化 · 生成后自动进入作品预览
              </p>
            </div>

            {/* 生成进度覆盖层 */}
            <AnimatePresence>
              {generating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-deep/85 backdrop-blur-sm"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
                    className="flex size-16 items-center justify-center rounded-full border border-gold/40"
                  >
                    <Wand2 className="size-7 text-gold" aria-hidden="true" />
                  </motion.div>
                  <p className="font-serif text-lg text-moon">{GENERATE_PHASES[stage]}</p>
                  <div className="h-1 w-48 overflow-hidden rounded-full bg-moon/15">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${((stage + 1) / GENERATE_PHASES.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-moon/40">AI 正在把这首诗，变成你眼前的影像</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 灵感作品网格 */}
        <section className="mt-16" aria-label="我的创作">
          <SectionHeading
            eyebrow="我的创作"
            title="灵感即刻成片"
            description="你生成的每一首影像，都会收录在这里，随时回看与分享。"
            className="mb-8"
          />
          {works.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {works.map((w) => {
                const p = getPoem(w.poemId);
                return (
                  <Link
                    key={w.id}
                    to={`/preview/${w.id}`}
                    className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img(w.image)}
                        alt={w.title}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="font-serif text-sm font-semibold text-moon">{w.title}</p>
                        <p className="mt-0.5 truncate text-[11px] text-moon/60">
                          {p ? p.keyLine : ''} · {getStyleName(w.style)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground">
                        {w.ratio}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        成片
                        <Play className="size-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/50 p-12 text-center">
              <p className="font-serif text-sm text-muted-foreground">
                还没有作品，输入一句诗境，生成你的第一首影像吧。
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
