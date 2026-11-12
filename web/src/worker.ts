interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  API_ORIGIN: string;
}

const API_PATHS = new Set(['/convert', '/decode', '/qr', '/api-reference']);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isApiReference = url.pathname.startsWith('/api-reference/');

    if (API_PATHS.has(url.pathname) || isApiReference) {
      const origin = new URL(env.API_ORIGIN);
      origin.pathname = url.pathname;
      origin.search = url.search;

      return fetch(new Request(origin, request));
    }

    return env.ASSETS.fetch(request);
  },
};
