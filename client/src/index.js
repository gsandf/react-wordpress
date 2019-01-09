import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import theme from './global/theme';

// A nice helper to tell us if we're on the server
const isServer = typeof window !== 'undefined';
const initialData = !isServer ? window.WORDPRESS_DATA : {};
const initialMenu = !isServer ? window.WORDPRESS_MENU : [];
const initialPages = !isServer ? window.WORDPRESS_PAGES : [];
const root = document.getElementById('root');

// Running locally, we should run on a <ConnectedRouter /> rather than on a
// <StaticRouter /> like on the server
const Application = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App data={initialData} menu={initialMenu} pages={initialPages} />
    </BrowserRouter>
  </ThemeProvider>
);

if (root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  hydrate(Application, root);
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
}
