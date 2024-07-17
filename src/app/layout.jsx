'use client';

import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </body>
  </html>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RootLayout;
