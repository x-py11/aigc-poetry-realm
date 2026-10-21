import type { StyleId } from '@/data/works';

// 首页「创作社区精选」与「创作社区」页共用的社区作品数据源，
// 保持两处展示一致；作品头像统一存放于 public/images/avatars/
export interface IXCommunityWork {
  id: string;
  title: string;
  creator: string;
  /** 创作者头像图片文件名，如 avatars/avatar-shan-ye.jpg */
  avatar: string;
  image: string;
  likes: number;
  style: StyleId;
}

export const COMMUNITY_FEATURES: IXCommunityWork[] = [
  { id: 'c-deng-huo', title: '那人却在灯火阑珊处', creator: '素弦', avatar: 'avatars/avatar-su-xian.jpg', image: 'work-deng-huo.png', likes: 1962, style: 'surreal' },
  { id: 'c-bai-lu', title: '一行白鹭上青天', creator: '长风', avatar: 'avatars/avatar-chang-feng.jpg', image: 'work-bai-lu.png', likes: 1743, style: 'ink' },
  { id: 'c-chang-an', title: '一日看尽长安花', creator: '花间一梦', avatar: 'avatars/avatar-hua-jian.jpg', image: 'work-chang-an.png', likes: 2386, style: 'digital' },
  { id: 'c-yan-yu', title: '一蓑烟雨任平生', creator: '山野行者', avatar: 'avatars/avatar-shan-ye.jpg', image: 'work-yan-yu.png', likes: 1840, style: 'ink' },
  { id: 'c-da-mo', title: '大漠孤烟直', creator: '边城客', avatar: 'avatars/avatar-bian-cheng.jpg', image: 'work-da-mo.png', likes: 1320, style: 'cinematic' },
  { id: 'c-zhu-yan', title: '朱颜辞镜花辞树', creator: '归云', avatar: 'avatars/avatar-gui-yun.jpg', image: 'work-zhu-yan.png', likes: 1537, style: 'ink' },
  { id: 'c-gui-hua', title: '欲买桂花同载酒', creator: '云舟', avatar: 'avatars/avatar-yun-zhou.jpg', image: 'work-gui-hua.png', likes: 2148, style: 'digital' },
];
