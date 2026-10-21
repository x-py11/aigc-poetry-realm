// EXPORTS: BASE, img
// 应用根路径（发布后挂在 /app/app_xxx 子路径下）；本地开发为 '/'
const BASE = (import.meta.env.MIAODA_CLIENT_BASE_PATH || '').replace(/\/$/, '') + '/';

// 统一从 public/ 引图片，禁止裸根路径与 CDN 链接
export const img = (name: string) => `${BASE}images/${name}`;

export { BASE };
