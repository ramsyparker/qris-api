export interface QrisApiOptions {
  /** API origin. Defaults to https://qris.fixorastudio.com. */
  baseUrl?: string;
  /** Optional fetch implementation, useful for custom runtimes and testing. */
  fetch?: typeof globalThis.fetch;
}

export interface ConvertInput {
  qris: string;
  /** Transaction amount in digits, from 1 to 13 characters. */
  nominal: string;
}

export interface ConvertResult {
  qris: string;
  nominal: string;
  merchantName: string;
}

export interface DecodeResult {
  text: string;
}

export type QrInput = { text: string } | { qris: string; nominal: string };

export declare class QrisApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  constructor(message: string, options: { status: number; body: unknown });
}

export declare class QrisApi {
  constructor(options?: QrisApiOptions);
  convert(input: ConvertInput): Promise<ConvertResult>;
  decode(image: Blob, filename?: string): Promise<DecodeResult>;
  qr(input: QrInput): Promise<Blob>;
}

export declare const DEFAULT_BASE_URL: string;
