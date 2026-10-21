import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-3 flex items-center gap-2 text-sm font-medium tracking-[0.28em] text-primary/80">
          <span className="hairline-gold inline-block h-px w-8" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-[32px] font-semibold leading-tight tracking-wide text-foreground sm:text-[40px]">
        {title}
      </h2>
      {description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
