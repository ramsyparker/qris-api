# Deploy the web app to Cloudflare Workers

The Astro build produces static assets in `dist/`. Wrangler serves those assets from the `qris-api-web` Worker. The Worker forwards `/convert`, `/decode`, `/qr`, and `/api-reference` requests to the existing API origin configured as `API_ORIGIN` in `wrangler.toml`.

## Preview locally

```sh
bun install
bun run worker:dev
```

## Deploy

Authenticate Wrangler with `bunx wrangler login`, then run:

```sh
bun run worker:deploy
```

The Worker is configured for `qris.fixorastudio.com`. The existing API and its Nginx server use `api-qris.fixorastudio.com`. Wrangler provisions the web custom domain during deployment when the domain is active in the Cloudflare account.

To use another API server, update `API_ORIGIN` in `wrangler.toml` before deployment.
