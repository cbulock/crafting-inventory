'use client';

import PropTypes from 'prop-types';
import Head from 'next/head';
import { AuthProvider } from '@/context/AuthContext';
import HeaderContent from '@/components/HeaderContent';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <Head>
      <title>Inventory Management</title>
      <meta
        name="description"
        content="A simple inventory management application"
      />
      <meta
        name="keywords"
        content="inventory, management, stock, warehouse, products"
      />
      <meta name="author" content="Cameron Bulock" />
      <meta name="theme-color" content="#002B80" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
    </Head>
    <body>
      <AuthProvider>
        <header>
          <HeaderContent />
        </header>
        {children}
      </AuthProvider>
      <Toaster />
      <footer className="m-4">
        Created by{' '}
        <a
          className="hover:underline text-primary"
          href="https://github.com/cbulock"
        >
          Cameron Bulock
        </a>
      </footer>
    </body>
  </html>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RootLayout;
