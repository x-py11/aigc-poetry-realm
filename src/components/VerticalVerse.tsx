import { cn } from '@/lib/utils';

interface VerticalVerseProps {
  lines: string[];
  highlightIndex?: number;
  className?: string;
  lineClassName?: string;
}

// 品牌签名元素：竖排诗文（卷轴式阅读），用于主视觉与深色影像区
export default function VerticalVerse({
  lines,
  highlightIndex,
  className,
  lineClassName,
}: VerticalVerseProps) {
  return (
    <div className={cn('flex gap-6', className)} aria-hidden="true">
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn(
            'writing-vertical font-serif leading-relaxed tracking-[0.18em]',
            i === highlightIndex
              ? 'text-gold'
              : 'text-moon/80',
            lineClassName,
          )}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
