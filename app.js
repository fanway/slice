import 'babel-polyfill';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import userModel from './models/users';
var bodyParser = require('body-parser');

const app = express();

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, ()=>{
  console.log('Server started on port 3000');
});

app.use(express.static(__dirname + '/client/src'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/src/index.html'));
});

app.post('/users/add',(req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  let userToAdd = new userModel({ username: req.body.username,password:req.body.password});
  userToAdd.save(function (err, userToAdd) {
    if (err) {
      res.send('{"response":"error"}');
      return console.error(err);
    }else{
      res.send('{"response":"success"}');
      return console.log("userAdded");
    }
  });
});

app.get('/users/all',(req,res)=>{
  userModel.find({}, function(err,o){
      var arr = [];
      for(var i in o){
        arr.push(o[i]);
      }
      res.json(err?{error:err}:arr);
    })
});

app.get('/dispute/options/:name', (req, res) => {
  userModel.find({"username": new RegExp(req.params.name, "i")}, (err, users) => {
    if(err){
      console.log('Error when finding users');
    }else{
      res.send(users);
      console.log(users);
    }
  });
});
