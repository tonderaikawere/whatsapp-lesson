import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#008069',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tonde-portfolio.vercel.app'),
  title: 'WhatsApp Web',
  description:
    'WhatsApp Web - Fast, secure, and responsive web messenger by Tonderai Kawere (https://tonde-portfolio.vercel.app/).',
  icons: {
    icon: '/whatsapp-logo.svg',
    shortcut: '/whatsapp-logo.svg',
    apple: '/whatsapp-logo.svg',
  },
  keywords: [
    'WhatsApp Web',
    'WhatsApp Web Clone',
    'Tonderai Kawere',
    'Full-Stack Developer',
    'Next.js WhatsApp',
    'Material UI',
  ],
  authors: [{ name: 'Tonderai Kawere', url: 'https://tonde-portfolio.vercel.app/' }],
  openGraph: {
    title: 'WhatsApp Web',
    description: 'WhatsApp Web application developed by Tonderai Kawere (https://tonde-portfolio.vercel.app/)',
    url: 'https://tonde-portfolio.vercel.app/',
    siteName: 'WhatsApp Web',
    images: [
      {
        url: '/whatsapp-logo.svg',
        width: 512,
        height: 512,
        alt: 'WhatsApp Logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/whatsapp-logo.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
