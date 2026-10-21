import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import type { IXPoem } from '@/data/poems';
import { img } from '@/lib/base';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface PoemCardProps {
  poem: IXPoem;
  favorite?: boolean;
  onToggleFavorite?: (poemId: string) => void;
  className?: string;
}

// 诗词图文卡：整幅配图铺满卡片，诗文直接叠加在图片的空白区域；暂无配图的诗仅展示文字
export default function PoemCard({ poem, favorite = false, onToggleFavorite, className }: PoemCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/80 bg-card transition-all hover:border-primary/40 hover:shadow-md',
        className,
      )}
    >
      {poem.image ? (
        <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: '235 / 100' }}>
          <Link
            to={`/poem/${poem.id}`}
            className="absolute inset-0 focus-visible:outline-none"
            aria-label={`阅读《${poem.title}》`}
          >
            <Image
              src={img(poem.image)}
              alt={poem.title}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* 诗文固定在图片右上区，与右下角标签区分离 */}
            <div className="absolute right-4 top-4 w-[55%] text-left">
              <div className="hairline-gold mb-2 h-px w-8" aria-hidden="true" />
              <p className="text-[11px] font-medium tracking-wide text-foreground/60">
                {poem.author} · {poem.dynasty} · {poem.genre}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {poem.title}
              </h3>
              <p className="mt-1.5 font-serif text-[13px] leading-relaxed text-foreground/80 line-clamp-3">
                {poem.keyLine}
              </p>
            </div>
          </Link>
          {/* 标签与操作区与正文链接同级，避免按钮和链接互相嵌套 */}
          <div className="absolute bottom-3 right-4 z-10 flex flex-col items-end gap-2">
            <div className="flex flex-wrap justify-end gap-1">
              {poem.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 bg-card/60 px-2 py-0.5 text-[10px] text-foreground/75"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/poem/${poem.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-card/55 px-2 py-1 text-[11px] font-medium text-primary backdrop-blur-sm"
              >
                阅读诗境
                <ArrowRight className="size-3" aria-hidden="true" />
              </Link>
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={() => onToggleFavorite(poem.id)}
                  className={cn(
                    'rounded-full bg-card/55 p-1 backdrop-blur-sm transition-colors',
                    favorite ? 'text-accent' : 'text-foreground/40 hover:text-accent',
                  )}
                  aria-label={favorite ? `取消收藏《${poem.title}》` : `收藏《${poem.title}》`}
                  aria-pressed={favorite}
                >
                  <Heart className={cn('size-3.5', favorite && 'fill-accent')} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-5">
          <div className="hairline-gold mb-3 h-px w-8" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {poem.author} · {poem.dynasty} · {poem.genre}
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                <Link to={`/poem/${poem.id}`} className="focus-visible:outline-none">
                  {poem.title}
                </Link>
              </h3>
            </div>
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(poem.id);
                }}
                className={cn(
                  'relative z-10 rounded-full p-1.5 transition-colors',
                  favorite ? 'text-accent' : 'text-muted-foreground/50 hover:text-accent',
                )}
                aria-label={favorite ? `取消收藏《${poem.title}》` : `收藏《${poem.title}》`}
                aria-pressed={favorite}
              >
                <Heart className={cn('size-4', favorite && 'fill-accent')} />
              </button>
            )}
          </div>
          <p className="mt-2.5 font-serif text-sm leading-relaxed text-foreground/85 line-clamp-3">{poem.keyLine}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {poem.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
            <Link
              to={`/poem/${poem.id}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              阅读诗境
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <span className="text-[11px] text-muted-foreground/60">{poem.genre}</span>
          </div>
        </div>
      )}
    </article>
  );
}
