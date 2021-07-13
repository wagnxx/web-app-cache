const express = require('express');
var mime = require('mime');
const app = express();
const fs = require('fs');
const path = require('path');
let editor = '-init-';

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'mydomain.crt'))
};

// app.use((req, res, next) => {
//   // console.log('req url', req.url)
//   if (req.url === '/permanote.appcahe') {
//     res.setHeader('content-type','text/cache-manifest')
//   }
//   // let miniType = mime.lookup(req.url);

//   // if (miniType) {
//   //   res.setHeader('content-type', miniType);
//   //   console.log('mini type : ',miniType)
//   // }
//   next();
// })

app.use(express.static('dist'));

app.get('/note', (req, res) => {
  res.send(editor);
});

app.put('/note', (req, res) => {
  editor = req.body;
  console.log(req.body);
});

const server = require('https').createServer(httpsOptions, app);
server.listen(4001);
