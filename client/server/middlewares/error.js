import React from 'react';
import { renderToString } from 'react-dom/server';
import { Error as ErrorPage } from '../../src/pages/Error';

module.exports = (error, req, res, next) => {
  const status =
    error.response && error.response.status ? error.response.status : 500;

  const message =
    error.response && error.response.statusText
      ? error.response.statusText
      : 'There seems to be a problem.  Please try again in a bit.';

  res
    .status(status)
    .send(renderToString(<ErrorPage status={status} message={message} />));
};
