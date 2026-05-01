import type { Metadata } from 'next';
import { Bebas_Neue, Barlow_Condensed, Barlow } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import NoiseOverlay from '@/components/layout/NoiseOverlay';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';


const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue'
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed'
});

const barlow = Barlow({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow'
});

export const metadata: Metadata = {
  title: 'INFERNO GYM | Burn Everything',
  description: 'The premier elite gym. Train harder. No excuses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-barlow antialiased relative">
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
