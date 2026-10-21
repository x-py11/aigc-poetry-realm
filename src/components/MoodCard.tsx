import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { IXMood } from '@/data/moods';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';

interface MoodCardProps {
  mood: IXMood;
  className?: string;
}

// 意境卡片：数字艺术策展感，非普通分类按钮
export default function MoodCard({ mood, className }: MoodCardProps) {
  return (
    <Link
      to={`/explore?mood=${mood.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-lg',
        className,
      )}
      aria-label={`探索意境：${mood.name}`}
    >
      {/* 横置宽卡：图片铺满整卡，文字叠加在底部（4:3 比例，与参考图一致） */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        <Image
          src={img(mood.image)}
          alt={mood.name}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent" />
        {/* 文字区：底部局部加深渐变，保证五张卡片底部齐平、文字可读 */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8">
          <div
            className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/60 to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="font-serif text-base font-semibold leading-snug text-moon">{mood.name}</p>
            <p className="mt-1 line-clamp-1 text-[10px] leading-relaxed text-moon/75">{mood.description}</p>
            <p className="mt-1.5 font-serif text-[11px] leading-snug text-gold">{mood.verse}</p>
          </div>
        </div>
        <span className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-moon/30 bg-deep/40 text-moon opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
