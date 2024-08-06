'use client';

import PropTypes from 'prop-types';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </body>
  </html>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RootLayout;
