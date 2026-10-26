"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ACCENT_STORAGE_KEY, ACCENTS, type AccentId, DEFAULT_ACCENT, isAccentId } from "@/lib/theme/accents";

type AccentContextValue = { accent: AccentId; setAccent: (accent: AccentId) => void };

const AccentContext = createContext<AccentContextValue>({
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
});

// The accent lives on <html data-accent> (set before paint by the inline
// script in app/layout.tsx); this provider only mirrors it into React state
// for the picker and persists changes. Per device, like light/dark mode.
export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentId>(DEFAULT_ACCENT);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-accent");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the DOM attribute the pre-paint script set
    if (isAccentId(current)) setAccentState(current);
  }, []);

  const setAccent = useCallback((next: AccentId) => {
    document.documentElement.setAttribute("data-accent", next);
    const meta = document.querySelector('meta[name="theme-color"]');
    const swatch = ACCENTS.find((a) => a.id === next);
    if (meta && swatch) meta.setAttribute("content", swatch.to);
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled: the choice still applies for this visit.
    }
    setAccentState(next);
  }, []);

  return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>;
}

export function useAccent() {
  return useContext(AccentContext);
}
