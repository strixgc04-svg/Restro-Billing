import { BRAND } from "@hungry-pilot/types";
import { LifeBuoy } from "lucide-react";

export function BrandFooter() {
  return (
    <div className="flex flex-col gap-2 border-t border-sidebar-border px-4 py-3">
      <a
        href={BRAND.supportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-lg border border-sidebar-border px-3 py-1.5 text-xs font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <LifeBuoy className="h-3.5 w-3.5" />
        Contact support
      </a>
      <a
        href={BRAND.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-left text-xs font-medium leading-tight text-sidebar-foreground/70 hover:text-sidebar-foreground hover:underline"
      >
        {BRAND.productName} <span className="font-normal">by {BRAND.companyName}</span>
      </a>
      {/* AGPL-3.0 notice + source offer (see BRAND.upstream) — keep this visible. */}
      <p className="text-[11px] leading-snug text-sidebar-foreground/55">
        Based on {BRAND.upstream.name} · {BRAND.license} ·{" "}
        <a href={BRAND.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          Source code
        </a>
      </p>
    </div>
  );
}
