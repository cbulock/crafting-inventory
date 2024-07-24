'use client';

import PropTypes from 'prop-types';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '@/context/AuthContext';
import theme from './theme';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </AntdRegistry>
    </body>
  </html>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RootLayout;
