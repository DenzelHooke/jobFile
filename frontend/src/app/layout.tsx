import './styles/globals.css';
import type { Metadata } from 'next';
import Providers from './providers';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'JobFile',
  description: 'The easiest way to track your job applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="app">
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
