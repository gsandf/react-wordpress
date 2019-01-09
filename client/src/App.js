import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Helmet from 'react-helmet';
import axios from 'axios';

import Example from './templates';

import NoMatch from './pages';

import GlobalStyle from './global';
import sig from './global/sig';

const base = 'http://localhost:8080/wp-json';

console.log(sig);

const templates = {
  example: Example
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      menu: props.menu,
      pages: props.pages
    };
  }

  componentDidMount() {
    // If we're only running clientside where data doesn't already exist let's
    // go ahead and get what we need to still run properly
    if (
      process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined'
    ) {
      const relativePath = window.location.pathname;
      const pageUrl =
        relativePath === ''
          ? '/'
          : `/wp/v2/pages?slug=${relativePath.replace(/^\/+/g, '')}`;

      if (this.props.menu.length === 0) {
        axios
          .get(`${base}/wp-api-menus/v2/menus/2`)
          .then(response => {
            const menu = response.data.items;
            this.setState({ menu });
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.props.pages.length === 0) {
        axios
          .get(`${base}/better-rest-endpoints/v1/pages`)
          .then(response => {
            const pages = response.data;
            this.setState({ pages });
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (Object.keys(this.props.data).length === 0) {
        axios
          .get(`${base}${pageUrl}`)
          .then(response => {
            const data = Array.isArray(response.data)
              ? response.data[0]
              : response.data;
            this.setState({ data });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  render() {
    const { data, menu, pages } = this.state;
    const dataReady = data != null && Object.keys(data).length !== 0;
    const menuReady = menu != null && menu.length !== 0;
    const pagesReady = pages != null && pages.length !== 0;
    return (
      <div>
        <GlobalStyle />
        <Helmet defaultTitle="Demo" titleTemplate="%s | Demo" />
        {menuReady &&
          menu.map(menuItem => {
            const path =
              menuItem.object_slug === 'home'
                ? '/'
                : `/${menuItem.object_slug}`;
            return (
              <a href={path} key={menuItem.id}>
                {menuItem.title}
              </a>
            );
          })}
        <Switch>
          {/*
            Loop through pages in wordpress and create routes
          */}
          {pagesReady &&
            pages.map(page => {
              const template = page.template;
              const Page = templates[template];
              if (template !== 'default' && template !== '' && Page != null) {
                return (
                  <Route
                    exact
                    key={page.id}
                    path={`/${page.slug}`}
                    render={props => <Page data={page} {...props} />}
                  />
                );
              } else {
                return (
                  <Route
                    key={page.id}
                    render={props => (
                      <NoMatch data={dataReady ? data : null} {...props} />
                    )}
                  />
                );
              }
            })}
        </Switch>
      </div>
    );
  }
}

export default App;
