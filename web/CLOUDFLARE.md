# Deploy the web app to Cloudflare Workers

The Astro build produces static assets in `dist/`. Wrangler serves those assets from the `qris-api-web` Worker. The Worker forwards `/convert`, `/decode`, `/qr`, and `/api-reference` requests to the existing API origin configured as `API_ORIGIN` in `wrangler.toml`.

## Preview locally

```sh
bun install
bun run build
bunx wrangler dev
```

## Deploy

Authenticate Wrangler with `bunx wrangler login`, then run:

```sh
bun run build
bunx wrangler deploy
```

The first deployment is available at the `workers.dev` address printed by Wrangler. The existing `qris.fixorastudio.com` hostname currently serves the API, so keep the web Worker on its `workers.dev` hostname until a separate web hostname and DNS route are configured.

To use another API server, update `API_ORIGIN` in `wrangler.toml` before deployment.
