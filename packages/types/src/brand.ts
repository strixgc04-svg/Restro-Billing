// Product identity and public links, shared by the web app and the API.
//
// The *.example.com values are placeholders until Blu Studio's real domain
// and support address exist (example.com is reserved, so they can never
// resolve to a stranger's site). `scripts/set-brand-links.sh` swaps them for
// the real values across the whole repo in one go — see BRANDING.md.
export const BRAND = {
  productName: "Hungry Pilot",
  companyName: "Blu Studio",
  websiteUrl: "https://hungrypilot.example.com/",
  supportUrl: "https://hungrypilot.example.com/contact",
  supportEmail: "support@hungrypilot.example.com",
  companyUrl: "https://blustudio.example.com/",
  sourceUrl: "https://github.com/strixgc04-svg/Restro-Billing",
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
