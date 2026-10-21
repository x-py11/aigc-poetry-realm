import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Heart, Sparkles, RotateCcw, Send, Pencil, Image as ImageIcon, LogOut } from 'lucide-react';
import { POEMS } from '@/data/poems';
import { getStyleName } from '@/data/works';
import {
  getMyWorks,
  updateWork,
  toggleFavorite,
  resetAll,
  getLikes,
  getAuthSession,
  clearAuthSession,
} from '@/lib/store';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { useStoreRevision } from '@/hooks/use-store-revision';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PoemCard from '@/components/PoemCard';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();
  useStoreRevision();
  const session = getAuthSession();
  const [favorites, setFavorites] = usePersistedState<string[]>('favorites', []);
  const myWorks = getMyWorks();
  const favoritePoems = POEMS.filter((p) => favorites.includes(p.id));
  const likesCount = getLikes().length;

  if (!session) return <Navigate to="/login" replace />;

  const handleResetGuide = () => {
    resetAll();
    toast.success('已重置本地演示数据，可重新体验首次意境引导');
    navigate('/');
  };

  const handleLogout = () => {
    clearAuthSession();
    toast.success('已退出登录');
    navigate('/login', { replace: true });
  };

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 用户信息 */}
        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
          <Avatar className="size-16">
            <AvatarImage src={img('avatar.jpg')} alt="用户头像" className="size-full object-cover" />
            <AvatarFallback className="bg-primary/10 font-serif text-2xl text-primary">山</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-xl font-semibold text-foreground">{session.displayName}</h1>
            <p className="mt-1 text-xs text-muted-foreground">账号：{session.account}</p>
            <p className="mt-1 text-sm text-muted-foreground">以诗为境，以 AI 绘意。</p>
            <p className="mt-1 text-xs text-muted-foreground/70">示例用户 · 原型演示，数据保存在当前浏览器本地</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-6">
            <div className="flex gap-8 text-center">
              <div>
                <p className="font-serif text-2xl font-semibold text-primary">{myWorks.length}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">我的作品</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-primary">{favorites.length}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">收藏诗词</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-primary">{likesCount}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">点赞作品</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleLogout}>
              <LogOut className="size-3.5" aria-hidden="true" />
              退出登录
            </Button>
          </div>
        </div>

        <Tabs defaultValue="works" className="mt-10">
          <TabsList className="bg-card">
            <TabsTrigger value="works">我的作品</TabsTrigger>
            <TabsTrigger value="favorites">我的收藏</TabsTrigger>
            <TabsTrigger value="records">创作记录</TabsTrigger>
          </TabsList>

          <TabsContent value="works" className="mt-6">
            {myWorks.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {myWorks.map((w) => (
                  <article key={w.id} className="group relative overflow-hidden rounded-xl border border-border/70 bg-card">
                    <Link
                      to={`/preview/${w.id}`}
                      className="relative block"
                      aria-label={`查看作品《${w.title}》`}
                    >
                      <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: w.ratio }}>
                        <img
                          src={img(w.image)}
                          alt={`${w.title} · 影像预览`}
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-4">
                          <p className="font-serif text-sm font-semibold text-moon">{w.title}</p>
                          <p className="text-xs text-moon/70">{getStyleName(w.style)} · {w.ratio}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                      <span className="flex items-center gap-1.5">
                        {w.published ? (
                          <Badge className="border-0 bg-gold text-deep">已发布</Badge>
                        ) : (
                          <Badge variant="outline" className="border-border text-muted-foreground">未发布</Badge>
                        )}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-muted-foreground"
                          onClick={() => navigate(`/create?poem=${w.poemId}`)}
                        >
                          <Pencil className="size-3.5" aria-hidden="true" />
                          再创作
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-muted-foreground"
                          onClick={() => {
                            const updated = updateWork(w.id, { published: !w.published });
                            const nowPublished = updated.find((x) => x.id === w.id)?.published;
                            if (nowPublished) toast.success('已发布到创作社区');
                            else toast.info('已取消发布');
                          }}
                        >
                          <Send className="size-3.5" aria-hidden="true" />
                          {w.published ? '取消发布' : '发布'}
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                <ImageIcon className="size-10 text-muted-foreground/50" aria-hidden="true" />
                <p className="mt-4 font-serif text-lg text-foreground">还没有作品</p>
                <p className="mt-1.5 text-sm text-muted-foreground">选一首诗，生成你的第一幅诗词影像。</p>
                <Button asChild className="mt-6 gap-2">
                  <Link to="/create">
                    <Sparkles className="size-4" aria-hidden="true" />
                    去创作
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoritePoems.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {favoritePoems.map((poem) => (
                  <PoemCard
                    key={poem.id}
                    poem={poem}
                    favorite
                    onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                <Heart className="size-10 text-muted-foreground/50" aria-hidden="true" />
                <p className="mt-4 font-serif text-lg text-foreground">还没有收藏</p>
                <p className="mt-1.5 text-sm text-muted-foreground">遇到喜欢的诗词，点一下心形即可收藏。</p>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/explore">去探索诗词</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            {myWorks.length > 0 ? (
              <div className="space-y-3">
                {myWorks.map((w) => (
                  <div
                    key={w.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="font-serif font-semibold text-foreground">{w.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {w.createdAt ? new Date(w.createdAt).toLocaleDateString('zh-CN') : '—'} · {getStyleName(w.style)} · {w.sound}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {w.published ? (
                        <Badge className="border-0 bg-gold text-deep">已发布</Badge>
                      ) : (
                        <Badge variant="outline" className="border-border text-muted-foreground">未发布</Badge>
                      )}
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate(`/preview/${w.id}`)}>
                        查看
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => navigate(`/create?poem=${w.poemId}`)}>
                        <Pencil className="size-3.5" aria-hidden="true" />
                        重新创作
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                <RotateCcw className="size-10 text-muted-foreground/50" aria-hidden="true" />
                <p className="mt-4 font-serif text-lg text-foreground">暂无创作记录</p>
                <p className="mt-1.5 text-sm text-muted-foreground">完成一次影像生成后，记录会出现在这里。</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5">
          <div>
            <p className="text-sm font-medium text-foreground">演示数据管理</p>
            <p className="mt-1 text-xs text-muted-foreground">
              原型数据（作品、收藏、点赞、发布、首次引导状态）均保存在当前浏览器本地，清除后不影响页面浏览。
            </p>
          </div>
          <Button variant="outline" className={cn('gap-2')} onClick={handleResetGuide}>
            <RotateCcw className="size-4" aria-hidden="true" />
            重置本地数据与首次引导
          </Button>
        </div>
      </div>
    </div>
  );
}
