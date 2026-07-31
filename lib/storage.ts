'use client';

import { useCallback, useEffect, useState } from 'react';

/** Everything persists in localStorage only. No backend, no accounts. */
const PREFIX = 'aion-day12:';

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota or private mode — the playground still works, it just forgets */
  }
}

export function clearKeys(keys: string[]): void {
  if (typeof window === 'undefined') return;
  keys.forEach((k) => {
    try {
      window.localStorage.removeItem(PREFIX + k);
    } catch {
      /* ignore */
    }
  });
}

/**
 * localStorage-backed state that hydrates after mount, so server-rendered
 * markup and first client render always agree.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readJSON<T>(key, initial));
    setHydrated(true);
    // `initial` is a constant per call site; re-reading on key change is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) writeJSON(key, value);
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return { value, setValue, reset, hydrated } as const;
}
