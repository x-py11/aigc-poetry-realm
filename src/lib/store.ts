// EXPORTS: store, getFavorites, setFavorites, toggleFavorite, getLikes, setLikes,
// toggleLike, getMyWorks, setMyWorks, addWork, updateWork, getModalShown,
// setModalShown, resetAll, IMyWork
// 业务数据全部存浏览器本地存储（带项目命名空间，避免多个应用互相覆盖）
import type { StyleId } from '@/data/works';

export interface IMyWork {
  id: string;
  poemId: string;
  title: string;
  style: StyleId;
  mood: string;
  ratio: string;
  sound: string;
  image: string;
  creator: string;
  createdAt: string;
  published: boolean;
  /** 用户输入的创作提示词，旧版本本地数据可缺省 */
  prompt?: string;
  /** 创作时选择的意境氛围，旧版本本地数据可缺省 */
  atmosphere?: string;
}

export interface IUserSession {
  account: string;
  displayName: string;
  loggedInAt: string;
}

const NS = 'aigc-shijing';
let revision = 0;
const listeners = new Set<() => void>();

const notify = () => {
  revision += 1;
  listeners.forEach((listener) => listener());
};

export const subscribeStore = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getStoreRevision = () => revision;

export const store = {
  get<T>(k: string, fb: T): T {
    try {
      const v = localStorage.getItem(`${NS}:${k}`);
      return v ? (JSON.parse(v) as T) : fb;
    } catch {
      return fb;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(`${NS}:${k}`, JSON.stringify(v));
      notify();
    } catch {
      /* 隐私模式 / 禁用站点数据时静默降级 */
    }
  },
};

const K_FAVORITES = 'favorites';
const K_LIKES = 'likes';
const K_MY_WORKS = 'my-works';
const K_MODAL = 'modal-shown';
const K_AUTH_SESSION = 'auth-session';

export const getFavorites = () => store.get<string[]>(K_FAVORITES, []);
export const setFavorites = (ids: string[]) => store.set(K_FAVORITES, ids);
export const toggleFavorite = (poemId: string) => {
  const cur = getFavorites();
  const next = cur.includes(poemId) ? cur.filter((id) => id !== poemId) : [...cur, poemId];
  setFavorites(next);
  return next;
};

export const getLikes = () => store.get<string[]>(K_LIKES, []);
export const setLikes = (ids: string[]) => store.set(K_LIKES, ids);
export const toggleLike = (workId: string) => {
  const cur = getLikes();
  const next = cur.includes(workId) ? cur.filter((id) => id !== workId) : [...cur, workId];
  setLikes(next);
  return next;
};

export const getMyWorks = () => store.get<IMyWork[]>(K_MY_WORKS, []);
export const setMyWorks = (works: IMyWork[]) => store.set(K_MY_WORKS, works);
export const addWork = (work: IMyWork) => {
  const cur = getMyWorks();
  const next = [work, ...cur];
  setMyWorks(next);
  return next;
};
export const updateWork = (id: string, patch: Partial<IMyWork>) => {
  const cur = getMyWorks();
  const next = cur.map((w) => (w.id === id ? { ...w, ...patch } : w));
  setMyWorks(next);
  return next;
};

export const getModalShown = () => store.get<boolean>(K_MODAL, false);
export const setModalShown = (v: boolean) => store.set(K_MODAL, v);

export const getAuthSession = () => store.get<IUserSession | null>(K_AUTH_SESSION, null);
export const setAuthSession = (session: IUserSession) => store.set(K_AUTH_SESSION, session);
export const clearAuthSession = () => store.set(K_AUTH_SESSION, null);

// 生成作品 ID 与时间（放在非组件模块，供事件处理器调用）
let workSeq = 0;
export const nextWorkId = () => `my-${Date.now()}-${(workSeq += 1)}`;
export const nowIso = () => new Date().toISOString();

export const resetAll = () => {
  try {
    [K_FAVORITES, K_LIKES, K_MY_WORKS, K_MODAL, K_AUTH_SESSION].forEach((k) =>
      localStorage.removeItem(`${NS}:${k}`),
    );
    notify();
  } catch {
    /* 隐私模式静默降级 */
  }
};
