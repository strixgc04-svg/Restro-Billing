// Accent colours for the theme picker. The palette values themselves live in
// app/globals.css under :root[data-accent="<id>"]; this list only drives the
// picker UI and validates what's read back from localStorage. Every accent was
// checked for WCAG AA (>= 4.5:1) as button text and as text on white/dark.
export const ACCENTS = [
  { id: "royal", label: "Royal Blue", from: "#60A5FA", to: "#1D4ED8" },
  { id: "crimson", label: "Crimson Red", from: "#F87171", to: "#C8102E" },
  { id: "gold", label: "Golden Yellow", from: "#FACC15", to: "#A16207" },
  { id: "emerald", label: "Emerald Green", from: "#34D399", to: "#047857" },
  { id: "hotpink", label: "Hot Pink", from: "#F472B6", to: "#D61F69" },
  { id: "purple", label: "Royal Purple", from: "#A78BFA", to: "#6D28D9" },
  { id: "teal", label: "Ocean Teal", from: "#2DD4BF", to: "#0F766E" },
  { id: "orange", label: "Tangerine", from: "#FB923C", to: "#C2410C" },
  { id: "wine", label: "Burgundy", from: "#FB7185", to: "#9F1239" },
  { id: "graphite", label: "Midnight", from: "#71717A", to: "#18181B" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];

export const DEFAULT_ACCENT: AccentId = "royal";
export const ACCENT_STORAGE_KEY = "hp-accent";

export function isAccentId(value: unknown): value is AccentId {
  return typeof value === "string" && ACCENTS.some((a) => a.id === value);
}

// Runs in <head> before first paint (see app/layout.tsx), so a saved accent
// never flashes the default colour first. Kept dependency-free on purpose.
export const ACCENT_INIT_SCRIPT = `(function(){try{var a=localStorage.getItem(${JSON.stringify(
  ACCENT_STORAGE_KEY,
)});if(${JSON.stringify(ACCENTS.map((a) => a.id))}.indexOf(a)>-1)document.documentElement.setAttribute("data-accent",a)}catch(e){}})()`;
