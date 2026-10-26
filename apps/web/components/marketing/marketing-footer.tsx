import { BRAND } from "@hungry-pilot/types";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { downloadHref } from "@/lib/downloads";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#security", label: "Security" },
      { href: "#get-started", label: "Get started" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: downloadHref("github"), label: "GitHub" },
      { href: "/docs/api", label: "API & MCP" },
      { href: "/docs/accessibility", label: "Accessibility statement" },
      { href: "/docs/compliance-india", label: "India compliance notes" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Create account" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-sm font-semibold text-foreground">
                {BRAND.productName} <span className="font-normal text-muted-foreground">by {BRAND.companyName}</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Offline-first restaurant management, self-hosted on your own
              server. Built by {BRAND.companyName}.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {BRAND.companyName}. Licensed {BRAND.license}.
          </p>
          <p className="text-xs text-muted-foreground">
            Based on{" "}
            <a href={BRAND.upstream.url} className="underline-offset-2 hover:text-foreground hover:underline">
              {BRAND.upstream.name}
            </a>{" "}
            &copy; {BRAND.upstream.copyright} ·{" "}
            <a href={BRAND.sourceUrl} className="underline-offset-2 hover:text-foreground hover:underline">
              Source code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
