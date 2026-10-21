import { Heart } from 'lucide-react';
import { img } from '@/lib/base';
import { Image } from '@/components/ui/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface CommunityCardProps {
  id: string;
  title: string;
  /** 创作者名，如「山野行者」 */
  creator: string;
  /** 创作者头像图片文件名，如 avatars/avatar-shan-ye.jpg */
  avatar: string;
  image: string;
  likes: number;
  liked?: boolean;
  onToggleLike?: (workId: string) => void;
  className?: string;
}

// 千分位格式化：2300 → "2,300"（参照参考图）
const formatLikes = (n: number) => n.toLocaleString('en-US');

// 首页「创作社区精选」卡片：干净影像图 + 下方标题 / 创作者头像·名字 / 千分位点赞数
export default function CommunityCard({
  id,
  title,
  creator,
  avatar,
  image,
  likes,
  liked = false,
  onToggleLike,
  className,
}: CommunityCardProps) {
  return (
    <article className={cn('group min-w-0', className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/60 bg-deep">
        <Image
          src={img(image)}
          alt={`${title} · 影像预览`}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Avatar className="size-5 shrink-0">
              <AvatarImage src={img(avatar)} alt={`${creator}的头像`} className="size-full object-cover" />
              <AvatarFallback className="bg-primary/10 text-[10px] text-primary">{creator.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="truncate">by {creator}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggleLike?.(id)}
          className={cn(
            'mt-1 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors',
            liked ? 'text-accent' : 'text-muted-foreground hover:text-accent',
          )}
          aria-label={liked ? `取消点赞《${title}》` : `点赞《${title}》`}
          aria-pressed={liked}
        >
          <Heart className={cn('size-3.5', liked && 'fill-accent')} aria-hidden="true" />
          {formatLikes(likes + (liked ? 1 : 0))}
        </button>
      </div>
    </article>
  );
}
