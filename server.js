const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const formidable = require('express-formidable'); // 引入


const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'mydomain.crt'))
};


const server = require('https').createServer(httpsOptions, app);

// middleware
// app.use(express.static('dist'));
app.use(express.static(__dirname + '/dist'));
// app.use(formidable);

// routes
app.use('/note',require('./routes/note'))
app.use('/user',formidable(), require('./routes/user'))

 

app.listen(4001,() => console.log('server is running over 4001 port'));


