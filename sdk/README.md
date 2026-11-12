# @aaramsyy/qris-api

Universal JavaScript and TypeScript client for the QRIS API. It uses the standard Fetch API and has no runtime dependencies.

## Install

Use any package manager that installs packages from the npm registry:

```bash
npm install @aaramsyy/qris-api
pnpm add @aaramsyy/qris-api
yarn add @aaramsyy/qris-api
bun add @aaramsyy/qris-api
```

## Compatibility

- Node.js 18 or newer
- Bun
- Modern browsers with `fetch`, `Blob`, and `FormData`
- ESM projects and modern bundlers

Browser calls require the API server to allow cross-origin requests. This API enables CORS without cookies or credential sharing.

## Usage

```ts
import { QrisApi } from '@aaramsyy/qris-api';

const qris = new QrisApi(); // Defaults to https://api-qris.fixorastudio.com

const converted = await qris.convert({
  qris: '000201...',
  nominal: '10000',
});

console.log(converted.qris);
console.log(converted.merchantName);

const decoded = await qris.decode(imageBlob, 'payment.png');
console.log(decoded.text);

const qrImage = await qris.qr({ text: converted.qris });
```

Use a local or self-hosted API by setting `baseUrl`:

```ts
const qris = new QrisApi({ baseUrl: 'http://localhost:3000' });
```

The QR endpoint also accepts a QRIS string and amount:

```ts
const qrImage = await qris.qr({ qris: '000201...', nominal: '10000' });
```

## Errors

HTTP errors reject with `QrisApiError`, which includes the HTTP status and response body:

```ts
import { QrisApiError } from '@aaramsyy/qris-api';

try {
  await qris.convert({ qris: 'invalid', nominal: '10000' });
} catch (error) {
  if (error instanceof QrisApiError) {
    console.error(error.status, error.message);
  }
}
```

The SDK checks basic input shape. The API remains responsible for validating QRIS data and CRC.

## Publish

The package is public under the `@aaramsyy` scope. Increment the version before each release, then publish from this directory:

```bash
npm login
npm publish --access public
```
