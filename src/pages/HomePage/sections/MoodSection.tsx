import { MOODS } from '@/data/moods';
import MoodCard from '@/components/MoodCard';
import SectionHeading from '@/components/SectionHeading';

export default function MoodSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="意境探索"
          title="走进诗意，从一种心境开始"
          description="明月、山水、春日、秋意、豪情——每一种心境背后，都藏着一群与你共鸣的诗词。"
          className="mb-12"
        />
        {/* 横排布局：桌面端 5 张一行，平板 3 列，手机 2 列 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {MOODS.map((mood) => (
            <MoodCard key={mood.id} mood={mood} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
