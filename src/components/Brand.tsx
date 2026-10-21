import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BrandProps {
  onDark?: boolean;
  className?: string;
}

export default function Brand({ onDark = false, className }: BrandProps) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-baseline gap-1.5 leading-none', className)}
      aria-label="AIGC 诗境 · 首页"
    >
      <span
        className={cn(
          'text-[15px] font-semibold tracking-[0.28em] transition-colors',
          onDark ? 'text-moon' : 'text-foreground',
        )}
      >
        AIGC
      </span>
      <span className="hairline-gold h-[18px] w-px self-center" aria-hidden="true" />
      <span
        className={cn(
          'font-brush text-[22px] transition-colors',
          onDark ? 'text-gold' : 'text-primary',
        )}
      >
        诗境
      </span>
    </Link>
  );
}
