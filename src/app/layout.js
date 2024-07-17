"use client"

import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { theme } from './theme';
import './globals.css';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
