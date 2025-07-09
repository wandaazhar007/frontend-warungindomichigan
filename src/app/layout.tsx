import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar'; // Using the alias '@'
import Footer from '@/components/Footer/Footer';
import './globals.scss';
import FooterTwo from '@/components/FooterTwo/FooterTwo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WarungIndoMichigan - Your Indonesian Store',
  description: 'Bringing the taste of Indonesia to Michigan.',
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
        <main>
          {children}
        </main>
        <FooterTwo />
        <Footer />
      </body>
    </html>
  );
}