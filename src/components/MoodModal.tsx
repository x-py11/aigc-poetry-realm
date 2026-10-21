import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { MOODS } from '@/data/moods';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

interface MoodModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MoodModal({ open, onClose }: MoodModalProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>(MOODS[0].id);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const confirm = () => {
    onClose();
    navigate(`/explore?mood=${selected}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep/85 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="选择意境"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-moon/15 bg-deep-2/95 p-5 shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-moon/60 transition-colors hover:bg-moon/10 hover:text-moon"
              aria-label="关闭，直接进入首页"
            >
              <X className="size-5" />
            </button>

            <div className="mb-8 text-center">
              <p className="mb-3 font-serif text-sm tracking-[0.35em] text-gold">AIGC 诗境</p>
              <h2 className="font-serif text-2xl font-semibold text-moon sm:text-3xl">
                此刻，你想走进哪一种诗意？
              </h2>
              <p className="mt-3 text-sm text-moon/60">
                选择一种心境，探索与你产生共鸣的诗词。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4" role="radiogroup" aria-label="意境选项">
              {MOODS.map((mood) => {
                const active = selected === mood.id;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelected(mood.id)}
                    className={cn(
                      'group relative aspect-[3/4] overflow-hidden rounded-xl border text-left transition-all',
                      active
                        ? 'border-gold ring-2 ring-gold/60'
                        : 'border-moon/15 hover:border-moon/40',
                    )}
                  >
                    <Image
                      src={img(mood.image)}
                      alt={mood.name}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="font-serif text-sm font-semibold text-moon sm:text-[15px]">{mood.name}</p>
                      <p className="mt-1 line-clamp-2 font-serif text-[11px] leading-snug text-moon/55 sm:text-xs">
                        {mood.verse}
                      </p>
                    </div>
                    {active && (
                      <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-gold text-deep">
                        <span className="text-[10px]">✓</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={confirm}
                className="gap-2 bg-gold text-deep hover:bg-gold/90"
              >
                走入诗境
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg" onClick={onClose} className="text-moon/70 hover:bg-moon/10 hover:text-moon">
                先随便逛逛
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
