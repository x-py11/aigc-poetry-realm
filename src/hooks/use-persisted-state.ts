// EXPORTS: usePersistedState
import { useRef, useState } from 'react';
import { store } from '@/lib/store';

// 带项目命名空间的持久化 state（读取/写入均包 try/catch，隐私模式不白屏）
export function usePersistedState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => store.get<T>(key, fallback));
  const valueRef = useRef(value);

  const set = (next: T | ((prev: T) => T)) => {
    const v = typeof next === 'function' ? (next as (p: T) => T)(valueRef.current) : next;
    valueRef.current = v;
    store.set(key, v);
    setValue(v);
  };

  return [value, set] as const;
}
