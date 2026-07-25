import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '91 Insurance Services',
  description: 'Online vehicle insurance renewal platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
