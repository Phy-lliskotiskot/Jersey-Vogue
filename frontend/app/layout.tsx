import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Jersey Vogue - Premium Sports Apparel',
    template: '%s | Jersey Vogue'
  },
  description: 'Discover premium sports jerseys and apparel at Jersey Vogue. Shop authentic team jerseys, custom designs, and sports gear.',
  keywords: ['sports jerseys', 'team apparel', 'custom jerseys', 'sports gear', 'athletic wear'],
  authors: [{ name: 'Jersey Vogue' }],
  creator: 'Jersey Vogue',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jerseyvogue.com',
    title: 'Jersey Vogue - Premium Sports Apparel',
    description: 'Discover premium sports jerseys and apparel at Jersey Vogue.',
    siteName: 'Jersey Vogue',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jersey Vogue - Premium Sports Apparel',
    description: 'Discover premium sports jerseys and apparel at Jersey Vogue.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}