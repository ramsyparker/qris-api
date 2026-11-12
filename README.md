# QRIS API

API konversi QRIS berbasis Elysia.js dengan dokumentasi OpenAPI (Swagger) dan UI sederhana untuk uji coba.

## Fitur

- Endpoint `POST /convert` untuk mengonversi string QRIS dan menghitung CRC16.
- Dokumentasi OpenAPI/Swagger tersedia di `GET /api-reference`.
- UI sederhana untuk mencoba API tersedia di `GET /ui`.

## Prasyarat

- Node.js 18+ atau Bun.

## Instalasi

Menggunakan npm:

```bash
npm install
```

Jika Anda menggunakan Bun:

```bash
bun install
```

Pastikan dependensi Swagger terpasang:

```bash
npm install @elysiajs/swagger
```

atau dengan Bun:

```bash
bun add @elysiajs/swagger
```

## Menjalankan

Mode development (ts-node):

```bash
npm run start
```

Atau build + run (Node):

```bash
npm run build
node dist/app.js
```

Dengan Bun:

```bash
bun src/app.ts
```

Server API publik: `https://qris.fixorastudio.com`. Untuk pengembangan lokal, server berjalan pada `http://localhost:3000` (atau sesuai `PORT`).

- Referensi OpenAPI: `http://localhost:3000/api-reference`
- UI Sederhana: `http://localhost:3000/ui`

## Web (marketing, docs, dan playground)

Frontend berada di folder `web/` dan menggunakan Astro, Fumadocs, serta React untuk komponen interaktif.

```bash
cd web
bun install
bun run dev
```

Jalankan API di port `3000` agar playground bisa memanggil endpoint lokal. Halaman frontend tersedia di `/` (landing), `/docs/` (panduan), dan `/app/` (playground). SDK memakai `https://qris.fixorastudio.com` secara default; set `baseUrl` untuk memakai server lokal.

## JavaScript SDK

SDK JavaScript/TypeScript berada di folder `sdk/` dan dipublikasikan sebagai `@aaramsyy/qris-api`. Package ini dapat dipasang lewat npm, pnpm, Yarn, atau Bun. Dukungan runtime mencakup Node.js 18+, Bun, dan browser modern.

Lihat [sdk/README.md](sdk/README.md) untuk instalasi dan contoh penggunaan.

## OpenAPI Schema

Skema untuk endpoint `/convert` telah ditambahkan menggunakan validator bawaan Elysia (`t`) agar tampil di Swagger UI.

### Request

POST `/convert`

Body JSON:

```json
{
  "qris": "<string QRIS>",
  "nominal": "10000"
}
```

Keterangan:

- `qris` (string): String QRIS asli.
- `nominal` (string): Nominal transaksi sebagai string angka.
  

### Response

```json
{
  "nominal": "10000",
  "merchantName": "Fixora Studio"
}
```

## Endpoint Alternatif

- `GET /convert?qris=<...>&nominal=<...>` — alternatif GET dengan query param yang mengembalikan struktur yang sama.

## Preview QR

- `GET /qr?text=<string>` — menghasilkan gambar PNG QR dari string.
- `GET /qr?qris=<...>&nominal=<...>` — langsung membuat QR dari hasil konversi internal.

## Catatan

- Referensi API interaktif tersedia di `/api-reference` dengan plugin `@elysiajs/swagger`.
- UI sederhana di `/ui` tidak membutuhkan dependensi tambahan.
- Pastikan data QRIS valid sebelum dikonversi; saat ini validasi detail belum diimplementasikan.
