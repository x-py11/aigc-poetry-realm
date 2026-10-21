import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, BookOpen, Info } from 'lucide-react';
import { getPoem, POEMS } from '@/data/poems';
import { getMood } from '@/data/moods';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { toggleFavorite } from '@/lib/store';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import PoemCard from '@/components/PoemCard';
import VerticalVerse from '@/components/VerticalVerse';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PoemPage() {
  const { id = '' } = useParams();
  const poem = getPoem(id);
  const [favorites, setFavorites] = usePersistedState<string[]>('favorites', []);

  if (!poem) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-serif text-xl text-foreground">未找到这首诗词</p>
        <p className="mt-2 text-sm text-muted-foreground">它可能已被移除，或链接有误。</p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/explore">返回诗词探索</Link>
        </Button>
      </div>
    );
  }

  const favorite = favorites.includes(poem.id);
  const related = POEMS.filter((p) => p.id !== poem.id && p.moods.some((m) => poem.moods.includes(m))).slice(0, 3);

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          返回诗词探索
        </Link>

        {/* 标题区 */}
        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-foreground sm:text-4xl">
              {poem.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {poem.author} · {poem.dynasty} · {poem.genre}
              {poem.excerpt && <span className="ml-2 text-xs text-accent">（节选）</span>}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setFavorites(toggleFavorite(poem.id))}
            className={cn('gap-2', favorite && 'border-accent/60 text-accent')}
            aria-pressed={favorite}
          >
            <Heart className={cn('size-4', favorite && 'fill-accent')} />
            {favorite ? '已收藏' : '收藏'}
          </Button>
        </div>

        {/* 重点句 + 竖排签名 */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-border/70 bg-card p-8 sm:p-10">
            <p className="mb-4 flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-primary/80">
              <span className="hairline-gold h-px w-8" aria-hidden="true" />
              重点诗句
            </p>
            <p className="font-serif text-2xl font-semibold leading-relaxed tracking-wide text-foreground sm:text-[32px]">
              {poem.keyLine}
            </p>
          </div>
          <div className="hidden rounded-2xl bg-deep p-6 lg:flex lg:items-center lg:justify-center">
            <VerticalVerse lines={poem.keyLine.split(/[，。]/).filter(Boolean)} lineClassName="text-lg" />
          </div>
        </div>

        {/* 诗词原文 */}
        <section className="mt-12" aria-label="诗词原文">
          <p className="mb-5 font-serif text-lg leading-loose tracking-widest text-foreground/90 sm:text-xl">
            {poem.text.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </section>

        {/* 注释 */}
        <section className="mt-12" aria-label="词语注释">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <BookOpen className="size-5 text-primary" aria-hidden="true" />
            词语注释
          </h2>
          <dl className="mt-5 space-y-3">
            {poem.annotation.map((a) => (
              <div key={a.word} className="flex flex-wrap gap-2 rounded-lg bg-card px-4 py-3 text-sm">
                <dt className="font-serif font-semibold text-primary">{a.word}</dt>
                <dd className="text-muted-foreground">：{a.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 背景与解读 */}
        <section className="mt-12 grid gap-5 md:grid-cols-2" aria-label="创作背景与意境解读">
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-foreground">创作背景</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{poem.background}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="font-serif text-lg font-semibold text-foreground">意境解读</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{poem.interpretation}</p>
          </div>
          <div className="md:col-span-2">
            <Badge variant="outline" className="gap-1.5 border-gold/50 text-gold">
              <Info className="size-3.5" aria-hidden="true" />
              创作背景与意境解读为编辑整理内容，供理解参考
            </Badge>
          </div>
        </section>

        {/* 意境标签 */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">相关意境：</span>
          {poem.moods.map((mId) => {
            const m = getMood(mId);
            if (!m) return null;
            return (
              <Link
                key={mId}
                to={`/explore?mood=${mId}`}
                className="rounded-full border border-border bg-card px-3.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {m.name}
              </Link>
            );
          })}
        </div>

        {/* 创作入口 */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-deep p-8 sm:p-10">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${img(poem.moods[0] ? `mood-${poem.moods[0]}.png` : 'mood-landscape.png')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/70 to-deep/40" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-serif text-xs tracking-[0.3em] text-gold">AI 诗词影像创作</p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-moon sm:text-2xl">
                将《{poem.title}》转化为影像
              </h2>
              <p className="mt-2 max-w-md text-sm text-moon/60">
                选择你偏爱的视觉风格与意境氛围，让这首诗成为一幅属于你的数字影像作品。
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 bg-moon text-deep hover:bg-moon/90">
              <Link to={`/create?poem=${poem.id}`}>
                <Sparkles className="size-4" aria-hidden="true" />
                开始创作
              </Link>
            </Button>
          </div>
        </div>

        {/* 相关推荐 */}
        {related.length > 0 && (
          <section className="mt-16" aria-label="相关诗词">
            <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">同境之诗 · 或许你也喜欢</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <PoemCard
                  key={p.id}
                  poem={p}
                  favorite={favorites.includes(p.id)}
                  onToggleFavorite={(pid) => setFavorites(toggleFavorite(pid))}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
