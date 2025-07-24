
"use client";

import { useState, useEffect } from 'react';

/**
 * A hook that returns true once the component has mounted on the client.
 * This is useful for avoiding hydration mismatches when rendering content
 * that depends on client-side information (like window size).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
