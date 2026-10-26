#!/usr/bin/env bash
# Replace Hungry Pilot's placeholder links with the real ones, across the whole
# repo, in one go. See BRANDING.md.
#
#   scripts/set-brand-links.sh \
#     --website https://hungrypilot.com \
#     --company https://blustudio.com \
#     --email support@hungrypilot.com \
#     --github blu-studio/hungry-pilot
#
# Every flag is optional; placeholders for flags you leave out stay as they
# are, so you can run it again later. Review the result with `git diff`.
set -euo pipefail

website="" company="" email="" github=""
while [ $# -gt 0 ]; do
  case "$1" in
    --website) website="${2%/}"; shift 2 ;;
    --company) company="${2%/}"; shift 2 ;;
    --email) email="$2"; shift 2 ;;
    --github) github="$2"; shift 2 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "Unknown option: $1 (try --help)" >&2; exit 1 ;;
  esac
done

for u in "$website" "$company"; do
  [ -z "$u" ] || [[ "$u" =~ ^https://[A-Za-z0-9.-]+(/.*)?$ ]] || { echo "Not an https:// URL: $u" >&2; exit 1; }
done
[ -z "$email" ] || [[ "$email" =~ ^[^@[:space:]]+@[A-Za-z0-9.-]+$ ]] || { echo "Not an email address: $email" >&2; exit 1; }
[ -z "$github" ] || [[ "$github" =~ ^[A-Za-z0-9-]+/[A-Za-z0-9._-]+$ ]] || { echo "--github must look like owner/repo: $github" >&2; exit 1; }

cd "$(git rev-parse --show-toplevel)"
pattern='hungrypilot\.example\.com|blustudio\.example\.com|your_github_org'
count=$( { git grep -lI -E "$pattern" -- ':!scripts/set-brand-links.sh' ':!BRANDING.md' || true; } | wc -l | tr -d ' ')
[ "$count" != 0 ] || { echo "No placeholders left — nothing to do."; exit 0; }

export HP_WEBSITE="$website" HP_COMPANY="$company" HP_EMAIL="$email" HP_GITHUB="$github"
# Order matters: the email contains the website's domain, and image paths
# (ghcr.io/<owner>/hungry-pilot-backend) take only the owner, never the repo.
git grep -lzI -E "$pattern" -- ':!scripts/set-brand-links.sh' ':!BRANDING.md' | xargs -0 perl -pi -e '
  BEGIN {
    ($w, $c, $e, $g) = @ENV{qw(HP_WEBSITE HP_COMPANY HP_EMAIL HP_GITHUB)};
    ($wh) = $w =~ m{^https://([^/]+)};
    ($ch) = $c =~ m{^https://([^/]+)};
    ($owner) = split m{/}, $g;
    $ol = lc($owner // "");
  }
  if ($e)  { s/support\@hungrypilot\.example\.com/$e/g; }
  if ($w)  { s{https?://hungrypilot\.example\.com/?}{$w/}g; s/hungrypilot\.example\.com/$wh/g; }
  if ($c)  { s{https?://blustudio\.example\.com/?}{$c/}g; s/blustudio\.example\.com/$ch/g; }
  if ($g)  {
    s{ghcr\.io/your_github_org/}{ghcr.io/$ol/}g;
    s{your_github_org/(hungry-pilot-(?:backend|web|updater))\b}{$ol/$1}g;
    s{your_github_org/hungry-pilot\b}{$g}g;
    s/your_github_org/$owner/g;
  }
'
echo "Updated $count files. Review with: git diff"
remaining=$( { git grep -lI -E "$pattern" -- ':!scripts/set-brand-links.sh' ':!BRANDING.md' || true; } | wc -l | tr -d ' ')
[ "$remaining" = 0 ] || echo "$remaining files still contain placeholders (flags you didn't pass)."
