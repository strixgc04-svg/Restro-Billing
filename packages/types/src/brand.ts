// Product identity and public links, shared by the web app and the API.
//
// The *.example.com and `your_github_org` values are placeholders until Blu
// Studio's real domain, support address and repository exist. They are
// deliberately unregistrable (example.com is reserved; GitHub names can't
// contain underscores), so nothing can ever resolve to a stranger's site or
// code. `scripts/set-brand-links.sh` swaps them for the real values across
// the whole repo in one go — see BRANDING.md.
export const BRAND = {
  productName: "Hungry Pilot",
  companyName: "Blu Studio",
  websiteUrl: "https://hungrypilot.example.com/",
  supportUrl: "https://hungrypilot.example.com/contact",
  supportEmail: "support@hungrypilot.example.com",
  companyUrl: "https://blustudio.example.com/",
  sourceUrl: "https://github.com/your_github_org/hungry-pilot",
  license: "AGPL-3.0",
  // AGPL-3.0 requires keeping the original copyright notice and offering the
  // modified source to everyone who uses the app over a network. Keep this
  // credit (and the source link next to it) visible in the UI.
  upstream: {
    name: "OrderRestro",
    copyright: "Nodedr Infotech Private Limited and Raktim Ranjit",
    url: "https://github.com/Raktim94/nodedr-restaurant-pos",
  },
} as const;
