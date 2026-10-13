# BloomBuddy

A responsive five-page storefront for floral-inspired lifestyle accessories and affordable gift sets.

## Included

BloomBuddy includes connected Home, Shop, Gift Sets, Our Story, and Contact pages. The experience uses a reusable header and footer, accessible navigation, editable sample products, category filters, product detail modals, a local-storage shopping bag with quantity controls and totals, and a client-side validated contact form. Product and price data live in `src/main.js`, so launch content can be edited in one place.

## Preview locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static output is written to `dist/` and includes the app shell, source assets, and fallback server.

## Deployment

For a static host, publish the contents of `dist/` and configure the host to serve `index.html` as the fallback for `/shop`, `/gift-sets`, `/about`, and `/contact`. Keep the included `manus-routes.json` at the site root. The provided `server.mjs` can also run the built output with `PORT=3000 node server.mjs` on a Node host. Connect the checkout button to the preferred checkout provider and the contact form to the preferred email/form provider before launch; the current UI gives clear handoff feedback without making unsupported claims.

## Editable placeholders

- Product names, prices, descriptions, categories, and image paths: `src/main.js`
- Contact email and social URL placeholders: `src/main.js`
- Palette, type, spacing, breakpoints, and component styling: `src/styles.css`
- Page route declarations: `manus-routes.json`
