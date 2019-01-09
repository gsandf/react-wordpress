import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import { renderString } from 'template-file';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import App from '../../src/App';
import template from '../templates';
import manifest from '../../build/asset-manifest.json';

module.exports = (req, res) => {
  const context = {};

  if (context.url) {
    // Redirect if need be
    return res.redirect(301, context.url);
  } else {
    try {
      const pageUrl = req.url;
      const modules = [];

      const pageData = req.pageData;
      const menu = req.menu;
      const pages = req.pages;

      // Pull CSS from Styled Components
      const sheet = new ServerStyleSheet();

      const body = renderToString(
        <StyleSheetManager sheet={sheet.instance}>
          <StaticRouter location={pageUrl} context={context}>
            <App data={pageData} menu={req.menu} pages={req.pages} />
          </StaticRouter>
        </StyleSheetManager>
      );

      const styles = sheet.getStyleTags();

      // Let's give ourself a function to load all our page-specific JS assets for code splitting
      const extractAssets = (assets, chunks) =>
        Object.keys(assets)
          .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
          .map(k => assets[k]);

      // Let's format those assets into pretty <script> tags
      const scripts = extractAssets(manifest, modules).map(
        c =>
          `<script type="text/javascript" src="/${c.replace(
            /^\//,
            ''
          )}"></script>`
      );

      // We need to tell Helmet to compute the right meta tags, title, and such
      const { htmlAttributes, meta, title } = Helmet.renderStatic();

      const data = {
        body,
        data: JSON.stringify(pageData),
        htmlAttributes,
        menu: JSON.stringify(menu),
        meta,
        pages: JSON.stringify(pages),
        scripts,
        styles,
        title
      };

      // Pass all this nonsense into our HTML formatting function above
      const RenderedApp = renderString(template, data);

      // We have all the final HTML, let's send it to the user already!
      return res.send(RenderedApp);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
};
