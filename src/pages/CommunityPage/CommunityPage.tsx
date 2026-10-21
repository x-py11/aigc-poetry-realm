import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Sparkles, X } from 'lucide-react';
import { STYLE_OPTIONS, type StyleId } from '@/data/works';
import { getPoem } from '@/data/poems';
import { COMMUNITY_FEATURES, type IXCommunityWork } from '@/data/community';
import { getMyWorks } from '@/lib/store';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { useStoreRevision } from '@/hooks/use-store-revision';
import { toggleLike } from '@/lib/store';
import { cn } from '@/lib/utils';
import CommunityCard from '@/components/CommunityCard';
import SectionHeading from '@/components/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 我的发布：转成社区卡片数据结构（头像复用个人头像）
interface MyPost extends IXCommunityWork {
  poemTitle?: string;
  poemAuthor?: string;
}

export default function CommunityPage() {
  useStoreRevision();
  const [q, setQ] = useState('');
  const [styleFilter, setStyleFilter] = useState<'' | StyleId>('');
  const [likes, setLikes] = usePersistedState<string[]>('likes', []);

  const myPublished: MyPost[] = getMyWorks()
    .filter((w) => w.published)
    .map((w) => ({
      id: w.id,
      title: w.title,
      creator: '我',
      avatar: 'avatar.jpg',
      image: w.image,
      likes: 0,
      style: w.style,
      poemTitle: getPoem(w.poemId)?.title ?? '',
      poemAuthor: getPoem(w.poemId)?.author ?? '',
    }));

  const results = useMemo<(IXCommunityWork & { poemTitle?: string; poemAuthor?: string })[]>(() => {
    const kw = q.trim().toLowerCase();
    const all: (IXCommunityWork & { poemTitle?: string; poemAuthor?: string })[] = [
      ...myPublished,
      ...COMMUNITY_FEATURES,
    ];
    return all.filter((w) => {
      if (styleFilter && w.style !== styleFilter) return false;
      if (!kw) return true;
      const hay = [w.title, w.creator, w.poemTitle ?? '', w.poemAuthor ?? ''].join(' ').toLowerCase();
      return hay.includes(kw);
    });
  }, [q, styleFilter, myPublished]);

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="创作社区"
          title="看别人如何，把诗变成影像"
          description="这里汇集了创作者们的诗词影像作品——水墨、电影、数字绘画与超现实，每一种风格都是一种理解。"
          className="mb-10"
        />

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索作品、诗词、创作者…"
              className="h-10 w-72 pl-3 pr-8"
              aria-label="搜索作品"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="清除搜索"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="风格筛选">
            <button
              type="button"
              onClick={() => setStyleFilter('')}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                !styleFilter
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
              )}
            >
              全部风格
            </button>
            {STYLE_OPTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyleFilter(s.id)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  styleFilter === s.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {myPublished.length > 0 && (
          <div className="mb-8 flex items-center gap-2 text-sm text-foreground/70">
            <Badge className="border-0 bg-gold text-deep">我的发布</Badge>
            <span>共 {myPublished.length} 件作品已展示在社区中</span>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((work) => (
              <CommunityCard
                key={work.id}
                id={work.id}
                title={work.title}
                creator={work.creator}
                avatar={work.avatar}
                image={work.image}
                likes={work.likes}
                liked={likes.includes(work.id)}
                onToggleLike={(id) => setLikes(toggleLike(id))}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <SearchX className="size-10 text-muted-foreground/50" aria-hidden="true" />
            <p className="mt-4 font-serif text-lg text-foreground">没有找到匹配的作品</p>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              换个关键词或风格试试，也可以亲自创作一幅属于你的诗词影像。
            </p>
            <Button asChild className="mt-6 gap-2">
              <Link to="/create">
                <Sparkles className="size-4" aria-hidden="true" />
                开始创作
              </Link>
            </Button>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-muted-foreground">
          社区作品为原型演示数据；你发布的作品仅保存在当前浏览器本地。
        </p>
      </div>
    </div>
  );
}
