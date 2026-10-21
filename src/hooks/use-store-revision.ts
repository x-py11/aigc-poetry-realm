import { useSyncExternalStore } from 'react';
import { getStoreRevision, subscribeStore } from '@/lib/store';

/**
 * 订阅本地业务数据版本号。
 * localStorage 本身不会触发 React 更新，需要该 Hook 让读取型页面在数据变化后重算。
 */
export function useStoreRevision() {
  return useSyncExternalStore(subscribeStore, getStoreRevision, getStoreRevision);
}
