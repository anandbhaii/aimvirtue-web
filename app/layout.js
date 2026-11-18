import './globals.css';
import { Manrope } from 'next/font/google';
import SarthiBot from './components/SarthiBot';

const font = Manrope({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'AIMVIRTUE | Bridging Classrooms to Careers with Applied Intelligence',
  description:
    'By Students, For Students. Gwalior’s future-skills ecosystem offering NEP 2020-aligned AI literacy workshops for schools and skill-gap career acceleration & placements for graduates.',
  keywords: [
    'AIMVIRTUE',
    'AI Literacy Gwalior',
    'School AI Workshop',
    'NEP 2020 AI Education',
    'Seed To Start',
    'Great To Greatness',
    'Career Accelerator Gwalior',
    'Tech Internships and Placements',
  ],
  authors: [{ name: 'AIMVIRTUE' }],
  openGraph: {
    title: 'AIMVIRTUE | Bridging Classrooms to Careers',
    description:
      'From demystifying AI for school minds to engineering job-ready tech talent for top companies in Gwalior & beyond.',
    siteName: 'AIMVIRTUE',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIMVIRTUE | Applied Intelligence & Career Ecosystem',
    description:
      'Bridging classrooms to careers. Free AI literacy orientations for schools & pre-vetted talent placements for companies.',
  },
};

export const viewport = {
  themeColor: '#070504',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}
        <SarthiBot />
      </body>
    </html>
  );
}