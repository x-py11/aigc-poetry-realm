import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, LogIn, ShieldCheck, UserRound } from 'lucide-react';
import Brand from '@/components/Brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStoreRevision } from '@/hooks/use-store-revision';
import { getAuthSession } from '@/lib/store';
import { DEMO_ACCOUNT, DEMO_PASSWORD, signInDemo } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  useStoreRevision();
  const session = getAuthSession();
  const [account, setAccount] = useState(DEMO_ACCOUNT);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (session) return <Navigate to="/profile" replace />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSession = signInDemo(account, password);
    if (!nextSession) {
      const message = '账号或密码不正确，请使用页面预填的演示账号';
      setError(message);
      toast.error(message);
      return;
    }

    setError('');
    toast.success('登录成功');
    navigate('/profile', { replace: true });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 32%), radial-gradient(circle at 85% 75%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 30%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-16">
        <section className="max-w-xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            返回首页
          </Link>
          <Brand className="mt-10" />
          <p className="mt-8 text-xs font-medium tracking-[0.3em] text-primary/80">DEMO ACCOUNT ACCESS</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-snug text-foreground sm:text-4xl">
            登录你的诗意空间
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            登录后可查看个人作品、收藏诗词和创作记录。当前为原型演示登录，账号已预填，直接点击登录即可进入个人主页。
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              演示账号：<span className="font-medium text-foreground">{DEMO_ACCOUNT}</span>
              <br />
              演示密码：<span className="font-medium text-foreground">{DEMO_PASSWORD}</span>
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="mb-7">
            <p className="font-serif text-xl font-semibold text-foreground">账号登录</p>
            <p className="mt-1.5 text-sm text-muted-foreground">默认信息已填写，可直接登录体验。</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-account" className="mb-2 block text-sm font-medium text-foreground">
                账号
              </label>
              <div className="relative">
                <UserRound
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="login-account"
                  value={account}
                  onChange={(event) => setAccount(event.target.value)}
                  autoComplete="username"
                  className="h-11 bg-background/70 pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-foreground">
                密码
              </label>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="h-11 bg-background/70 pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full gap-2">
              <LogIn className="size-4" aria-hidden="true" />
              登录
            </Button>
          </form>

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            这是公开原型演示登录，不具备真实身份认证能力。
          </p>
        </section>
      </div>
    </div>
  );
}
