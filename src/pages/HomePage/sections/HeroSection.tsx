import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { img } from '@/lib/base';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import VerticalVerse from '@/components/VerticalVerse';
import { cn } from '@/lib/utils';

const HERO_IMAGES = [
  {
    src: 'hero-spring.png',
    alt: '春日江南水乡，樱花亭台与乌篷船',
    author: '杜牧 · 江南春',
    lines: ['千里莺啼绿映红', '水村山郭酒旗风', '南朝四百八十寺', '多少楼台烟雨中'],
  },
  {
    src: 'hero-moon.png',
    alt: '月夜山水，扁舟泛月与亭台灯笼',
    author: '张继 · 枫桥夜泊',
    lines: ['月落乌啼霜满天', '江枫渔火对愁眠', '姑苏城外寒山寺', '夜半钟声到客船'],
  },
  {
    src: 'hero-dawn.png',
    alt: '日出仙侠山水，云海侠客与飞瀑楼阁',
    author: '王之涣 · 登鹳雀楼',
    lines: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼'],
  },
];

const SWITCH_MS = 6000;

export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, SWITCH_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-deep">
      {HERO_IMAGES.map((h, i) => (
        <Image
          key={h.src}
          src={img(h.src)}
          alt={h.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          className={cn(
            'absolute inset-0 size-full object-cover object-bottom transition-opacity duration-[1600ms] ease-in-out',
            i === idx ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      {/* 左：主文字区深色渐变（仅文字区域） */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 w-[560px] max-w-[92%] bg-gradient-to-r from-deep/85 via-deep/55 to-transparent"
        aria-hidden="true"
      />
      {/* 右：诗句区深色渐变（仅文字区域） */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[300px] bg-gradient-to-l from-deep/80 via-deep/45 to-transparent lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.32em] text-gold">
            <span className="hairline-gold h-px w-10" aria-hidden="true" />
            中国古典诗词 AI 影像创作平台
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-snug text-moon sm:text-5xl lg:text-[56px]">
            以诗为境，
            <br />
            以 AI 绘意。
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-moon/70">
            重新设计人们感受、理解与表达古典诗词的方式——读诗、懂诗，再把诗变成看得见、听得见的影像。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-moon text-deep hover:bg-moon/90">
              <Link to="/explore">探索诗境</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-moon/35 bg-transparent text-moon hover:bg-moon/10 hover:text-moon"
            >
              <Link to="/create">开始创作</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <VerticalVerse
            lines={HERO_IMAGES[idx].lines}
            className="pr-2"
            lineClassName="text-xl"
          />
          <p className="mt-6 pl-1 font-serif text-xs tracking-[0.4em] text-gold/80">{HERO_IMAGES[idx].author}</p>
        </motion.div>
      </div>

      {/* 轮播指示点 */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2.5" aria-hidden="true">
        {HERO_IMAGES.map((h, i) => (
          <span
            key={h.src}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              i === idx ? 'w-6 bg-gold/90' : 'w-1.5 bg-moon/35',
            )}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-moon/50"
        aria-hidden="true"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
