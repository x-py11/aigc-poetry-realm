import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { img } from '@/lib/base';
import Brand from '@/components/Brand';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/explore', label: '诗词探索' },
  { path: '/create', label: 'AI 创作' },
  { path: '/community', label: '创作社区' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = pathname === '/' && !scrolled;

  const submitSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore');
      setQuery('');
    },
    [navigate, query],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border/70 bg-background/85 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand onDark={transparent} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive: active }) =>
                cn(
                  'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  transparent ? 'text-moon/80 hover:text-moon' : 'text-muted-foreground hover:text-foreground',
                  active &&
                    (transparent
                      ? 'bg-moon/15 text-moon'
                      : 'bg-primary/10 text-primary'),
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form
            onSubmit={submitSearch}
            className={cn(
              'hidden items-center gap-2 rounded-full border px-3.5 py-1.5 transition-colors lg:flex',
              transparent
                ? 'border-moon/25 bg-moon/10 focus-within:border-moon/50'
                : 'border-input bg-card focus-within:border-primary/50',
            )}
            role="search"
            aria-label="搜索诗词"
          >
            <Search
              className={cn('size-4', transparent ? 'text-moon/70' : 'text-muted-foreground')}
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索诗句、作者…"
              className={cn(
                'w-36 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70',
                transparent ? 'text-moon placeholder:text-moon/50' : 'text-foreground',
              )}
            />
          </form>

          <Button
            variant="ghost"
            size="icon"
            className={cn('lg:hidden', transparent && 'text-moon hover:bg-moon/15 hover:text-moon')}
            onClick={() => navigate('/explore')}
            aria-label="搜索诗词"
          >
            <Search className="size-5" />
          </Button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className={cn(
              'rounded-full transition-opacity hover:opacity-80',
              transparent && 'ring-1 ring-moon/30',
            )}
            aria-label="个人中心"
          >
            <Avatar className="size-9">
              <AvatarImage src={img('avatar.jpg')} alt="用户头像" className="size-full object-cover" />
              <AvatarFallback className={cn('text-xs', transparent ? 'bg-moon/15 text-moon' : 'bg-primary/10 text-primary')}>
                山
              </AvatarFallback>
            </Avatar>
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('md:hidden', transparent && 'text-moon hover:bg-moon/15 hover:text-moon')}
                aria-label="打开菜单"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="border-b border-border/60 pb-4 text-left">
                <SheetTitle className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold tracking-[0.28em]">AIGC</span>
                  <span className="hairline-gold h-4 w-px" aria-hidden="true" />
                  <span className="font-brush text-xl text-primary">诗境</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1" aria-label="移动端导航">
                {NAV_ITEMS.map((item) => (
                  <SheetClose key={item.path} asChild>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive: active }) =>
                        cn(
                          'rounded-lg px-3 py-2.5 text-[15px] transition-colors',
                          active ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = (e.currentTarget.elements.namedItem('mq') as HTMLInputElement)?.value.trim();
                    setMenuOpen(false);
                    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore');
                  }}
                  className="mt-3 flex items-center gap-2 rounded-full border border-input bg-card px-3.5 py-2"
                  role="search"
                >
                  <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    name="mq"
                    placeholder="搜索诗句、作者…"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </form>
              </nav>
              <div className="absolute bottom-4 left-6 right-6">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                    个人中心
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
