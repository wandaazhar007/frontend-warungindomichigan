// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar/Navbar'; // Using the alias '@'
// import Footer from '@/components/Footer/Footer';
// import './globals.scss';
// import FooterTwo from '@/components/FooterTwo/FooterTwo';
// import ClientProviders from '@/components/Providers';
// import { CartProvider } from '@/context/CartContext';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'WarungIndoMichigan - Your Indonesian Store',
//   description: 'Bringing the taste of Indonesia to Michigan.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <CartProvider>
//           <ClientProviders>
//             <Navbar />
//             <main>
//               {children}
//             </main>
//             <FooterTwo />
//             <Footer />
//           </ClientProviders>
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';
import FooterTwo from '@/components/FooterTwo/FooterTwo';
import ClientProviders from '@/components/Providers'; // <-- We only need this one provider here
import './globals.scss';

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
        {/* Our single provider component now wraps everything */}
        <ClientProviders>
          <Navbar />
          <main>
            {children}
          </main>
          <FooterTwo />
        </ClientProviders>
      </body>
    </html>
  );
}
