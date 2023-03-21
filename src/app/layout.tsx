import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Neptune Mutual Currency Converter',
  description: 'Neptune Mutual Currency Converter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
