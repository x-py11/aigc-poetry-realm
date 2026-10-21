import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COMMUNITY_FEATURES } from '@/data/community';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { toggleLike } from '@/lib/store';
import CommunityCard from '@/components/CommunityCard';
import SectionHeading from '@/components/SectionHeading';
import HScroll from '@/components/HScroll';

// 首页「创作社区精选」区块：参考图版式（干净影像图 + 标题 / 创作者头像·名字 / 千分位点赞），
// 单排左右可滑动；作品数据与「创作社区」页共用 data/community.ts
export default function CommunitySection() {
  const [likes, setLikes] = usePersistedState<string[]>('likes', []);

  return (
    <section className="border-y border-border/60 bg-card/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="创作社区精选"
          title="每一幅影像，都是一次共鸣"
          description="来自创作者们的诗词影像——不同的风格、不同的理解，都在重新诠释同一片诗意。"
          className="mb-12"
        />

        <HScroll>
          {COMMUNITY_FEATURES.map((work) => (
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
              className="w-[300px]"
            />
          ))}
        </HScroll>

        <div className="mt-10 text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            进入创作社区
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
