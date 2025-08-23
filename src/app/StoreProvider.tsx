'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, setupStore } from '../lib/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}