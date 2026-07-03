import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WhatsApp Web - Educational AI Chatbot | Tonderai Kawere',
  description:
    'Educational WhatsApp Web UI Clone and AI Chatbot built by Tonderai Kawere using Next.js and Material UI. Showcase of modern reactive interfaces and chat systems.',
  keywords: [
    'WhatsApp Web Clone',
    'Tonderai Kawere',
    'Next.js Chatbot',
    'Material UI WhatsApp',
    'Educational Showcase',
    'Full-Stack Developer',
  ],
  authors: [{ name: 'Tonderai Kawere', url: 'https://tonde-portfolio.vercel.app/' }],
  openGraph: {
    title: 'WhatsApp Web UI Clone - Educational Chatbot',
    description: 'Developed by Tonderai Kawere (https://tonde-portfolio.vercel.app/)',
    url: 'https://tonde-portfolio.vercel.app/',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
