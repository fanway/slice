import 'babel-polyfill';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import userModel from './models/users';
import bodyParser from 'body-parser';
import disputeModel from './models/dispute';

const app = express();

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.listen(3000, ()=>{
  console.log('Server started on port 3000');
});

app.use(express.static(__dirname + '/client/src'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/src/index.html'));
});

app.get('/dispute/options/:name', (req, res) => {
  userModel.find({"username": new RegExp(req.params.name, "i")}, (err, users) => {
    if(err) console.log('cant find');
    res.send(users);
  });
});

app.post('/dispute/add', (req, res) => {
  console.log(req.body);
  let disputeAdd = new disputeModel(Object.assign(req.body, {complete: false}));
  disputeAdd.save((err, disputeAdd) => {
    if(err) console.log(err);
    res.status = 200;
  })
});
