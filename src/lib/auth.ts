import { setAuthSession, type IUserSession } from '@/lib/store';

// 仅用于公开原型演示，不能作为真实账号或生产认证机制。
export const DEMO_ACCOUNT = '25rj16666';
export const DEMO_PASSWORD = '123456';
export const DEMO_DISPLAY_NAME = '25软件1hh';

export function signInDemo(account: string, password: string): IUserSession | null {
  if (account.trim() !== DEMO_ACCOUNT || password !== DEMO_PASSWORD) return null;

  const session: IUserSession = {
    account: DEMO_ACCOUNT,
    displayName: DEMO_DISPLAY_NAME,
    loggedInAt: new Date().toISOString(),
  };
  setAuthSession(session);
  return session;
}
