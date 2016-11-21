import 'babel-polyfill';
import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import userModel from './models/users';
const router = require('koa-router')();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(logger());

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from './webpack.config'

app.use(devMiddleware(webpack(webpackConfig)), {
  noinfo: false,
  publicPath: webpackConfig.output.publicPath
});
app.use(hotMiddleware(webpack(webpackConfig)));

app.use(bodyParser());

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
    await next();
  });
router.get('/dispute/options/:name', async (ctx,next) => {
  ctx.body = {
    options: [
      { value: 'admin', label: 'admin' },
      { value: 'god', label: 'god' }]};
    // По непонятным пока причинам не работает
    // const user = await userModel.findOne({"username": new RegExp(ctx.params.name, "i")});
    // if (user) {
    //   console.log(user);
    //   ctx.body = {value: user[username], label: user[username]};
    // };
});
router.post('/dispute/add', async (ctx, next) => {
  ctx.status = 201;
  ctx.body = 'hi!';
  await next();
});


app
  .use(router.routes())
  .use(router.allowedMethods());
