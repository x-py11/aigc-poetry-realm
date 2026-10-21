import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { POEMS } from '@/data/poems';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { toggleFavorite } from '@/lib/store';
import PoemCard from '@/components/PoemCard';
import SectionHeading from '@/components/SectionHeading';
import HScroll from '@/components/HScroll';

const HOME_POEM_IDS = [
  'pipa',
  'shi-zhi-sai-shang',
  'qing-yu-an',
  'feng-qiao',
  'shui-diao',
  'wang-lu',
  'chun-jiang',
  'jing-ye-si',
  'shan-ju',
  'huan-xi',
  'wu-ti',
  'tengwang',
  'huang-he',
  'tian-jing',
  'jiang-xue',
  'jin-jiu',
  'deng-gao',
  'niao-ming-jian',
  'wang-yue',
];

export default function ClassicsSection() {
  const [favorites, setFavorites] = usePersistedState<string[]>('favorites', []);
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);
  const poems = HOME_POEM_IDS.map((id) => POEMS.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const rowOne = poems.slice(0, Math.ceil(poems.length / 2));
  const rowTwo = poems.slice(Math.ceil(poems.length / 2));

  // 滚动视差：随页面下滑，第一排从左至右、第二排从右至左，缓缓交错展开
  useEffect(() => {
    const section = sectionRef.current;
    const rowOneEl = rowOneRef.current;
    const rowTwoEl = rowTwoRef.current;
    if (!section || !rowOneEl || !rowTwoEl) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 板块顶部从视口底部升至视口顶部：raw 0 → 1
      const raw = Math.max(0, Math.min(1, 1 - rect.top / vh));
      // 交错系数：板块刚进入视口时展开到最大，完全进入视口后归零，静止时两排边界对齐
      const progress = Math.sin(raw * Math.PI);
      const offset = 60;
      rowOneEl.style.transform = `translateX(${progress * offset}px)`;
      rowTwoEl.style.transform = `translateX(${-progress * offset}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-border/60 bg-card/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="经典诗词"
            title="千年诗心，等你来读"
            description="诗词原文与注释均为真实经典内容；创作背景与意境解读为编辑整理，供参考。"
          />
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline" to="/explore?dynasty=唐">
              按朝代
            </Link>
            <Link className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline" to="/explore?author=李白">
              按作者
            </Link>
            <Link className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline" to="/explore?genre=词">
              按体裁
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div ref={rowOneRef} className="will-change-transform">
            <HScroll>
              {rowOne.map((poem) => (
                <PoemCard
                  key={poem.id}
                  poem={poem}
                  favorite={favorites.includes(poem.id)}
                  onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                  className="w-[420px]"
                />
              ))}
            </HScroll>
          </div>
          <div ref={rowTwoRef} className="will-change-transform">
            <HScroll>
              {rowTwo.map((poem) => (
                <PoemCard
                  key={poem.id}
                  poem={poem}
                  favorite={favorites.includes(poem.id)}
                  onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                  className="w-[420px]"
                />
              ))}
            </HScroll>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            浏览全部诗词
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
