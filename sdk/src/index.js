const DEFAULT_BASE_URL = 'https://api-qris.fixorastudio.com';

export class QrisApiError extends Error {
  constructor(message, { status, body }) {
    super(message);
    this.name = 'QrisApiError';
    this.status = status;
    this.body = body;
  }
}

export class QrisApi {
  constructor({ baseUrl = DEFAULT_BASE_URL, fetch: fetchImpl = globalThis.fetch } = {}) {
    if (typeof fetchImpl !== 'function') {
      throw new Error('This runtime does not provide fetch. Pass a compatible fetch function.');
    }

    let parsedBaseUrl;
    try {
      parsedBaseUrl = new URL(baseUrl);
    } catch {
      throw new TypeError('baseUrl must be an absolute URL.');
    }

    this.baseUrl = parsedBaseUrl.toString().replace(/\/+$/, '');
    this.fetch = fetchImpl;
  }

  async convert(input) {
    if (!input || typeof input.qris !== 'string' || input.qris.length === 0) {
      throw new TypeError('qris must be a non-empty string.');
    }
    if (typeof input.nominal !== 'string' || !/^[0-9]{1,13}$/.test(input.nominal)) {
      throw new TypeError('nominal must contain 1 to 13 digits.');
    }

    return this.#request('/convert', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    });
  }

  async decode(image, filename = 'image') {
    if (typeof Blob === 'undefined' || !(image instanceof Blob)) {
      throw new TypeError('image must be a Blob or File.');
    }

    const form = new FormData();
    form.append('image', image, filename);
    return this.#request('/decode', { method: 'POST', body: form });
  }

  async qr(query) {
    const params = new URLSearchParams();
    if (query && typeof query.text === 'string' && query.text.length > 0) {
      params.set('text', query.text);
    } else if (
      query &&
      typeof query.qris === 'string' &&
      query.qris.length > 0 &&
      typeof query.nominal === 'string' &&
      /^[0-9]{1,13}$/.test(query.nominal)
    ) {
      params.set('qris', query.qris);
      params.set('nominal', query.nominal);
    } else {
      throw new TypeError('Provide non-empty text, or qris and a nominal of 1 to 13 digits.');
    }

    const response = await this.fetch(`${this.baseUrl}/qr?${params.toString()}`);
    if (!response.ok) throw await this.#errorFrom(response);
    return response.blob();
  }

  async #request(path, init) {
    const response = await this.fetch(`${this.baseUrl}${path}`, init);
    if (!response.ok) throw await this.#errorFrom(response);
    return response.json();
  }

  async #errorFrom(response) {
    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text().catch(() => undefined);
    }

    const message =
      body && typeof body === 'object' && typeof body.error === 'string'
        ? body.error
        : `QRIS API request failed with HTTP ${response.status}.`;

    return new QrisApiError(message, { status: response.status, body });
  }
}

export { DEFAULT_BASE_URL };
