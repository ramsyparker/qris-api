import { useState, type FormEvent } from 'react';

export default function QrisPlayground() {
  const [qris, setQris] = useState('');
  const [nominal, setNominal] = useState('10000');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function convert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch('/convert', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ qris, nominal }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Konversi gagal.');
      setResult(data.qris);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="playground" onSubmit={convert}>
      <label htmlFor="qris">String QRIS</label>
      <textarea id="qris" value={qris} onChange={(event) => setQris(event.target.value)} required rows={5} />
      <label htmlFor="nominal">Nominal transaksi (rupiah)</label>
      <input id="nominal" inputMode="numeric" pattern="[0-9]{1,13}" value={nominal} onChange={(event) => setNominal(event.target.value)} required />
      <button disabled={loading}>{loading ? 'Memproses…' : 'Konversi QRIS'}</button>
      {error && <p role="alert">{error}</p>}
      {result && <pre aria-live="polite">{result}</pre>}
    </form>
  );
}
