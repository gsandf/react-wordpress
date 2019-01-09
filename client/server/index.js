import express from 'express';
import compression from 'compression';
import path from 'path';

// Routes
import index from './routes/index';
import universalLoader from './routes/universal';

// Middlewares
import errorHandler from './middlewares/error';
import wordpressApi from './middlewares/wordpressApi';

const app = express();
const PORT = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '..', 'build');

// GZip responses
app.use(compression());

// Middleware to get page data from Wordpress
app.use(wordpressApi);

// Intercept index route
app.use('/', index);

// Static assets
app.use(express.static(clientPath));

// All other SSR routes
app.use('/', universalLoader);

// Show error page on all uncaught errors
app.use(errorHandler);

// Start listening
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
