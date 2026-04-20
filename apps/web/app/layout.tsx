import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OptiGestor',
  description: 'Lean MVP v0.1 para gestão de óticas'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
