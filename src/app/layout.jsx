'use client';

import PropTypes from 'prop-types';
import { AuthProvider } from '@/context/AuthContext';
import HeaderContent from '@/components/HeaderContent';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
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
