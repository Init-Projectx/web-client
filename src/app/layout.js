'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const disable = ['auth', 'cms']

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const shouldShow = !disable.includes(pathname.split('/')[1]);

  return (
    <html lang="en">
      <Head>
        <title>MiniMiracle</title>
      </Head>
      <body className={`${inter.className} bg-color-primary text-sm`}>
        {shouldShow && <Navbar />}
        {children}
        {shouldShow && <Footer />}
      </body>
    </html>
  );
}
