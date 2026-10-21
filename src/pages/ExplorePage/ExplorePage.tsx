import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX, Search, X } from 'lucide-react';
import { POEMS, DYNASTIES, AUTHORS, GENRES } from '@/data/poems';
import { MOODS, getMood } from '@/data/moods';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { toggleFavorite } from '@/lib/store';
import { cn } from '@/lib/utils';
import PoemCard from '@/components/PoemCard';
import SectionHeading from '@/components/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const selectCls =
  'h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20';

export default function ExplorePage() {
  const [params, setParams] = useSearchParams();
  const [favorites, setFavorites] = usePersistedState<string[]>('favorites', []);

  const mood = params.get('mood') ?? '';
  const dynasty = params.get('dynasty') ?? '';
  const author = params.get('author') ?? '';
  const genre = params.get('genre') ?? '';
  const q = params.get('q') ?? '';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const results = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return POEMS.filter((p) => {
      if (mood && !p.moods.includes(mood)) return false;
      if (dynasty && p.dynasty !== dynasty) return false;
      if (author && p.author !== author) return false;
      if (genre && p.genre !== genre) return false;
      if (kw) {
        const hay = [p.title, p.author, p.dynasty, p.genre, ...p.text, ...p.tags]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [mood, dynasty, author, genre, q]);

  const activeCount = [mood, dynasty, author, genre, q.trim()].filter(Boolean).length;
  const moodMeta = getMood(mood);

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="诗词探索"
          title={moodMeta ? `${moodMeta.name} · 与你共鸣的诗` : '在诗海里，找到触动你的那一句'}
          description={
            moodMeta
              ? `「${moodMeta.verse}」——${moodMeta.description}`
              : '从意境、朝代、作者与体裁出发，探索真实、准确的经典诗词。'
          }
          className="mb-10"
        />

        {/* 意境分类 */}
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="意境分类">
          <button
            type="button"
            onClick={() => update('mood', '')}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              !mood
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            全部意境
          </button>
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => update('mood', m.id)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                mood === m.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
              )}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* 筛选与搜索 */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={q}
              onChange={(e) => update('q', e.target.value)}
              placeholder="搜索诗句、标题、作者…"
              className="h-10 w-64 pl-9"
              aria-label="搜索诗词"
            />
            {q && (
              <button
                type="button"
                onClick={() => update('q', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="清除搜索"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <label className="sr-only" htmlFor="f-dynasty">朝代</label>
          <select id="f-dynasty" value={dynasty} onChange={(e) => update('dynasty', e.target.value)} className={selectCls} aria-label="按朝代筛选">
            <option value="">全部朝代</option>
            {DYNASTIES.map((d) => (
              <option key={d} value={d}>{d}代</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="f-author">作者</label>
          <select id="f-author" value={author} onChange={(e) => update('author', e.target.value)} className={selectCls} aria-label="按作者筛选">
            <option value="">全部作者</option>
            {AUTHORS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="f-genre">体裁</label>
          <select id="f-genre" value={genre} onChange={(e) => update('genre', e.target.value)} className={selectCls} aria-label="按体裁筛选">
            <option value="">全部体裁</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1.5 text-muted-foreground">
              <X className="size-3.5" aria-hidden="true" />
              清除筛选（{activeCount}）
            </Button>
          )}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">共 {results.length} 首诗词</p>

        {results.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((poem) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                favorite={favorites.includes(poem.id)}
                onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <SearchX className="size-10 text-muted-foreground/50" aria-hidden="true" />
            <p className="mt-4 font-serif text-lg text-foreground">没有找到匹配的诗词</p>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              试试更换意境、调整筛选条件，或换一个关键词。
            </p>
            <Button variant="outline" className="mt-6" onClick={clearAll}>
              清除全部筛选
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
