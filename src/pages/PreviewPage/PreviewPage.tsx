import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Send, Pencil, Play, Pause, BookmarkPlus } from 'lucide-react';
import { getPoem } from '@/data/poems';
import { getWork, getStyleName } from '@/data/works';
import { getMood } from '@/data/moods';
import { getMyWorks, addWork, updateWork, nextWorkId, nowIso, type IMyWork } from '@/lib/store';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { useStoreRevision } from '@/hooks/use-store-revision';
import { img } from '@/lib/base';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VerticalVerse from '@/components/VerticalVerse';
import { toast } from 'sonner';

export default function PreviewPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  useStoreRevision();
  const [likes, setLikesState] = usePersistedState<string[]>('likes', []);
  const [playing, setPlaying] = useState(false);

  const mine = getMyWorks().find((w) => w.id === id);
  const mock = getWork(id);
  const work: IMyWork | undefined = mine ?? (mock ? { ...mock, creator: mock.creator, published: false, createdAt: '' } : undefined);

  if (!work) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-serif text-xl text-foreground">未找到这个作品</p>
        <p className="mt-2 text-sm text-muted-foreground">它可能已被删除，或链接有误。</p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/community">返回创作社区</Link>
        </Button>
      </div>
    );
  }

  const poem = getPoem(work.poemId);
  const mood = getMood(work.mood);
  const isMine = Boolean(mine);
  const liked = likes.includes(work.id);

  const handleSave = () => {
    if (isMine) {
      toast.success('作品已保存在「我的作品」中');
      return;
    }
    const copy: IMyWork = {
      ...work,
      id: nextWorkId(),
      creator: '我',
      createdAt: nowIso(),
      published: false,
    };
    addWork(copy);
    toast.success('已保存到「我的作品」');
    navigate(`/preview/${copy.id}`, { replace: true });
  };

  const handlePublish = () => {
    if (!isMine) return;
    const updated = updateWork(work.id, { published: !work.published });
    const nowPublished = updated.find((w) => w.id === work.id)?.published;
    if (nowPublished) toast.success('已发布到创作社区');
    else toast.info('已取消发布');
  };

  const handleLike = () => {
    const next = likes.includes(work.id) ? likes.filter((x) => x !== work.id) : [...likes, work.id];
    setLikesState(next);
  };

  const verseLines = poem ? poem.keyLine.split(/[，。]/).filter(Boolean).slice(0, 4) : [];

  return (
    <div className="bg-background pb-20">
      {/* 深色影像区 */}
      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-deep pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-2 to-deep" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${img(work.image)})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep/30 to-deep" aria-hidden="true" />

        <div className="relative w-full max-w-5xl px-4 py-12 sm:px-6">
          <div
            className="relative mx-auto w-full overflow-hidden rounded-2xl border border-moon/10 shadow-2xl"
            style={{ aspectRatio: work.ratio === '9:16' ? '9 / 16' : work.ratio === '1:1' ? '1 / 1' : '16 / 9', maxHeight: '68vh' }}
          >
            <Image src={img(work.image)} alt={`作品《${work.title}》影像`} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-transparent" aria-hidden="true" />
            {verseLines.length > 0 && (
              <div className="absolute inset-0 flex items-end justify-end p-6 sm:p-10">
                <VerticalVerse lines={verseLines} className="gap-5" lineClassName="text-base sm:text-lg" />
              </div>
            )}
            <div className="absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 p-4">
              <Badge className="border-0 bg-deep/55 text-moon backdrop-blur-sm">{getStyleName(work.style)}</Badge>
              {mood && <Badge variant="outline" className="border-moon/25 bg-deep/40 text-moon/80 backdrop-blur-sm">{mood.name}</Badge>}
              {isMine && work.published && <Badge className="border-0 bg-gold text-deep">已发布</Badge>}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h1 className="font-serif text-xl font-semibold text-moon sm:text-2xl">{work.title}</h1>
              {poem && (
                <p className="mt-1 text-sm text-moon/70">
                  <Link to={`/poem/${poem.id}`} className="underline-offset-4 hover:underline">
                    {poem.title}
                  </Link>
                  {' '}· {poem.author} · {poem.dynasty}
                </p>
              )}
            </div>
          </div>

          {/* 元信息 + 音频演示 */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-moon/60">
              <span>比例 {work.ratio}</span>
              <span className="h-3 w-px bg-moon/20" aria-hidden="true" />
              <span>创作者 {work.creator}</span>
              {work.atmosphere && (
                <>
                  <span className="h-3 w-px bg-moon/20" aria-hidden="true" />
                  <span>{work.atmosphere}</span>
                </>
              )}
              {work.sound !== '无声音' && (
                <>
                  <span className="h-3 w-px bg-moon/20" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => setPlaying((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-moon/20 bg-moon/5 px-3 py-1.5 text-moon/80 transition-colors hover:bg-moon/10"
                    aria-pressed={playing}
                    aria-label={playing ? '暂停演示音频' : '播放演示音频'}
                  >
                    {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    <span className="flex items-end gap-[2px]" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={cn('w-[3px] rounded-full bg-moon/70', playing ? 'animate-pulse' : '')}
                          style={{ height: `${[6, 12, 9, 14, 7][i]}px`, animationDelay: `${i * 0.12}s` }}
                        />
                      ))}
                    </span>
                    {work.sound}
                    <span className="text-[10px] text-moon/40">（演示）</span>
                  </button>
                </>
              )}
            </div>
            <span className="text-xs text-moon/35">原型演示内容 · 影像为示例素材</span>
          </div>
        </div>
      </section>

      {/* 操作区 */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {isMine ? (
            <>
              <Button variant="outline" className="gap-2" onClick={handlePublish}>
                <Send className="size-4" aria-hidden="true" />
                {work.published ? '取消发布' : '发布作品'}
              </Button>
              <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={() => navigate(`/create?poem=${work.poemId}`)}>
                <Pencil className="size-4" aria-hidden="true" />
                重新创作
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className={cn('gap-2', liked && 'border-accent/60 text-accent')}
                onClick={handleLike}
                aria-pressed={liked}
              >
                <Heart className={cn('size-4', liked && 'fill-accent')} />
                {liked ? '已点赞' : '点赞'}
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleSave}>
                <BookmarkPlus className="size-4" aria-hidden="true" />
                保存到我的作品
              </Button>
              <Button className="gap-2" onClick={() => navigate(`/create?poem=${work.poemId}`)}>
                <Pencil className="size-4" aria-hidden="true" />
                用这首诗创作
              </Button>
            </>
          )}
          <Button asChild variant="ghost" className="gap-1.5 text-muted-foreground">
            <Link to="/community">
              <ArrowLeft className="size-4" aria-hidden="true" />
              返回社区
            </Link>
          </Button>
        </div>

        {poem && (
          <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
            <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-primary/80">
              <span className="hairline-gold h-px w-8" aria-hidden="true" />
              关联诗词
            </p>
            <h2 className="font-serif text-lg font-semibold text-foreground">{poem.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{poem.author} · {poem.dynasty} · {poem.genre}</p>
            <p className="mt-4 font-serif text-[15px] leading-loose text-foreground/85">
              {poem.text.join('　')}
            </p>
            {work.prompt && (
              <div className="mt-6 border-t border-border/60 pt-5">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">创作提示词</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{work.prompt}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
