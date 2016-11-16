import 'babel-polyfill';
import Koa from 'koa';
import fs from 'fs';
import path from 'path';
const router = require('koa-router')();
const app = new Koa();

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from './webpack.config'

app.use(devMiddleware(webpack(webpackConfig)), {
  noinfo: false,
  publicPath: webpackConfig.output.publicPath
});
app.use(hotMiddleware(webpack(webpackConfig)));

app.listen('3000');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

router.get('/', async (ctx, next) => {
    ctx.response.set('content-type', 'text/html');
    ctx.body = fs.readFileSync(path.join(__dirname, '/client/src/index.html'), 'utf8');
    await next();
  });
router.get('/main.css', async (ctx, next) => {
    ctx.response.set('content-type', 'text/css');
    ctx.body = fs.readFileSync(path.join(__dirname, '/client/src/main.css'));
  });


app
  .use(router.routes())
  .use(router.allowedMethods());
