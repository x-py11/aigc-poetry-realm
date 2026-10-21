import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import VideoWorkCard from '@/components/VideoWorkCard';
import HScroll from '@/components/HScroll';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { toggleLike } from '@/lib/store';
import { Image } from '@/components/ui/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { img } from '@/lib/base';

// 首页「AI 诗词影像精选」区块：视频卡片版式（参照参考图），
// 作品数据仅在本区块内维护，不影响全局诗词库与作品库；
// 点赞状态与社区作品共用本地存储（aigc-shijing:likes）
const FEATURED_VIDEOS = [
  {
    id: 'w-tao-hua-yuan',
    title: '桃花源记',
    subtitle: '陶渊明 · 东晋',
    style: '东方数字绘画',
    image: 'mood-spring.png',
    duration: '00:58',
    likes: 2300,
    comments: 142,
  },
  {
    id: 'w-shi-zhi-sai',
    title: '使至塞上',
    subtitle: '王维 · 唐',
    style: '写实电影感',
    image: 'work-da-mo.png',
    duration: '00:52',
    likes: 860,
    comments: 64,
  },
  {
    id: 'w-li-sao',
    title: '离骚',
    subtitle: '屈原 · 战国',
    style: '东方数字绘画',
    image: 'poem-li-sao.png',
    duration: '01:26',
    likes: 1800,
    comments: 123,
  },
  {
    id: 'w-sheng-sheng-man',
    title: '声声慢·寻寻觅觅',
    subtitle: '李清照 · 宋',
    style: '超现实数字艺术',
    image: 'poem-sheng-sheng-man.png',
    duration: '01:08',
    likes: 980,
    comments: 89,
  },
  {
    id: 'w-gui-yuan',
    title: '归园田居·其一',
    subtitle: '陶渊明 · 东晋',
    style: '水墨意境',
    image: 'work-shanju.jpg',
    duration: '00:46',
    likes: 1100,
    comments: 78,
  },
];

export default function WorksSection() {
  const [likes, setLikes] = usePersistedState<string[]>('likes', []);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewWork = FEATURED_VIDEOS.find((work) => work.id === previewId);

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="AI 诗词影像精选"
            title="一首诗，一万种月光"
            description="把经典诗词交给 AI 影像创作，水墨、电影、数字绘画与超现实——同一首诗，有无数种被看见的方式。"
          />
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            开始创作
          </Link>
        </div>

        <HScroll>
          {FEATURED_VIDEOS.map((work) => (
            <VideoWorkCard
              key={work.id}
              id={work.id}
              title={work.title}
              subtitle={work.subtitle}
              style={work.style}
              image={work.image}
              duration={work.duration}
              likes={work.likes}
              comments={work.comments}
              liked={likes.includes(work.id)}
              onToggleLike={(id) => setLikes(toggleLike(id))}
              onPreview={setPreviewId}
              className="w-[300px]"
            />
          ))}
        </HScroll>
      </div>

      <Dialog open={Boolean(previewWork)} onOpenChange={(open) => !open && setPreviewId(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          {previewWork && (
            <>
              <div className="relative aspect-video w-full overflow-hidden bg-deep">
                <Image
                  src={img(previewWork.image)}
                  alt={`${previewWork.title} · 影像静帧`}
                  className="size-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/65 via-transparent to-transparent" />
                <p className="absolute bottom-4 right-4 rounded-full bg-deep/70 px-3 py-1 text-xs text-moon backdrop-blur-sm">
                  概念时长 {previewWork.duration}
                </p>
              </div>
              <DialogHeader className="p-6 pt-5">
                <DialogTitle className="font-serif text-xl">{previewWork.title}</DialogTitle>
                <DialogDescription>
                  {previewWork.subtitle} · {previewWork.style}。当前原型展示影像静帧，接入视频生成服务后将在此处替换为播放器。
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
