import assert from 'node:assert/strict';
import test from 'node:test';

const modulePromise = import('../src/index.js').catch(() => ({}));

test('exports the QRIS client', async () => {
  const { QrisApi } = await modulePromise;
  assert.equal(typeof QrisApi, 'function');
});

test('convert sends JSON to the configured API and returns typed payload data', async () => {
  const { QrisApi } = await modulePromise;
  assert.equal(typeof QrisApi, 'function');
  let request;
  const client = new QrisApi({
    baseUrl: 'https://api.example.test/',
    fetch: async (url, init) => {
      request = { url, init };
      return Response.json({ qris: 'converted', nominal: '10000', merchantName: 'Toko' });
    },
  });

  const result = await client.convert({ qris: 'source', nominal: '10000' });

  assert.equal(request.url, 'https://api.example.test/convert');
  assert.equal(request.init.method, 'POST');
  assert.deepEqual(JSON.parse(request.init.body), { qris: 'source', nominal: '10000' });
  assert.equal(result.merchantName, 'Toko');
});

test('decode uploads the image as multipart form data', async () => {
  const { QrisApi } = await modulePromise;
  let request;
  const client = new QrisApi({
    baseUrl: 'https://api.example.test',
    fetch: async (url, init) => {
      request = { url, init };
      return Response.json({ text: 'decoded QRIS' });
    },
  });

  const result = await client.decode(new Blob(['image-bytes'], { type: 'image/png' }), 'code.png');

  assert.equal(request.url, 'https://api.example.test/decode');
  assert.equal(request.init.method, 'POST');
  assert.equal(request.init.body.get('image').name, 'code.png');
  assert.equal(result.text, 'decoded QRIS');
});

test('API errors preserve the HTTP status and response message', async () => {
  const { QrisApi, QrisApiError } = await modulePromise;
  const client = new QrisApi({
    baseUrl: 'https://api.example.test',
    fetch: async () => Response.json({ error: 'Invalid QRIS' }, { status: 400 }),
  });

  await assert.rejects(client.convert({ qris: 'invalid', nominal: '1' }), (error) => {
    assert.ok(error instanceof QrisApiError);
    assert.equal(error.status, 400);
    assert.equal(error.message, 'Invalid QRIS');
    return true;
  });
});

test('qr returns image data from the QR endpoint', async () => {
  const { QrisApi } = await modulePromise;
  const client = new QrisApi({
    baseUrl: 'https://api.example.test',
    fetch: async (url) => {
      assert.equal(url, 'https://api.example.test/qr?text=hello');
      return new Response(new Blob(['png-data'], { type: 'image/png' }), {
        headers: { 'content-type': 'image/png' },
      });
    },
  });

  const image = await client.qr({ text: 'hello' });

  assert.equal(image.type, 'image/png');
  assert.equal(await image.text(), 'png-data');
});
