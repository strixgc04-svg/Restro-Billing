import { cn } from "@/lib/utils";

// Hungry Pilot mark: a serving cloche with pilot wings. The tile paints with
// the active accent colour, so the mark follows the theme picker; the
// static PNG/ICO icons (favicon, PWA, Windows, CasaOS) are rendered from
// public/brand/hungry-pilot-mark.svg in Royal Blue.
export function Logo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <span
      role="img"
      aria-label="Hungry Pilot"
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{
        width: size,
        height: size,
        borderRadius: (size * 15) / 64,
        backgroundColor: "var(--acc)",
      }}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden fill="none">
        <g fill="var(--acc-fg)">
          <circle cx="32" cy="22.5" r="2.6" />
          <path d="M19 39.5a13 13 0 0 1 26 0z" />
          <rect x="15.5" y="41" width="33" height="3.6" rx="1.8" />
        </g>
        <g stroke="var(--acc-fg)" strokeWidth="2.6" strokeLinecap="round">
          <path d="M17.5 31.5 8.5 28.6" />
          <path d="M17.6 35.4 10.6 33.7" />
          <path d="M18.2 39 13.2 38.3" />
          <path d="M46.5 31.5 55.5 28.6" />
          <path d="M46.4 35.4 53.4 33.7" />
          <path d="M45.8 39 50.8 38.3" />
        </g>
      </svg>
    </span>
  );
}
