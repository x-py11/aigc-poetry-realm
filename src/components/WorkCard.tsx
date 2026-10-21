import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { IXWork } from '@/data/works';
import { getStyleName } from '@/data/works';
import { getPoem } from '@/data/poems';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';

interface WorkCardProps {
  work: IXWork;
  liked?: boolean;
  onToggleLike?: (workId: string) => void;
  className?: string;
}

export default function WorkCard({ work, liked = false, onToggleLike, className }: WorkCardProps) {
  const poem = getPoem(work.poemId);

  return (
    <article
      className={cn('group relative overflow-hidden rounded-xl border border-border/70 bg-card', className)}
    >
      <Link
        to={`/preview/${work.id}`}
        className="relative block focus-visible:outline-none"
        aria-label={`查看作品《${work.title}》`}
      >
        <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: work.ratio }}>
          <Image
            src={img(work.image)}
            alt={`${work.title} · 影像预览`}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent opacity-80" />
          <div className="absolute left-3 top-3">
            <Badge className="border-0 bg-deep/55 text-moon backdrop-blur-sm">{getStyleName(work.style)}</Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-base font-semibold text-moon">{work.title}</h3>
            {poem && (
              <p className="mt-0.5 text-xs text-moon/70">
                {poem.title} · {poem.author}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-xs text-muted-foreground">{work.creator}</span>
        {onToggleLike && (
          <button
            type="button"
            onClick={() => onToggleLike(work.id)}
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors',
              liked ? 'text-accent' : 'text-muted-foreground hover:text-accent',
            )}
            aria-label={liked ? `取消点赞《${work.title}》` : `点赞《${work.title}》`}
            aria-pressed={liked}
          >
            <Heart className={cn('size-3.5', liked && 'fill-accent')} />
            {work.likes + (liked ? 1 : 0)}
          </button>
        )}
      </div>
    </article>
  );
}
