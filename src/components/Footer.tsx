import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Brand from '@/components/Brand';
import { Button } from '@/components/ui/button';
import { img } from '@/lib/base';
import { toast } from 'sonner';

const QQ_NUMBER = '3438771541';
const GITHUB_URL = 'https://github.com/x-py11';

// GitHub 品牌图标（lucide 不含品牌图标，内联官方 octocat path）
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyQQ = async () => {
    try {
      await navigator.clipboard.writeText(QQ_NUMBER);
    } catch {
      // 剪贴板 API 不可用时降级为隐藏文本域复制
      const ta = document.createElement('textarea');
      ta.value = QQ_NUMBER;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast.success(`QQ 号已复制：${QQ_NUMBER}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <Brand />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            以诗为境，以 AI 绘意。让每一首古典诗词，都成为可以走入、可以看见、可以分享的影像。
          </p>
        </div>

        <nav className="space-y-3" aria-label="页脚导航">
          <p className="text-sm font-medium text-foreground">探索</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="transition-colors hover:text-primary" to="/explore">诗词探索</Link></li>
            <li><Link className="transition-colors hover:text-primary" to="/create">AI 诗词影像创作</Link></li>
            <li><Link className="transition-colors hover:text-primary" to="/community">创作社区</Link></li>
            <li><Link className="transition-colors hover:text-primary" to="/profile">个人中心</Link></li>
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">关于原型</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            「AIGC 诗境」为高保真交互原型演示，诗词内容均为真实经典作品；创作、收藏、发布等数据保存在当前浏览器本地。
          </p>
          <div className="space-y-2 pt-1">
            <p className="text-sm font-medium text-foreground">联系我们</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyQQ}
                aria-label={`复制 QQ 号：${QQ_NUMBER}`}
                title={`复制 QQ 号：${QQ_NUMBER}`}
              >
                {copied ? (
                  <Check className="size-4 text-accent" aria-hidden="true" />
                ) : (
                  <img
                    src={img('qq-icon-circle.png')}
                    alt=""
                    className="size-4 object-contain"
                    aria-hidden="true"
                  />
                )}
              </Button>
              <Button variant="outline" size="icon" asChild aria-label="访问 GitHub" title="访问 GitHub">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        © 2026 AIGC 诗境 · 中国古典诗词 AI 影像创作平台 · 原型演示
      </div>
    </footer>
  );
}
