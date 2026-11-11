import { Code2, ImageUp, QrCode } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Code2,
    number: '01',
    title: 'Konversi QRIS',
    description:
      'Ubah QRIS statis menjadi QRIS dinamis dengan nominal transaksi yang kamu tentukan.',
  },
  {
    icon: ImageUp,
    number: '02',
    title: 'Decode dari gambar',
    description:
      'Baca isi QRIS dari gambar melalui endpoint decode, tanpa perlu mengetik payload secara manual.',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Hasilkan QR code',
    description:
      'Buat gambar QR PNG dari teks QRIS atau hasil konversi untuk dipakai di aplikasi.',
  },
];

export function FeatureGrid() {
  return (
    <div className="feature-grid">
      {features.map(({ icon: Icon, number, title, description }) => (
        <Card key={number} className="feature-card">
          <CardHeader className="feature-card-header">
            <div className="feature-card-topline">
              <span className="feature-icon"><Icon aria-hidden="true" /></span>
              <span className="feature-number">{number}</span>
            </div>
            <CardTitle className="feature-card-title">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="feature-card-description">{description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
