# AIGC 诗境

中国古典诗词 AI 影像创作平台的高保真前端原型。用户可以浏览与筛选经典诗词，选择视觉风格、画面比例和声音形式，体验模拟生成、作品预览、收藏、点赞、发布与个人作品管理。

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 + shadcn/ui
- React Router 7
- Framer Motion
- sonner

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认由 `spark.json` 声明在 `32108` 端口，也可以直接双击根目录的 `一键启动.bat`。

## 校验与构建

```bash
npm run typecheck
npm run lint:eslint
npm run build
npm run build:cloudflare
```

生产构建由 `vite.config.ts` 中的妙搭插件整理为：

- `dist/output/`：HTML、静态资源和 `routes.json`
- `dist/output_resource/assets/`：JS/CSS 资源

Cloudflare Pages 使用独立配置 `vite.cloudflare.config.ts`，输出完整的单目录静态产物：

- 构建命令：`npm run build:cloudflare`
- 输出目录：`dist/cloudflare`
- Node.js：`22.12.0` 或更高版本
- SPA 回退：`public/_redirects` 将全部前端路由回退到 `index.html`

## 目录结构

```text
src/
├── app.tsx                 # 路由定义与页面级懒加载
├── index.tsx               # React 入口、Router、全局异常边界
├── components/             # 业务组件与 shadcn/ui 基础组件
├── data/                   # 诗词、意境、作品和社区静态数据
├── hooks/                  # 本地状态和响应式 Hook
├── lib/                    # 路径、工具函数和 localStorage 数据层
└── pages/                  # 页面入口
public/
├── icons.svg
└── images/                 # 构建时原样发布的 PNG/JPG 图片
图片/
└── *.png                   # 原始视觉素材
```

## 页面路由

- `/`：首页
- `/explore`：诗词探索与筛选
- `/poem/:id`：诗词详情
- `/create`：AI 影像创作工作台
- `/preview/:id`：作品预览、保存与发布
- `/community`：创作社区
- `/profile`：个人作品、收藏与创作记录

## 数据与状态

当前版本没有后端、登录或云端数据库。收藏、点赞、我的作品、发布状态和首次引导状态都保存在浏览器 `localStorage`，统一命名空间为：

```text
aigc-shijing:*
```

`src/lib/store.ts` 提供版本订阅机制，页面在写入本地数据后会响应式刷新。清除浏览器站点数据会同时清空所有原型数据。

## Cloudflare Pages 部署

在 Cloudflare Pages 中连接 GitHub 仓库后填写：

| 配置项 | 值 |
| --- | --- |
| Framework preset | None / Vite |
| Build command | `npm run build:cloudflare` |
| Build output directory | `dist/cloudflare` |
| Environment variables | `NODE_VERSION=22.12.0` |

当前项目不需要 API 密钥、数据库或运行时环境变量。`NODE_VERSION` 仅用于固定 Cloudflare Pages 的构建环境。收藏与作品数据保存在访问者浏览器的 `localStorage`。

## AI 生成状态

`/create` 当前使用本地定时器模拟生成过程，并按诗词意境与视觉风格选择示例图片。提示词、氛围、比例和声音会写入本地作品记录，预览页会展示创作参数。

接入真实生成服务时，应替换 `CreatePage` 中的本地定时器逻辑，并保留以下数据契约：

- 任务创建与轮询
- 图片/视频产物 URL
- 失败、重试和取消状态
- 音频与字幕产物
- 服务端作品 ID

## 原型限制

- 首页精选区当前展示影像静帧，没有真实视频文件。
- 生成结果由本地示例素材模拟，不代表真实 AI 输出。
- 社区精选为静态演示数据，个人发布只对当前浏览器可见。
- 外部字体由妙搭字体服务加载，离线时会回退到系统字体。
