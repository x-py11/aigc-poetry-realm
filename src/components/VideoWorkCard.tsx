import { Heart, MessageCircle, Play } from 'lucide-react';
import { img } from '@/lib/base';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface VideoWorkCardProps {
  id: string;
  title: string;
  /** 作者 · 朝代，如「陶渊明 · 东晋」 */
  subtitle: string;
  /** 视觉风格名，如「水墨意境」 */
  style: string;
  image: string;
  /** 影像时长，如 00:58 */
  duration: string;
  likes: number;
  comments: number;
  liked?: boolean;
  onToggleLike?: (workId: string) => void;
  onPreview?: (workId: string) => void;
  className?: string;
}

// 点赞数格式化：>=1000 显示为 x.xk（与参考图一致）
const formatLikes = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}k` : `${n}`;

// 首页「AI 诗词影像精选」卡片：影像帧 + 中央静帧预览按钮 + 右下角概念时长，
// 下方为作品名 / 作者朝代 + 风格标签 + 点赞评论（参照参考图版式）
export default function VideoWorkCard({
  id,
  title,
  subtitle,
  style,
  image,
  duration,
  likes,
  comments,
  liked = false,
  onToggleLike,
  onPreview,
  className,
}: VideoWorkCardProps) {
  return (
    <article className={cn('group min-w-0', className)}>
      {/* 影像帧（视频缩略图） */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/70 bg-deep">
        <Image
          src={img(image)}
          alt={`${title} · 影像预览`}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 保留原有播放按钮视觉，点击后打开当前可用的影像预览 */}
        <button
          type="button"
          onClick={() => onPreview?.(id)}
          className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-deep/55 text-moon shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
          aria-label={`播放《${title}》演示影像`}
        >
          <Play className="size-4 fill-current" />
        </button>
        {/* 右下角时长 */}
        <span className="absolute bottom-2 right-2 rounded-md bg-deep/70 px-2 py-0.5 text-[11px] font-medium tabular-nums text-moon backdrop-blur-sm">
          {duration}
        </span>
      </div>

      {/* 下方信息区 */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug text-foreground">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
          {style}
        </span>
      </div>

      {/* 点赞 / 评论 */}
      <div className="mt-2.5 flex items-center gap-4 border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => onToggleLike?.(id)}
          className={cn(
            'inline-flex items-center gap-1.5 transition-colors',
            liked ? 'text-accent' : 'hover:text-accent',
          )}
          aria-pressed={liked}
          aria-label={liked ? `取消点赞《${title}》` : `点赞《${title}》`}
        >
          <Heart className={cn('size-3.5', liked && 'fill-accent')} aria-hidden="true" />
          {formatLikes(likes + (liked ? 1 : 0))}
        </button>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-3.5" aria-hidden="true" />
          {comments}
        </span>
      </div>
    </article>
  );
}
