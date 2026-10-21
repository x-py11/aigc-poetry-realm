import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HScrollProps {
  children: ReactNode;
}

// 横向滑动容器：一行排开，支持拖动 / 滚轮 / 左右箭头翻页，卡片滑动吸附，隐藏滚动条
export default function HScroll({ children }: HScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 [&>*]:shrink-0 [&>*]:snap-start"
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        disabled={!canScrollLeft}
        aria-label="向左滑动"
        className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground/80 shadow-md backdrop-blur transition-opacity hover:text-primary disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        disabled={!canScrollRight}
        aria-label="向右滑动"
        className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground/80 shadow-md backdrop-blur transition-opacity hover:text-primary disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
